var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NextResponse } from "next/server";
import twilioClient from "@/lib/twilio-client";
// ANSI escape codes for colors
const PURPLE = "\x1b[35m";
const RESET = "\x1b[0m";
export function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Parse request body
            const formData = yield request.json();
            const messageSid = formData[0].data.messageSid;
            // Fetch the message details using the Twilio client
            const message = yield twilioClient.messages(messageSid).fetch();
            // The message content is available in the 'body' property
            const messageContent = message.body;
            console.log(PURPLE + "Message:" + RESET, messageContent);
            // TODO: insert new message record into database
            // Return a success response
            return NextResponse.json({ message: "Flow removed from conversation successfully!" }, { status: 200 });
        }
        catch (error) {
            console.error("Error removing flow from conversation:", error);
            return NextResponse.json({ error: "Failed to remove flow from conversation" }, { status: 500 });
        }
    });
}
