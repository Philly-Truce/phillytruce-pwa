import { NextRequest, NextResponse } from "next/server";
import twilioClient from "@/lib/twilio-client";

// ANSI escape codes for colors
const PURPLE = "\x1b[35m";
const RESET = "\x1b[0m";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const formData = await request.json();
    const messageSid = formData[0].data.messageSid;

    // Fetch the message details using the Twilio client
    const message = await twilioClient.messages(messageSid).fetch();

    // The message content is available in the 'body' property
    const messageContent = message.body;
    console.log(PURPLE + "Message:" + RESET, messageContent);

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
