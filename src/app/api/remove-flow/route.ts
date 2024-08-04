import { NextRequest, NextResponse } from "next/server";
import twilioClient from "@/lib/twilio-client";

export async function POST(request: NextRequest) {
  try {
    console.log("remove-flow webhook hit!");

    // Fetch the Conversation SID from the incoming request
    const formData = await request.formData();
    const conversationSid = formData.get("body") as string;
    console.log("ConversationSid:", conversationSid);

    // Fetch the webhooks based on the conversation SID
    const webhooks = await twilioClient.conversations.v1
      .conversations(conversationSid)
      .webhooks.list({ limit: 20 });
    // console.log("webhooks:", webhooks);

    // Filter for the studio flow webhook for its Sid
    const studioWebhookSid = webhooks.find(
      (webhook) => webhook.target === "studio"
    )?.sid;

    // Remove the flow from the conversation
    if (studioWebhookSid) {
      await twilioClient.conversations.v1
        .conversations(conversationSid)
        .webhooks(studioWebhookSid)
        .remove();
    }

    // Create a participant for testing
    // in future participant will only be added when they claim report
    await twilioClient.conversations.v1
      .conversations(conversationSid)
      .participants.create({ identity: "testPineapple" });

    // Return a success response
    return NextResponse.json(
      { message: "Flow removed from conversation successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing flow from conversation:", error);
    return NextResponse.json(
      { error: "Failed to remove flow from conversation" },
      { status: 500 }
    );
  }
}
