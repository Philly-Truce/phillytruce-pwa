"use client";

import { useEffect, useState } from "react";
import {
  Client as ConversationsClient,
  Conversation,
} from "@twilio/conversations";
import Cookies from "js-cookie";
import ConversationsList from "@/components/messages/conversations-list";
import SearchBar from "@/components/search-bar";

export default function Messages() {
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState<string>("testPineapple");
  const [statusString, setStatusString] = useState<String | null>(null);
  const [status, setStatus] = useState("default");
  const [selectedConversationSid, setSelectedConversationSid] =
    useState<String | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Upon render, if token is still less than an hour old retrieve from cookie
  // otherwise fetch a new token and store token and date created in storage
  // now token can be stored globally because of cookies and only needs be regenerated
  // every hour instead of on every page load
  useEffect(() => {
    const fetchOrRetrieveToken = async () => {
      const storedToken = Cookies.get("accessToken");
      const storedTokenDate = Cookies.get("accessTokenDate");

      if (storedToken && storedTokenDate) {
        const tokenDate = new Date(storedTokenDate);
        const now = new Date();
        const diffInHours =
          (now.getTime() - tokenDate.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 1) {
          setToken(storedToken);
          return;
        }
      }

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

        // Store the new token and its creation date
        Cookies.set("accessToken", data.token, { expires: 1 / 24 }); // Expires in 1 hour
        Cookies.set("accessTokenDate", new Date().toISOString(), {
          expires: 1 / 24,
        });
      } catch (error) {
        console.error("Error generating token:", error);
      }
    };

    fetchOrRetrieveToken();
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

  return (
    <main
      id="messages-page"
      className="flex flex-col gap-4 w-full items-center p-4 pt-14"
    >
      <SearchBar page="messages" />
      <ConversationsList conversations={conversations} />
    </main>
  );
}
