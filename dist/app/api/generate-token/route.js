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
import { jwt } from "twilio";
const { AccessToken } = jwt;
const { ChatGrant } = AccessToken;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;
const serviceSid = process.env.TWILIO_SERVICE_SID;
export function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request.json();
        const { name } = body;
        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }
        if (!twilioAccountSid || !twilioApiKey || !twilioApiSecret || !serviceSid) {
            return NextResponse.json({ error: "Missing Twilio credentials" }, { status: 500 });
        }
        const chatGrant = new ChatGrant({
            serviceSid: serviceSid,
        });
        const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret, {
            identity: name,
        });
        token.addGrant(chatGrant);
        return NextResponse.json({ token: token.toJwt() });
    });
}
