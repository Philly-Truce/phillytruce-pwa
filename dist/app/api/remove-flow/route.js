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
export function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            console.log("remove-flow webhook hit!");
            // Fetch the Conversation SID from the incoming request
            const formData = yield request.formData();
            const conversationSid = formData.get("body");
            console.log("ConversationSid:", conversationSid);
            // Fetch the webhooks based on the conversation SID
            const webhooks = yield twilioClient.conversations.v1
                .conversations(conversationSid)
                .webhooks.list({ limit: 20 });
            // console.log("webhooks:", webhooks);
            // Filter for the studio flow webhook for its Sid
            const studioWebhookSid = (_a = webhooks.find((webhook) => webhook.target === "studio")) === null || _a === void 0 ? void 0 : _a.sid;
            // Remove the flow from the conversation
            if (studioWebhookSid) {
                yield twilioClient.conversations.v1
                    .conversations(conversationSid)
                    .webhooks(studioWebhookSid)
                    .remove();
            }
            // Create a participant for testing
            // in future participant will only be added when they claim report
            yield twilioClient.conversations.v1
                .conversations(conversationSid)
                .participants.create({ identity: "testPineapple" });
            // Return a success response
            return NextResponse.json({ message: "Flow removed from conversation successfully!" }, { status: 200 });
        }
        catch (error) {
            console.error("Error removing flow from conversation:", error);
            return NextResponse.json({ error: "Failed to remove flow from conversation" }, { status: 500 });
        }
    });
}
