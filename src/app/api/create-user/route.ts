import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      phone_number,
      first_name,
      last_name,
      last_logged_in_at,
      created_at,
      is_messaging_onboarding_complete,
    } = body;

    const newUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        phone_number: parseInt(phone_number),
        last_logged_in_at: last_logged_in_at
          ? new Date(last_logged_in_at)
          : new Date(),
        created_at: created_at ? new Date(created_at) : new Date(),
        is_messaging_onboarding_complete:
          is_messaging_onboarding_complete || false,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
