import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../db/mongoDB/user-schema";
import dbConnect from "../../../db/mongoDB/db-connect";
import { signIn } from "next-auth/react";

export default async function signUpHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, phoneNumber } = req.body;

  if (!name || (!email && !phoneNumber)) {
    return res.status(400).json({
      message:
        "We need your name. We also need either your email or your phone number, too.",
    });
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
      return res.status(400).json({
        message: "You might already have an account with us",
      });
    }

    const newUser = new User({
      name,
      ...(email && { email }),
      ...(phoneNumber && { phoneNumber }),
    });

    await newUser.save();

    const result = await signIn("credentials", {
      redirect: false,
      identifier: email || phoneNumber,
    });

    if (result?.error) {
      return res.status(401).json({ message: result.error });
    }

    return res.status(201).json({
      success: true,
      message:
        "Congratulations. You have successfully created your own account with us",
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Uh oh... something went wrong" });
  }
}
