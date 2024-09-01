import express, { Request, Response } from "express";
import SPM from "./model/userSchema";
const router = express.Router();

interface SignUpRequestBody {
  name: string;
  email: string;
  phoneNumber: string;
  terms: boolean;
}

router.post(
  "/signup",
  async (req: Request<{}, {}, SignUpRequestBody>, res: Response) => {
    try {
      const { name, email, phoneNumber, terms } = req.body;

      const newUser = new SPM({
        name,
        email,
        phoneNumber,
        terms,
      });

      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);

export default router;
