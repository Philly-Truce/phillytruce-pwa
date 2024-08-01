import { NextRequest, NextResponse } from "next/server";
import { jwt } from "twilio";

const { AccessToken } = jwt;
const { ChatGrant } = AccessToken;
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID as string;
const twilioApiKey = process.env.TWILIO_API_KEY as string;
const twilioApiSecret = process.env.TWILIO_API_SECRET as string;
const serviceSid = process.env.TWILIO_SERVICE_SID as string;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const chatGrant = new ChatGrant({
    serviceSid: serviceSid,
  });

  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    {
      identity: name,
    }
  );

  token.addGrant(chatGrant);

  return NextResponse.json({ token: token.toJwt() });
}
