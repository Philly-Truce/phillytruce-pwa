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

  return (
    <div
      id="message-input-container"
      className="flex flex-col gap-3 justify-between h-full"
    >
      <div
        id="message-bubbles-container"
        className="flex-grow overflow-y-auto flex flex-col gap-[14px] pt-4 scrollbar scrollbar-thumb-[#879cbd] scrollbar-w-16"
      >
        {messages.map((message, index) => {
          const friendlyName = generateFriendlyChatName(message.author);
          const isLastMessage = index === messages.length - 1;

          const isLastChatbotMessage =
            friendlyName === "Chatbot" &&
            messages
              .slice(index + 1)
              .every((m) => generateFriendlyChatName(m.author) !== "Chatbot");

          return (
            <div key={index} className="flex flex-col">
              <div
                id="message-bubble"
                ref={isLastMessage ? lastMessageRef : null}
                className={`p-4 rounded-[15px] max-w-[255px] ${
                  friendlyName === "Chatbot" || friendlyName === "You"
                    ? "bg-[#b3bfd3] self-end mr-4"
                    : "bg-white ml-4"
                }`}
              >
                <div
                  id="message-content"
                  className="text-[13px] leading-[166%] tracking-[0.4px]"
                >
                  {message.body}
                </div>
                <div
                  id="message-date-created"
                  className="text-[11px] leading-[166%] tracking-[0.4px] text-right"
                >
                  {message.dateCreated?.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
              {isLastChatbotMessage && (
                <div id="divider-wrapper" className="relative z-30">
                  <div
                    id="divider-spotlight"
                    className={`absolute inset-0 ${
                      onboardingStep < 3 && onboardingStep > 0
                        ? "bg-white bg-opacity-80"
                        : ""
                    } h-16 top-2 ${
                      onboardingStep === 1
                        ? "top-2"
                        : onboardingStep === 2
                        ? "!top-14"
                        : onboardingStep > 2
                        ? ""
                        : ""
                    }`}
                  />
                  <div
                    id="chatbot-divider"
                    className="flex flex-col mb-4 mt-[30px] text-[#1C4587] text-center text-[11px] font-bold leading-[166%] tracking-[0.4px] mx-4 relative"
                  >
                    <div
                      id="end-chatbot"
                      className="pb-[14px] border-b-4 border-dotted border-[#1C4587]"
                    >
                      [ End of Philly Bot conversation ]
                    </div>
                    <div id="start-spm" className="pt-[14px]">
                      [ Start of SPM conversation ]
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Input */}
      <form
        id="input"
        onSubmit={sendMessage}
        className="flex border py-4 pr-[27px] pl-[23px] items-center gap-[21px] rounded-[28px] bg-white mb-6 mr-4"
      >
        {/* Emoji */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2049_10952)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.6875 9C1.6875 7.0606 2.45792 5.20064 3.82929 3.82929C5.20064 2.45792 7.0606 1.6875 9 1.6875C10.9394 1.6875 12.7993 2.45792 14.1707 3.82929C15.5421 5.20064 16.3125 7.0606 16.3125 9C16.3125 10.9394 15.5421 12.7993 14.1707 14.1707C12.7993 15.5421 10.9394 16.3125 9 16.3125C7.0606 16.3125 5.20064 15.5421 3.82929 14.1707C2.45792 12.7993 1.6875 10.9394 1.6875 9ZM9 0C6.61305 0 4.32387 0.948212 2.63604 2.63604C0.948212 4.32387 0 6.61305 0 9C0 11.3869 0.948212 13.6762 2.63604 15.364C4.32387 17.0517 6.61305 18 9 18C11.3869 18 13.6762 17.0517 15.364 15.364C17.0517 13.6762 18 11.3869 18 9C18 6.61305 17.0517 4.32387 15.364 2.63604C13.6762 0.948212 11.3869 0 9 0ZM5.625 9C5.92337 9 6.20952 8.88147 6.4205 8.6705C6.63147 8.45952 6.75 8.17337 6.75 7.875C6.75 7.57663 6.63147 7.29048 6.4205 7.0795C6.20952 6.86853 5.92337 6.75 5.625 6.75C5.32663 6.75 5.04048 6.86853 4.8295 7.0795C4.61853 7.29048 4.5 7.57663 4.5 7.875C4.5 8.17337 4.61853 8.45952 4.8295 8.6705C5.04048 8.88147 5.32663 9 5.625 9ZM13.5 7.875C13.5 8.17337 13.3814 8.45952 13.1705 8.6705C12.9595 8.88147 12.6734 9 12.375 9C12.0766 9 11.7905 8.88147 11.5795 8.6705C11.3686 8.45952 11.25 8.17337 11.25 7.875C11.25 7.57663 11.3686 7.29048 11.5795 7.0795C11.7905 6.86853 12.0766 6.75 12.375 6.75C12.6734 6.75 12.9595 6.86853 13.1705 7.0795C13.3814 7.29048 13.5 7.57663 13.5 7.875ZM5.985 10.8405C6.16651 10.7134 6.39072 10.6628 6.60922 10.6997C6.82771 10.7365 7.02295 10.8578 7.15275 11.0374L7.16062 11.0475C7.27633 11.1802 7.40868 11.2974 7.55438 11.3962C7.85138 11.5965 8.32275 11.8125 9 11.8125C9.67725 11.8125 10.1475 11.5965 10.4456 11.3951C10.5913 11.2962 10.7237 11.1791 10.8394 11.0464L10.8472 11.0374C10.977 10.8551 11.1739 10.7318 11.3946 10.6947C11.6153 10.6575 11.8418 10.7096 12.024 10.8394C12.2062 10.9692 12.3296 11.1661 12.3667 11.3867C12.4038 11.6074 12.3518 11.8339 12.222 12.0161L11.5312 11.5312C12.222 12.015 12.222 12.0161 12.2209 12.0161V12.0173L12.2198 12.0195L12.2175 12.0229L12.2119 12.0308L12.1961 12.0521C12.1329 12.1368 12.0637 12.2168 11.9891 12.2917C11.8083 12.4789 11.6085 12.6467 11.3929 12.7924C10.6844 13.2631 9.85058 13.5097 9 13.5C7.93575 13.5 7.1415 13.1535 6.60825 12.7913C6.32609 12.6003 6.07136 12.3717 5.85113 12.1117C5.83504 12.0922 5.81929 12.0723 5.80387 12.0521L5.78813 12.0296L5.7825 12.0229L5.78025 12.0195V12.0173H5.77913L6.46875 11.5312L5.778 12.015C5.64971 11.8319 5.59933 11.6054 5.63793 11.3851C5.67654 11.1649 5.80095 10.9691 5.98387 10.8405H5.985Z"
              fill="#030D17"
              fillOpacity="0.6"
            />
          </g>
          <defs>
            <clipPath id="clip0_2049_10952">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
        {/* Text Box */}
        <input
          type="text"
          value={newMessage}
          onChange={onMessageChanged}
          onFocus={onInputFocus}
          placeholder="Start typing..."
          disabled={loadingState !== "ready"}
          className="flex-grow focus:outline-none "
        />
        {/* Send Button */}
        <button type="submit" disabled={loadingState !== "ready"}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2049_10955)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.98951 3.39093L2.97595 9.06292H9.06242C9.58018 9.06292 9.99992 9.48264 9.99992 10.0004C9.99992 10.5182 9.58018 10.9379 9.06242 10.9379H2.97595L1.98951 16.6099L17.4117 10.0004L1.98951 3.39093ZM1.23584 10.0004L0.0795019 3.35146C-0.0139788 2.81394 0.159948 2.26456 0.545735 1.87877C1.03047 1.39404 1.76148 1.25326 2.39157 1.52329L19.1445 8.70312C19.6634 8.92553 19.9999 9.43581 19.9999 10.0004C19.9999 10.565 19.6634 11.0753 19.1445 11.2977L2.39157 18.4775C1.76148 18.7476 1.03047 18.6067 0.545735 18.1221C0.159948 17.7362 -0.0139791 17.1869 0.0795019 16.6494L1.23584 10.0004Z"
                fill="#030D17"
                fillOpacity="0.6"
              />
            </g>
            <defs>
              <clipPath id="clip0_2049_10955">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </form>
    </div>
  );
}
