"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Client as ConversationsClient,
  Conversation,
} from "@twilio/conversations";
import ConversationsList from "@/components/messages/conversations-list";
import ReportConversation from "@/components/messages/report-conversation";

export default function Messages() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState<string>("testPineapple");
  const [conversationsClient, setConversationsClient] =
    useState<ConversationsClient | null>(null);
  const [statusString, setStatusString] = useState<String | null>(null);
  const [status, setStatus] = useState("default");
  const [selectedConversationSid, setSelectedConversationSid] =
    useState<String | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // When user logs in, an access token for their chat account is created
  const handleLogin = async () => {
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
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error generating token:", error);
    }
  };

  // Once you have the token, initalize the conversations client
  useEffect(() => {
    if (token) {
      initConversations();
    }
  }, [token]);

  //   Debugger
  useEffect(() => {
    console.log("conversations", conversations);
  }, [conversations]);

  const initConversations = () => {
    if (!token) return; // Early return if token is null
    const client = new ConversationsClient(token);
    setConversationsClient(client);
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

  //
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
    <main className="w-full flex flex-col items-center my-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="mb-2 p-2 border rounded"
      />
      <Button onClick={handleLogin}>Login</Button>
      {isLoggedIn && (
        <div className="conversations-window-wrapper">
          <ConversationsList
            conversations={conversations}
            selectedConversationSid={selectedConversationSid}
            onConversationClick={(item: Conversation) => {
              setSelectedConversationSid(item.sid);
            }}
          />
          {conversationContent}
        </div>
      )}
    </main>
  );
}
