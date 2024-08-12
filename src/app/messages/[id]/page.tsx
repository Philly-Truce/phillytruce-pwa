"use client";

import { useEffect, useState } from "react";
import Chat from "@/components/messages/chat";
import { Conversation } from "@twilio/conversations";
import { useTwilio } from "@/lib/twilio-provider";
import OnboardingModal from "@/components/messages/onboarding-modal";

export default function Home({ params }: { params: { id: string } }) {
  const { client, status } = useTwilio(); // Use the Twilio context
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [onboardingStep, setOnboardingStep] = useState(0);

  useEffect(() => {
    // Fetch all the conversations
    if (client && status === "success") {
      client
        .getConversationBySid(params.id)
        .then((conversation) => {
          setSelectedConversation(conversation);
        })
        .catch((error) => {
          console.error("Error fetching conversation:", error);
        });

      return () => {
        client.removeAllListeners();
      };
    }
  }, [client, status, params.id]);

  return (
    <div id="chat-wrapper" className="w-full bg-[#f3f3f3] pt-16 max-h-screen">
      {selectedConversation ? (
        <div id="chat-onboarding-wrapper" className="h-full">
          <Chat
            conversationProxy={selectedConversation}
            onboardingStep={onboardingStep}
          />
          {/* {onboardingStep < 4 && ( */}
          <OnboardingModal
            step={onboardingStep}
            setOnboardingStep={setOnboardingStep}
          />
          {/* )} */}
        </div>
      ) : (
        <div id="loading" className="text-center mt-72">
          Loading ...
        </div>
      )}
    </div>
  );
}
