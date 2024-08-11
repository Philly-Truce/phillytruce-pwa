"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Chat from "@/components/messages/chat";
import {
  Client as ConversationsClient,
  Conversation,
} from "@twilio/conversations";
import { useTwilio } from "@/lib/twilio-provider";

const OnboardingModal = ({
  step,
  onNext,
}: {
  step: number;
  onNext: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const tutorialContent = [
    "This is the chat interface for Report #3333:Would you like a tutorial on how to navigate this page:Yes",
    "Above the dotted line:Everything above this dotted line represents the conversation between the reporter and Philly Truce bot.:Next",
    "Below the dotted line:Everything below the line represents the conversation that YOU may have with the reporter.:Next",
    "Accessing the Report:By clicking this icon, you will be brought to the Report associated with this Message.:Finish Tutorial",
  ];

  const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    onNext((prevStep) => prevStep + 1);
  };

  const [title, text, buttonName] = tutorialContent[step].split(":");

  return (
    <>
      <div
        id="modal"
        className={`w-4/5 z-30 fixed top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[28px] ${
          step === 0
            ? "modal-top"
            : step === 1
            ? "modal-bottom"
            : "modal-top-right"
        }`}
      >
        <div
          id="modal-title-text-wrapper"
          className="mx-6 mt-6 flex flex-col gap-4"
        >
          <div id="modal-title" className="text-xl font-medium leading-8">
            {title}
          </div>
          <div
            id="modal-text"
            className="text-slate-700 text-sm font-normal leading-5 tracking-[0.1px];"
          >
            {text}
          </div>
        </div>
        <div id="modal-button-wrapper" className="p-5 flex justify-end">
          <button
            id="modal-button"
            className="text-[#1C4587] text-sm font-extrabold leading-5 tracking-[0.1px];"
            onClick={handleNext}
          >
            {buttonName}
          </button>
        </div>
      </div>
      <div
        id="overlay"
        className={`fixed w-screen h-screen z-10 ${
          step < 3 && "bg-black inset-0 opacity-35"
        }`}
      />
    </>
  );
};

export default function Home({ params }: { params: { id: string } }) {
  const { client, statusString, status } = useTwilio(); // Use the Twilio context
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [onboardingStep, setOnboardingStep] = useState(0);

  // Initialize conversation when client is ready
  useEffect(() => {
    if (client && status === "success") {
      client
        .getConversationBySid(params.id)
        .then((conversation) => {
          setSelectedConversation(conversation);
        })
        .catch((error) => {
          console.error("Error fetching conversation:", error);
        });

      client.on("conversationJoined", (conversation) => {
        if (conversation.sid === params.id) {
          setSelectedConversation(conversation);
        }
      });

      client.on("conversationLeft", (conversation) => {
        if (conversation.sid === params.id) {
          setSelectedConversation(null);
        }
      });

      return () => {
        client.removeAllListeners();
      };
    }
  }, [client, status, params.id]);

  return (
    <div id="chat-wrapper" className="w-full bg-[#f3f3f3] pt-16 max-h-screen">
      <div
        id="document-icon-spotlight"
        className={`fixed w-14 h-14 z-20 top-2 right-3 ${
          onboardingStep === 3 && "shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]"
        }`}
      />
      {selectedConversation ? (
        <div id="chat-onboarding-wrapper" className="h-full">
          <Chat
            conversationProxy={selectedConversation}
            myIdentity="testPineapple"
            onboardingStep={onboardingStep}
          />
          {onboardingStep < 4 && (
            <OnboardingModal
              step={onboardingStep}
              onNext={() => setOnboardingStep(onboardingStep + 1)}
            />
          )}
        </div>
      ) : (
        <div id="loading" className="text-center mt-72">
          Loading ...
        </div>
      )}
    </div>
  );
}
