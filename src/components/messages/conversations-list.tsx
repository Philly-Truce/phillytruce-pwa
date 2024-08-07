import React, { useState, useEffect } from "react";
import { Conversation, Message } from "@twilio/conversations";
import Link from "next/link";

export default function ConversationsList({
  conversations,
}: {
  conversations: Conversation[];
}) {
  const [conversationToLatestMessage, setConversationToLatestMessage] =
    useState<Record<string, Message | null>>({});

  const generateFriendlyName = (author: string | null) => {
    if (!author) return;
    return author.startsWith("CH") || author === "+18333224149"
      ? "Chatbot"
      : author === "testPineapple"
      ? "You"
      : "Reporter";
  };

  useEffect(() => {
    const fetchLatestMessages = async () => {
      const updatedConversationToLatestMessage: Record<string, Message | null> =
        {};
      for (const conversation of conversations) {
        try {
          const messagePaginator = await conversation.getMessages(1);
          updatedConversationToLatestMessage[conversation.sid] =
            messagePaginator.items[0] || null;
        } catch (error) {
          console.error(
            `Error fetching message for conversation ${conversation.sid}:`,
            error
          );
          updatedConversationToLatestMessage[conversation.sid] = null;
        }
      }
      setConversationToLatestMessage(updatedConversationToLatestMessage);
    };
    fetchLatestMessages();

    // Subscribe to new messages for each conversation
    conversations.map((conversation) =>
      conversation.on("messageAdded", (message) => {
        fetchLatestMessages();
      })
    );
  }, [conversations]);

  return (
    <div id="placeholder-list-container" className="w-full">
      {conversations.length === 0 ? (
        <div className="p-3 text-center">
          Loading...or You simply do not have any conversations
        </div>
      ) : (
        <div
          id="conversations-list-container"
          className="divide-y divide-gray-200 w-full"
        >
          {conversations.map((conversation) => {
            const latestMessage = conversationToLatestMessage[conversation.sid];
            return (
              <Link
                key={conversation.sid}
                href={`/messages/${conversation.sid}`}
              >
                <div
                  id="conversation-container"
                  className="cursor-pointer transition-colors duration-300 hover:bg-gray-50 border-b-[var(#F2F2F2,#F2F2F2)] border-b border-solid flex font-bold text-black overflow-hidden"
                >
                  {/* Notification */}
                  <div
                    id="conversation-notification"
                    className="flex flex-col justify-center pr-4"
                  >
                    <div
                      id="notification-dot"
                      className="rounded-full w-4 h-4 bg-[#F6893C]"
                    ></div>
                  </div>
                  {/* Header, Time, and Latest Message */}
                  <div
                    id="conversation-header-time-latest-container"
                    className="py-4 flex flex-col gap-1 flex-grow overflow-hidden"
                  >
                    <div
                      id="conversation-header-time-container"
                      className="flex items-center justify-between"
                    >
                      {/* Header */}
                      <div className="font-bold leading-6 tracking-[0.15px] overflow-hidden text-ellipsis whitespace-nowrap">
                        Message #{conversation.sid.slice(-4)}
                      </div>
                      <div className="flex items-center flex-shrink-0 ml-2">
                        {latestMessage && (
                          <div
                            id="time"
                            className="text-sm text-[#293444] leading-5 tracking-[0.25px] whitespace-nowrap"
                          >
                            {latestMessage.dateCreated
                              ? latestMessage.dateCreated.toLocaleString(
                                  "en-US",
                                  {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                )
                              : ""}
                          </div>
                        )}
                        {/* Right Arrow */}
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="flex-shrink-0 ml-2"
                        >
                          <path
                            d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z"
                            fill="#334155"
                          />
                          <path
                            d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z"
                            fill="black"
                            fillOpacity="0.2"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* Latest Message */}
                    {latestMessage && (
                      <div className="text-sm leading-5 tracking-[0.25px] whitespace-nowrap overflow-hidden text-ellipsis pr-4">
                        <strong>
                          {generateFriendlyName(latestMessage.author)}:{" "}
                        </strong>
                        {latestMessage.body}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
