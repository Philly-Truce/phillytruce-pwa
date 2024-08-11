"use client";

import { useEffect, useState } from "react";
import {
  Client as ConversationsClient,
  Conversation,
} from "@twilio/conversations";
import Cookies from "js-cookie";
import ConversationsList from "@/components/messages/conversations-list";
import SearchBar from "@/components/search-bar";
import { useTwilio } from "@/lib/twilio-provider"; // Update this import path as necessary

export default function Messages() {
  const { client, statusString, status } = useTwilio();
  const [selectedConversationSid, setSelectedConversationSid] = useState<
    string | null
  >(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [filteredConversations, setFilteredConversations] = useState<
    Conversation[]
  >([]);

  useEffect(() => {
    if (client && status === "success") {
      // Fetch and set all subscribed conversations
      client.getSubscribedConversations().then((paginator) => {
        setConversations(paginator.items);
      });

      client.on("conversationJoined", (conversation) => {
        setConversations((prevConversations) => [
          ...prevConversations,
          conversation,
        ]);
      });

      client.on("conversationLeft", (thisConversation) => {
        setConversations((prevConversations) =>
          prevConversations.filter((it) => it !== thisConversation)
        );
      });

      return () => {
        client.removeAllListeners();
      };
    }
  }, [client, status]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (!query) {
      setFilteredConversations(conversations);
      return;
    }

    const filtered = await Promise.all(
      conversations.map(async (conversation) => {
        const messagePaginator = await conversation.getMessages();
        const messages = messagePaginator.items;
        const matchingMessages = messages.filter((message) =>
          message.body?.toLowerCase().includes(query.toLowerCase())
        );
        return matchingMessages.length > 0 ? conversation : null;
      })
    );

    setFilteredConversations(
      filtered.filter((conv): conv is Conversation => conv !== null)
    );
  };

  useEffect(() => {
    setFilteredConversations(conversations);
  }, [conversations]);

  return (
    <main
      id="messages-page"
      className="flex flex-col gap-4 w-full items-center p-4 pt-20"
    >
      <SearchBar page="messages" onSearch={handleSearch} />
      <ConversationsList conversations={filteredConversations} />
    </main>
  );
}
