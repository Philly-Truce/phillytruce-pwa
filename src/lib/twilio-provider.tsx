"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Client as ConversationsClient } from "@twilio/conversations";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";

type TwilioContextType = {
  client: ConversationsClient | null;
  token: string | null;
  statusString: string | null;
  status: string;
  unreadChatsCount: number;
};

export const TwilioContext = createContext<TwilioContextType | undefined>(undefined);

export const TwilioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [client, setClient] = useState<ConversationsClient | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [statusString, setStatusString] = useState<string | null>(null);
  const [status, setStatus] = useState("default");
  const [unreadChatsCount, setUnreadChatsCount] = useState(0);
  const pathname = usePathname();

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
          body: JSON.stringify({ name: "testPineapple" }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate token");
        }

        const data = await response.json();
        setToken(data.token);

        Cookies.set("accessToken", data.token, { expires: 1 / 24 });
        Cookies.set("accessTokenDate", new Date().toISOString(), {
          expires: 1 / 24,
        });
      } catch (error) {
        console.error("Error generating token:", error);
      }
    };

    fetchOrRetrieveToken();
  }, []);

  useEffect(() => {
    if (token) {
      const newClient = new ConversationsClient(token);
      setClient(newClient);
      setStatusString("Connecting to Twilio…");

      newClient.on("connectionStateChanged", (state) => {
        if (state === "connecting") {
          setStatusString("Connecting to Twilio…");
          setStatus("default");
        }
        if (state === "connected") {
          setStatusString("You are connected.");
          setStatus("success");
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
    }
  }, [token]);

  // loop through all conversations and count which ones are unread
  const fetchUnreadChatsCount = useCallback(async () => {
    if (client) {
      try {
        let temp = 0;

        // Fetch and set all subscribed conversations
        const paginator = await client.getSubscribedConversations();
        const conversations = paginator.items;

        // Use Promise.all to handle multiple async operations
        await Promise.all(
          conversations.map(async (conversation) => {
            const messagePaginator = await conversation.getMessages(1);
            const latestMessage = messagePaginator.items[0] || null;

            if (conversation.lastReadMessageIndex !== latestMessage?.index) {
              temp += 1;
            }
          })
        );

        setUnreadChatsCount(temp);
      } catch (error) {
        console.error("Error fetching unread chat count:", error);
      }
    }
  }, [client]); // Added dependency array

  // if user enters a conversation (AKA pathname changes) then refetch unread chat count
  useEffect(() => {
    fetchUnreadChatsCount();
  }, [client, fetchUnreadChatsCount, pathname]);

  useEffect(() => {
    // call fetchunreadchatscount evertime message is added for each conversation
    const addCountFetchers = async () => {
      if (client) {
        try {
          // Fetch and set all subscribed conversations
          client.getSubscribedConversations().then((paginator) => {
            console.log('paginator: ' + paginator)
            const conversations = paginator.items;
            conversations.map((conversation) => {
              conversation.on("messageAdded", fetchUnreadChatsCount);
            });
          });
        } catch (error) {
          console.error("Error fetching unread chat count:", error);
        }
      }
    };

    addCountFetchers();

    return () => {
      client?.removeAllListeners();
    };
  }, [client]);

  // debugging
  useEffect(() => {
    console.log("unreadChatsCount:", unreadChatsCount);
  }, [unreadChatsCount]);

  return (
    <TwilioContext.Provider
      value={{ client, token, statusString, status, unreadChatsCount }}
    >
      {children}
    </TwilioContext.Provider>
  );
};

export const useTwilio = () => {
  const context = useContext(TwilioContext);
  
  if (context === undefined) {
    throw new Error("useTwilio must be used within a TwilioProvider");
  }

  return context;
};
