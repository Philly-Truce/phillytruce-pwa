"use client";

import React, { useState, useEffect } from "react";
import {
  Conversation as TwilioConversation,
  Message,
} from "@twilio/conversations";
import { generateFriendlyChatName } from "@/lib/utils";

export default function Home({
  conversationProxy,
  myIdentity,
}: {
  conversationProxy: TwilioConversation;
  myIdentity: String;
}) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingState, setLoadingState] = useState("initializing");

  // retrieve the messages and add event listeners to the conversation
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

  return (
    <div id="message-input-container" className="flex flex-col">
      {/* Message Bubble */}
      <div
        id="message-bubbles-container"
        className="flex-grow overflow-y-auto p-3"
      >
        {messages.map((message, index) => {
          const friendlyName = generateFriendlyChatName(message.author);
          return (
            <div
              id="message-bubble"
              key={index}
              className={`mb-3 ${
                friendlyName === "Chatbot" || friendlyName === "You"
                  ? "bg-cyan-200"
                  : "bg-white"
              }`}
            >
              {`${friendlyName}: ${message.body}`}
            </div>
          );
        })}
      </div>
      {/* Input */}
      <form id="input" onSubmit={sendMessage} className="flex p-3">
        <input
          type="text"
          value={newMessage}
          onChange={onMessageChanged}
          placeholder="Type your message here..."
          disabled={loadingState !== "ready"}
          className="flex-grow mr-3 p-2"
        />
        <button type="submit" disabled={loadingState !== "ready"}>
          Send
        </button>
      </form>
    </div>
  );
}
