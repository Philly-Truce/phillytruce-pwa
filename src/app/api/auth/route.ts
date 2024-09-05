import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/mongoDB/db-connect";
import { signUp } from "../auth/sign-up/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();

  const { name, email, phoneNumber, terms } = req.body;

  try {
    const result = await signUp({ name, email, phoneNumber, terms });
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error("Error in sign-up API route:", error);
    res
      .status(500)
      .json({ success: false, message: "An error occurred during sign up" });
  }
}
