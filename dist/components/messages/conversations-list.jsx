var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { generateFriendlyChatName } from "@/lib/utils";
export default function ConversationsList({ conversations, }) {
    const [conversationToLatestMessage, setConversationToLatestMessage] = useState({});
    const updateLatestMessage = useCallback((conversation, message) => {
        setConversationToLatestMessage((prev) => (Object.assign(Object.assign({}, prev), { [conversation.sid]: message })));
    }, []);
    useEffect(() => {
        const fetchLatestMessages = () => __awaiter(this, void 0, void 0, function* () {
            const updatedConversationToLatestMessage = {};
            for (const conversation of conversations) {
                try {
                    const messagePaginator = yield conversation.getMessages(1);
                    const latestMessage = messagePaginator.items[0] || null;
                    updatedConversationToLatestMessage[conversation.sid] = latestMessage;
                }
                catch (error) {
                    console.error(`Error fetching message for conversation ${conversation.sid}:`, error);
                    updatedConversationToLatestMessage[conversation.sid] = null;
                }
            }
            setConversationToLatestMessage(updatedConversationToLatestMessage);
        });
        fetchLatestMessages();
        // Set up listeners for new messages
        const messageListeners = conversations.map((conversation) => {
            const listener = (message) => updateLatestMessage(conversation, message);
            conversation.on("messageAdded", listener);
            return { conversation, listener };
        });
        // Cleanup function to remove listeners
        return () => {
            messageListeners.forEach(({ conversation, listener }) => {
                conversation.off("messageAdded", listener);
            });
        };
    }, [conversations, updateLatestMessage]);
    return (<div id="placeholder-list-container" className="w-full">
      {conversations.length === 0 ? (
        // Note: if screen is in loading... there are either no conversations to show or the conversationsa re loading
        <div className="p-3 text-center">Loading ...</div>) : (<div id="conversations-list-container" className="divide-y divide-gray-200 w-full">
          {conversations.map((conversation) => {
                const latestMessage = conversationToLatestMessage[conversation.sid];
                return (<Link key={conversation.sid} href={`/messages/${conversation.sid}`}>
                {(latestMessage === null || latestMessage === void 0 ? void 0 : latestMessage.index) && (<div id="conversation-container" className={`cursor-pointer transition-colors duration-300 hover:bg-gray-50 border-b-[var(#F2F2F2,#F2F2F2)] border-b border-solid flex ${conversation.lastReadMessageIndex === (latestMessage === null || latestMessage === void 0 ? void 0 : latestMessage.index)
                            ? ""
                            : "font-bold"} text-black overflow-hidden`}>
                    {/* Notification */}
                    <div id="conversation-notification" className="flex flex-col justify-center pr-4">
                      <div id="notification-dot" className={`rounded-full w-4 h-4 bg-[#F6893C] ${conversation.lastReadMessageIndex ===
                            (latestMessage === null || latestMessage === void 0 ? void 0 : latestMessage.index)
                            ? "invisible"
                            : "!visible"}`}></div>
                    </div>
                    {/* Header, Time, and Latest Message */}
                    <div id="conversation-header-time-latest-container" className="py-4 flex flex-col gap-1 flex-grow overflow-hidden">
                      <div id="conversation-header-time-container" className="flex items-center justify-between">
                        {/* Header */}
                        <div className="leading-6 tracking-[0.15px] overflow-hidden text-ellipsis whitespace-nowrap">
                          Message #{conversation.sid.slice(-4)}
                        </div>
                        <div className="flex items-center flex-shrink-0 ml-2">
                          {latestMessage && (<div id="time" className="text-sm text-[#293444] leading-5 tracking-[0.25px] whitespace-nowrap">
                              {latestMessage.dateCreated
                                ? latestMessage.dateCreated.toLocaleString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                })
                                : ""}
                            </div>)}
                          {/* Right Arrow */}
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 ml-2">
                            <path d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z" fill="#334155"/>
                            <path d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z" fill="black" fillOpacity="0.2"/>
                          </svg>
                        </div>
                      </div>
                      {/* Latest Message */}
                      {latestMessage && (<div className="text-sm leading-5 tracking-[0.25px] whitespace-nowrap overflow-hidden text-ellipsis pr-4">
                          {generateFriendlyChatName(latestMessage.author)}:{" "}
                          {latestMessage.body}
                        </div>)}
                    </div>
                  </div>)}
              </Link>);
            })}
        </div>)}
    </div>);
}
