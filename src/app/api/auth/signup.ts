import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../db/mongoDB/user-schema";

export default async function signUpHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, phoneNumber } = req.body;

  if (!name || !email || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "User with this email or phone number already exists",
        });
    }

    const newUser = new User({
      name,
      email,
      phoneNumber,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
