var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dbConnect from "../../../db/mongoDB/db-connect";
import { signUp } from "../auth/sign-up/auth";
export default function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method !== "POST") {
            return res.status(405).json({ message: "Method not allowed" });
        }
        yield dbConnect();
        const { name, email, phoneNumber, terms } = req.body;
        try {
            const result = yield signUp({ name, email, phoneNumber, terms });
            res.status(result.success ? 200 : 400).json(result);
        }
        catch (error) {
            console.error("Error in sign-up API route:", error);
            res
                .status(500)
                .json({ success: false, message: "An error occurred during sign up" });
        }
    });
}
