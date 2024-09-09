import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;

if (!accountSid || !authToken || !verifySid) {
  throw new Error("Missing Twilio credentials");
}

const client = twilio(accountSid, authToken);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { phoneNumber, code } = req.body;
    try {
      if (!verifySid) {
        throw new Error("TWILIO_VERIFY_SID is not defined");
      }
      const verificationCheck = await client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: phoneNumber, code: code });
      res.status(200).json({ status: verificationCheck.status });
    } catch (error) {
      console.error("Verification check error:", error);
      res.status(500).json({ error: "Failed to check verification code" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
