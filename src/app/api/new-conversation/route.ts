import { NextRequest, NextResponse } from "next/server";
import twilioClient from "@/lib/twilio-client";
import prisma from "@/db/prisma";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    console.log(formData);
    const conversationSid = formData.get("ConversationSid") as string;

    await twilioClient.conversations.v1
      .conversations(conversationSid)
      .webhooks.create({
        target: "studio",
        "configuration.flowSid": "FWdf1cea94253cc73100c3cff556397d7a",
        "configuration.replayAfter": 0,
      });

    await twilioClient.conversations.v1
      .conversations(conversationSid)
      .webhooks.create({
        "configuration.filters": ["onMessageAdded"],
        "configuration.method": "POST",
        "configuration.url":
          "https://customers-wt-serum-northeast.trycloudflare.com/api/inbound-messages",
        "configuration.replayAfter": 0,
        target: "webhook",
      });

    await prisma.report.create({
      data: {
        incident_report_number: parseInt(conversationSid.slice(-4), 10),
        report_origin: "witness_text",
        report_initiated_at: new Date(),
        report_stage: "data_gathering",
        incident_type: ["fist", "gun", "knifing"],
        description: "This is a test report.",
        location: "Test location",
        report_last_updated_at: new Date(),
        ppd_notified: false,

        messages: {
          message_id: formData.get("MessagingServiceSid"),
          from: formData.get("MessagingBinding.Address"),
          to: formData.get("MessagingBinding.ProxyAddress"),
          message_content: "Example message.",
          created_at: new Date(),
        },
      },
    });

    return NextResponse.json(
      { message: "Webhooks added to the conversation successfully" },
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
