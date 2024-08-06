import React from "react";
import { Conversation } from "@twilio/conversations";

export default function ConversationsList({
  conversations,
  selectedConversationSid,
  onConversationClick,
}: {
  conversations: Conversation[];
  selectedConversationSid: String | null;
  onConversationClick: (conversation: Conversation) => void;
}) {
  return (
    <div className="border border-gray-300 rounded-md">
      <h3 className="p-3 border-b border-gray-300 font-semibold">
        Open Conversations
      </h3>
      {conversations.length === 0 ? (
        <div className="p-3 text-center">Loading...</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {conversations.map((item) => {
            const isActive = item.sid === selectedConversationSid;
            return (
              <li
                key={item.sid}
                onClick={() => onConversationClick(item)}
                className={`p-3 cursor-pointer transition-colors duration-300 ${
                  isActive ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <span className="font-bold">
                  {item.friendlyName || item.sid}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
