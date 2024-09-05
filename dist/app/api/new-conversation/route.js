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
import prisma from "@/db/index";
export function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Parse request body
            const formData = yield request.formData();
            console.log(formData);
            const conversationSid = formData.get("ConversationSid");
            // Add flow webhook
            yield twilioClient.conversations.v1
                .conversations(conversationSid)
                .webhooks.create({
                target: "studio",
                "configuration.flowSid": "FWdf1cea94253cc73100c3cff556397d7a",
                "configuration.replayAfter": 0,
            });
            // Add inbound-messages webhook
            yield twilioClient.conversations.v1
                .conversations(conversationSid)
                .webhooks.create({
                "configuration.filters": ["onMessageAdded"],
                "configuration.method": "POST",
                "configuration.url": "https://customers-wt-serum-northeast.trycloudflare.com/api/inbound-messages",
                "configuration.replayAfter": 0,
                target: "webhook",
            });
            // Create a new report
            yield prisma.report.create({
                data: {
                    incident_report_number: conversationSid.slice(-4),
                    report_origin: "witness_text",
                    report_initiated_at: new Date(),
                    report_stage: "data_gathering",
                    incident_type: "Example incident",
                    description: "This is a test report.",
                    location: "Test location",
                    report_last_updated_at: new Date(),
                    ppd_notified: false,
                    messages: {
                        message_id: formData.get("MessagingServiceSid"),
                        from: formData.get("MessagingBinding.Address"),
                        to: formData.get("MessagingBinding.ProxyAddress"),
                        message_content: "Example message.",
                        created_at: new Date(),
                    },
                },
            });
            return NextResponse.json({ message: "Webooks added to the conversation successfully" }, { status: 200 });
        }
        catch (error) {
            console.error("Error:", error);
            return NextResponse.json({ error: "An error occurred while processing the request" }, { status: 500 });
        }
    });
}
