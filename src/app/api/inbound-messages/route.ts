import { NextRequest, NextResponse } from "next/server";
import twilioClient from "@/lib/twilio-client";

// ANSI escape codes for colors
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

export async function POST(request: NextRequest) {
  try {
    // console.log("on-message-added endpoint hit!");

    const formData = await request.formData();

    // Process only if it does not come from the Twilio Number + or Web App
    if (
      !formData.has("ClientIdentity") &&
      formData.get("Author") !== "+18333224149"
    ) {
      console.log(YELLOW + "Message:" + RESET, formData.get("Body")); //   console.log(formData);
    }

    return NextResponse.json({ message: "Success!" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
