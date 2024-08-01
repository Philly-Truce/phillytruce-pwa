import { NextRequest, NextResponse } from "next/server";
import twilioClient from "@/lib/twilio-client";

export async function POST(request: NextRequest) {
  try {
    console.log("new-message endpoint hit");
    // Parse request body
    const formData = await request.formData();
    console.log(formData);

    const conversationSid = formData.get("ConversationSid") as string;

    // Log the last two messages from the conversation
    const messages = await twilioClient.conversations.v1
      .conversations(conversationSid)
      .messages.list({ limit: 2, order: "desc" });
    messages.forEach((m) => console.log(m));

    // TODO: insert new message record into database

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
