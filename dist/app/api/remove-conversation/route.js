var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NextResponse } from "next/server";
import twilioClient from "@/lib/twilio-client";
export function GET(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch the conversation SID
            const conversations = yield twilioClient.conversations.v1.conversations.list();
            const conversationSid = conversations[0].sid;
            // Delete the conversation with the ConversationSid
            yield twilioClient.conversations.v1.conversations(conversationSid).remove();
            // Return a success response
            return NextResponse.json({ message: "Conversation deleted successfully!" }, { status: 200 });
        }
        catch (error) {
            console.error("Error deleting conversation:", error);
            return NextResponse.json({ error: "Failed to delete conversation" }, { status: 500 });
        }
    });
}
