import { NextRequest, NextResponse } from "next/server";
import MessagingResponse from "twilio/lib/twiml/MessagingResponse";
import twilioClient from "@/lib/twilio-client";
import { exec } from "child_process";
import { ExecutionListInstance } from "twilio/lib/rest/studio/v2/flow/execution";

// SID for Test (Barista) Flow
const testFlow = "FWb392c551e4ebd61aa756db70c7a20378";

// SID for Simple Message Flow
const simpleFlow = "FWdf1cea94253cc73100c3cff556397d7a";

// Respond to incoming POST request from Twilio server
export async function POST(request: NextRequest) {
  try {
    console.log("Server hit");

    // Parse the request body
    const formData = await request.formData();
    const inboundNumber = formData.get("From") as string;
    const twilioNumber = formData.get("To") as string;
    const body = formData.get("Body") as string;

    console.log("From:", inboundNumber);
    console.log("To:", twilioNumber);
    console.log("Message Body:", body);

    // Get the execution list instance
    const executionList: ExecutionListInstance =
      twilioClient.studio.v2.flows(simpleFlow).executions;

    // Fetch all executions (this will get the most recent ones first)
    const executions = await executionList.list({ limit: 20 });

    // Filter executions manually for active ones with the specific 'to' number
    const activeExecutionsForNumber = executions.filter(
      (execution) =>
        execution.status === "active" &&
        execution.contactChannelAddress === inboundNumber
    );

    // if there is already an active execution going on skip creation of another one
    if (activeExecutionsForNumber.length > 0) {
      console.log("Active execution already exists for this number");
    } else {
      console.log("Initiating a new execution");
      // Start a new execution of the Studio Flow
      const execution = await executionList.create({
        to: inboundNumber,
        from: "MG7b3df69bd76882eb185e6a79f47b6539",
        parameters: {
          incomingMessage: body,
        },
      });
      console.log("New Execution SID:", execution.sid);
    }

    // Send a 200 OK response without any content
    return new NextResponse(null, {
      status: 204,
    });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Twilio server will not send GET requests
export async function GET(request: NextRequest) {
  return new NextResponse("Method Not Allowed", {
    status: 405,
    headers: {
      Allow: "POST",
    },
  });
}
