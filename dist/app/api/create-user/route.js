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
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = yield request.json();
            const { phone_number, first_name, last_name, last_logged_in_at, created_at, is_messaging_onboarding_complete, } = body;
            const newUser = yield prisma.user.create({
                data: {
                    first_name,
                    last_name,
                    phone_number: parseInt(phone_number),
                    last_logged_in_at: last_logged_in_at
                        ? new Date(last_logged_in_at)
                        : new Date(),
                    created_at: created_at ? new Date(created_at) : new Date(),
                    is_messaging_onboarding_complete: is_messaging_onboarding_complete || false,
                },
            });
            return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
        }
        catch (error) {
            console.error("Error:", error);
            return NextResponse.json({ error: "Error" }, { status: 500 });
        }
    });
}
