"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Conversation as TwilioConversation,
  Message,
} from "@twilio/conversations";
import { generateFriendlyChatName } from "@/lib/utils";

// TODO: Add emoji icon functionality => brings up emoji menu
export default function Home({
  conversationProxy,
  myIdentity,
  onboardingStep,
}: {
  conversationProxy: TwilioConversation;
  myIdentity: String;
  onboardingStep: number;
}) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingState, setLoadingState] = useState("initializing");
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // retrieve the messages and sprinkle in thhe event listeners
  useEffect(() => {
    if (conversationProxy) {
      // Merely being on this page sets all messages to read
      conversationProxy.setAllMessagesRead();

      const loadMessagesFor = (thisConversation: TwilioConversation) => {
        if (conversationProxy === thisConversation) {
          thisConversation
            .getMessages()
            .then((messagePaginator) => {
              if (conversationProxy === thisConversation) {
                setMessages(messagePaginator.items);
                setLoadingState("ready");
              }
            })
            .catch((err) => {
              console.error("Could not fetch messages IMPLEMENT RETRY", err);
              setLoadingState("failed");
            });
        }
      };

      loadMessagesFor(conversationProxy);

      const messageAdded = (m: Message) => {
        setMessages((prevMessages) => [...prevMessages, m]);
        conversationProxy.setAllMessagesRead();
      };
      conversationProxy.on("messageAdded", messageAdded);

      return () => {
        conversationProxy.off("messageAdded", messageAdded);
      };
    }
  }, [conversationProxy]);

  const onMessageChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newMessage.trim()) {
      conversationProxy.sendMessage(newMessage);
      setNewMessage("");
    }
  };

  const scrollToBottom = () => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onInputFocus = () => {
    scrollToBottom();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return <div>Hello world!</div>;
}
