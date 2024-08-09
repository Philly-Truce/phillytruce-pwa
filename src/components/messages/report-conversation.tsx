"use client";

import React, { useState, useEffect } from "react";
import {
  Conversation as TwilioConversation,
  Message,
} from "@twilio/conversations";

export default function ReportConversation({
  conversationProxy,
  myIdentity,
}: {
  conversationProxy: TwilioConversation;
  myIdentity: String;
}) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingState, setLoadingState] = useState("initializing");

  useEffect(() => {
    if (conversationProxy) {
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
              console.error("Couldn't fetch messages IMPLEMENT RETRY", err);
              setLoadingState("failed");
            });
        }
      };

      loadMessagesFor(conversationProxy);

      const messageAdded = (m: Message) => {
        setMessages((prevMessages) => [...prevMessages, m]);
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
    <div id="message-input-container" className="flex flex-col h-full">
      <div id="message" className="flex-grow overflow-y-auto p-3">
        {messages.map((message, index) => (
          <div key={index} className="mb-3">
            <strong>
              {message.author === "+18333224149" ||
              message.author?.startsWith("CH")
                ? "Chatbot"
                : message.author === "+18777804236"
                ? "Reporter"
                : message.author}
              :{" "}
            </strong>
            {message.body}
          </div>
        ))}
      </div>
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