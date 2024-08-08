import { NextRequest, NextResponse } from "next/server";
import { jwt } from "twilio";

const { AccessToken } = jwt;
const { ChatGrant } = AccessToken;

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;
const serviceSid = process.env.TWILIO_SERVICE_SID;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (!twilioAccountSid || !twilioApiKey || !twilioApiSecret || !serviceSid) {
    return NextResponse.json(
      { error: "Missing Twilio credentials" },
      { status: 500 }
    );
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
