import { NextRequest, NextResponse } from "next/server";
import twilioClient from "@/lib/twilio-client";

export async function GET(request: NextRequest) {
  try {
    // Fetch the conversation SID
    const conversations =
      await twilioClient.conversations.v1.conversations.list();
    const conversationSid = conversations[0].sid;

    await twilioClient.conversations.v1
      .conversations(conversationSid)
      .participants.create({ identity: "testPineapple" });

    return NextResponse.json({ message: "Success!" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
