"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from "react";
import ConversationsList from "@/components/messages/conversations-list";
import SearchBar from "@/components/search-bar";
import { useTwilio } from "@/lib/twilio-provider";
export default function Messages() {
    const { client, status } = useTwilio();
    const [conversations, setConversations] = useState([]);
    const [filteredConversations, setFilteredConversations] = useState([]);
    useEffect(() => {
        if (client && status === "success") {
            // Fetch and set all subscribed conversations
            client.getSubscribedConversations().then((paginator) => {
                setConversations(paginator.items);
            });
            client.on("conversationJoined", (conversation) => {
                setConversations((prevConversations) => [
                    ...prevConversations,
                    conversation,
                ]);
            });
            client.on("conversationLeft", (thisConversation) => {
                setConversations((prevConversations) => prevConversations.filter((it) => it !== thisConversation));
            });
            return () => {
                client.removeAllListeners();
            };
        }
    }, [client, status]);
    const handleSearch = (e) => __awaiter(this, void 0, void 0, function* () {
        const query = e.target.value;
        if (!query) {
            setFilteredConversations(conversations);
            return;
        }
        const filtered = yield Promise.all(conversations.map((conversation) => __awaiter(this, void 0, void 0, function* () {
            const messagePaginator = yield conversation.getMessages();
            const messages = messagePaginator.items;
            const matchingMessages = messages.filter((message) => { var _a; return (_a = message.body) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(query.toLowerCase()); });
            return matchingMessages.length > 0 ? conversation : null;
        })));
        setFilteredConversations(filtered.filter((conv) => conv !== null));
    });
    useEffect(() => {
        setFilteredConversations(conversations);
    }, [conversations]);
    return (<main id="messages-page" className="flex flex-col gap-4 w-full items-center p-4 pt-20">
      <SearchBar page="messages" onSearch={handleSearch}/>
      <ConversationsList conversations={filteredConversations}/>
    </main>);
}
