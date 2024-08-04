import { NextRequest, NextResponse } from "next/server";
import twilioClient from "@/lib/twilio-client";

export async function POST(request: NextRequest) {
  try {
    console.log("new-conversation endpoint hit!");

    // Parse the incoming request body for conversation SID
    const formData = await request.formData();
    const conversationSid = formData.get("ConversationSid") as string;

    // Add studio flow webhook to Conversation
    const flowWebhook = await twilioClient.conversations.v1
      .conversations(conversationSid)
      .webhooks.create({
        target: "studio",
        "configuration.flowSid": "FWdf1cea94253cc73100c3cff556397d7a",
        "configuration.replayAfter": 0,
      });

    // Add on-message-added webhook to new conversation
    const msgWebhook = await twilioClient.conversations.v1
      .conversations(conversationSid)
      .webhooks.create({
        "configuration.filters": ["onMessageAdded"],
        "configuration.method": "POST",
        "configuration.url":
          "https://woods-ee-tennis-themes.trycloudflare.com/api/inbound-messages",
        "configuration.replayAfter": 0,
        target: "webhook",
      });

    return NextResponse.json(
      { message: "Webooks added to the conversation successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
}
