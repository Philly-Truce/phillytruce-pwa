import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { phoneNumber, email } = req.body;
      if (phoneNumber === "1234567890" && email === "user@example.com") {
        res.status(200).json({ message: "We found you!" });
      } else {
        res
          .status(401)
          .json({ message: "Phone number or email does not match" });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
