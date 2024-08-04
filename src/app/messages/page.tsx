"use client";
import { useEffect, useState } from "react";
import {
  Client as ConversationsClient,
  Conversation,
} from "@twilio/conversations";
import ConversationsList from "@/components/messages/conversations-list";
import ReportConversation from "@/components/messages/report-conversation";
import SearchBar from "@/components/search-bar";

export default function Messages() {
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState<string>("testPineapple");
  const [statusString, setStatusString] = useState<String | null>(null);
  const [status, setStatus] = useState("default");
  const [selectedConversationSid, setSelectedConversationSid] =
    useState<String | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Upon page render, fetch the access token
  // this is temp, in the future will fetch once the user opens up the app again
  // the token will need to be stored globally and then fetched when they go to conversation screens
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch("/api/generate-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate token");
        }

        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.error("Error generating token:", error);
      }
    };
    fetchAccessToken();
  }, []);

  // Upon token retrieval, initilialize the conversations client
  useEffect(() => {
    if (token) {
      initConversations();
    }
  }, [token]);
  const initConversations = () => {
    if (!token) return; // Early return if token is null
    const client = new ConversationsClient(token);
    setStatusString("Connecting to Twilio…");

    client.on("connectionStateChanged", (state) => {
      if (state === "connecting") {
        setStatusString("Connecting to Twilio…");
        setStatus("default");
      }
      if (state === "connected") {
        setStatusString("You are connected.");
        setStatus("success");

        // Fetch and set all subscribed conversations
        client.getSubscribedConversations().then((paginator) => {
          setConversations(paginator.items);
        });
      }
      if (state === "disconnecting") {
        setStatusString("Disconnecting from Twilio…");
        setStatus("default");
      }
      if (state === "disconnected") {
        setStatusString("Disconnected.");
        setStatus("warning");
      }
      if (state === "denied") {
        setStatusString("Failed to connect.");
        setStatus("error");
      }
    });

    // does not seem to trigger once the converstate state is connected..
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
  };

  // select the current conversation
  const selectedConversation = conversations.find(
    (it) => it.sid === selectedConversationSid
  );

  let conversationContent;
  if (selectedConversation) {
    conversationContent = (
      <ReportConversation
        conversationProxy={selectedConversation}
        myIdentity={name}
      />
    );
  } else if (status !== "success") {
    conversationContent = "Loading your conversation!";
  } else {
    conversationContent = "";
  }

  return (
    <main id="messages-page" className="flex flex-col gap-4">
      <SearchBar page="messages" />
      <ConversationsList
        conversations={conversations}
        selectedConversationSid={selectedConversationSid}
        onConversationClick={(item: Conversation) => {
          setSelectedConversationSid(item.sid);
        }}
      />
      {conversationContent}
    </main>
  );
}
