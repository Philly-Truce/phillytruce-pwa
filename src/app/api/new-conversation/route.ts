import { NextRequest, NextResponse } from "next/server";
import twilioClient from "@/lib/twilio-client";

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body for conversation SID
    const formData = await request.formData();
    const conversationSid = formData.get("ConversationSid") as string;
    const chatServiceSid = formData.get("ChatServiceSid") as string;

    console.log("chatServiceSid:", chatServiceSid);

    // Add studio flow webhook to Conversation
    const flowWebhook = await twilioClient.conversations.v1
      .conversations(conversationSid)
      .webhooks.create({
        target: "studio",
        "configuration.flowSid": "FWdf1cea94253cc73100c3cff556397d7a",
        "configuration.replayAfter": 0,
      });

    console.log("Conversation scoped studio flow webhook SID", flowWebhook.sid);

    // Add new message webhook to Conversation
    // const msgWebhook = await twilioClient.conversations.v1
    //   .conversations(conversationSid)
    //   .webhooks.create({
    //     "configuration.filters": [
    //       "onMessageAdded",
    //       "onMessageUpdated",
    //       "onMessageRemoved",
    //       "onConversationUpdated",
    //     ],
    //     "configuration.method": "POST",
    //     "configuration.url":
    //       "https://oracle-martha-friends-weak.trycloudflare.com/api/new-message",
    //     "configuration.replayAfter": 0,
    //     target: "webhook",
    //   });

    // console.log("Conversation scoped message webhook SID", msgWebhook.sid);

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
