var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import { User } from "../../../../server/express";
export function signUp(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, phoneNumber, terms } = data;
        try {
            const existingUser = yield User.findOne({ email });
            if (existingUser) {
                return {
                    success: false,
                    message: "It seems like you already have an account with us.",
                };
            }
            const newUser = new User({
                name,
                email,
                phoneNumber,
                terms,
            });
            yield newUser.save();
            const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return { success: true, message: "Thank you for signing", token };
        }
        catch (error) {
            console.error("Error in signUp:", error);
            return { success: false, message: "An error occurred during sign up" };
        }
    });
}
export function verifyToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return { valid: true, userId: decoded.userId };
        }
        catch (error) {
            return { valid: false };
        }
    });
}
export function login(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User.findOne({ email });
            if (!user) {
                return {
                    success: false,
                    message: "We are sorry. We do not know who you are.",
                };
            }
            const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "2w" });
            return { success: true, message: "Login successful", token };
        }
        catch (error) {
            console.error("Error in login:", error);
            return { success: false, message: "An error occurred during login" };
        }
    });
}
