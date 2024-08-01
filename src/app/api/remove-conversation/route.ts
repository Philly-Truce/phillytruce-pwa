import { NextRequest, NextResponse } from "next/server";
import twilioClient from "@/lib/twilio-client";

export async function GET(request: NextRequest) {
  try {
    // Fetch the conversation SID
    const conversations =
      await twilioClient.conversations.v1.conversations.list();
    const conversationSid = conversations[0].sid;

    // Delete the conversation with the ConversationSid
    await twilioClient.conversations.v1.conversations(conversationSid).remove();

    // Return a success response
    return NextResponse.json(
      { message: "Conversation deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting conversation:", error);
    return NextResponse.json(
      { error: "Failed to delete conversation" },
      { status: 500 }
    );
  }
}
