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
// ANSI escape codes for colors
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";
export function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log("on-message-added endpoint hit!");
            const formData = yield request.formData();
            // Process only if it does not come from the Twilio Number + or Web App
            if (!formData.has("ClientIdentity") &&
                formData.get("Author") !== "+18333224149") {
                console.log(YELLOW + "Message:" + RESET, formData.get("Body")); //   console.log(formData);
            }
            return NextResponse.json({ message: "Success!" }, { status: 200 });
        }
        catch (error) {
            console.error("Error:", error);
            return NextResponse.json({ error: "Error" }, { status: 500 });
        }
    });
}
