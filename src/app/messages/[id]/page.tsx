"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Chat from "@/components/messages/chat";
import {
  Client as ConversationsClient,
  Conversation,
} from "@twilio/conversations";

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
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState<string>("testPineapple");
  const [statusString, setStatusString] = useState<String | null>(null);
  const [status, setStatus] = useState("default");
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [onboardingStep, setOnboardingStep] = useState(0);

  // Fetch token
  useEffect(() => {
    const fetchOrRetrieveToken = async () => {
      const storedToken = Cookies.get("accessToken");
      const storedTokenDate = Cookies.get("accessTokenDate");

      if (storedToken && storedTokenDate) {
        const tokenDate = new Date(storedTokenDate);
        const now = new Date();
        const diffInHours =
          (now.getTime() - tokenDate.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 1) {
          setToken(storedToken);
          return;
        }
      }

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

        // Store the new token and its creation date
        Cookies.set("accessToken", data.token, { expires: 1 / 24 }); // Expires in 1 hour
        Cookies.set("accessTokenDate", new Date().toISOString(), {
          expires: 1 / 24,
        });
      } catch (error) {
        console.error("Error generating token:", error);
      }
    };

    fetchOrRetrieveToken();
  }, []);

  // Initialize conversation off token
  useEffect(() => {
    if (token) {
      initConversations();
    }
  }, [token]);

  const initConversations = () => {
    if (!token) return; // Early return if token is null
    const client = new ConversationsClient(token);
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

    client.on("conversationJoined", (conversation) => {
      conversation.sid === params.id
        ? setSelectedConversation(conversation)
        : "";
    });

    client.on("conversationLeft", (conversation) => {
      conversation.sid === params.id ? setSelectedConversation(null) : "";
    });
  };

  // Debugging
  useEffect(() => {
    console.log("onboardingStep:", onboardingStep);
  }, [onboardingStep]);

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
