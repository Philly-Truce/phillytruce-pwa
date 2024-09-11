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
export const dynamic = "force-dynamic";
export function GET(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conversations = yield twilioClient.conversations.v1.conversations.list();
            // Fetch messages for each conversation
            const conversationsWithMessages = yield Promise.all(conversations.map((conv) => __awaiter(this, void 0, void 0, function* () {
                const messages = yield twilioClient.conversations.v1
                    .conversations(conv.sid)
                    .messages.list();
                return Object.assign(Object.assign({}, conv), { messages });
            })));
            // Check if the request accepts HTML
            const acceptHeader = request.headers.get("accept");
            if (acceptHeader && acceptHeader.includes("text/html")) {
                // Generate an HTML response
                const html = `
        <html>
          <head>
            <title>Twilio Conversations</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
              h1, h2 { color: #333; }
              ul { list-style-type: none; padding: 0; }
              li { background: #f4f4f4; margin-bottom: 20px; padding: 15px; border-radius: 5px; }
              .message { background: #e9e9e9; margin: 10px 0; padding: 10px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <h1>Twilio Conversations</h1>
            <ul>
              ${conversationsWithMessages
                    .map((conv) => `
                <li>
                  <h2>Conversation</h2>
                  <strong>SID:</strong> ${conv.sid}<br>
                  <strong>ChatServiceSID:</strong> ${conv.chatServiceSid}<br>
                  <strong>Friendly Name:</strong> ${conv.friendlyName || "N/A"}<br>
                  <strong>Date Created:</strong> ${new Date(conv.dateCreated).toLocaleString()}<br>
                  <h3>Messages:</h3>
                  ${conv.messages
                    .map((msg) => `
                    <div class="message">
                      <strong>From:</strong> ${msg.author}<br>
                      <strong>Date:</strong> ${new Date(msg.dateCreated).toLocaleString()}<br>
                      <strong>Body:</strong> ${msg.body}
                    </div>
                  `)
                    .join("")}
                </li>
              `)
                    .join("")}
            </ul>
          </body>
        </html>
      `;
                return new NextResponse(html, {
                    headers: { "Content-Type": "text/html" },
                });
            }
            else {
                // Return JSON if not requesting HTML
                return NextResponse.json(conversationsWithMessages);
            }
        }
        catch (error) {
            console.error("Error fetching conversations:", error);
            return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 });
        }
    });
}
