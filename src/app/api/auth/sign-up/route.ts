import { NextRequest, NextResponse } from "next/server";
import User from "@/db/mongoDB/user-schema";
import dbConnect from "@/db/mongoDB/db-connect";

export async function POST(request: NextRequest) {
  const { name, email, phoneNumber } = await request.json();

  if (!name || (!email && !phoneNumber)) {
    return NextResponse.json(
      {
        message:
          "We need your name. We also need either your email or your phone number, too.",
      },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const existingUser = await User.findOne({
      $or: [
        { email: email || null },
        { phoneNumber: phoneNumber || null },
      ].filter(
        (condition) =>
          condition.email !== null || condition.phoneNumber !== null
      ),
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "You might already have an account with us",
        },
        { status: 400 }
      );
    }

    const newUser = new User({
      name,
      ...(email && { email }),
      ...(phoneNumber && { phoneNumber }),
    });

    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message:
          "Congratulations. You have successfully created your own account with us",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Uh oh... something went wrong" },
      { status: 500 }
    );
  }
}
