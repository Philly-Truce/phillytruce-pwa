import express, { Request, Response } from "express";
import cors from "cors";
import { signUp } from "../auth/sign-up/auth";
import dbConnect from "../db/mongoDB/db-connect";

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
dbConnect();

interface SignUpBody {
  name: string;
  email: string;
  phoneNumber: string;
  terms: boolean;
}

// Sign-up route
app.post(
  "/api/auth/sign-up",
  async (req: Request<{}, {}, SignUpBody>, res: Response) => {
    const { name, email, phoneNumber, terms } = req.body;

    try {
      const result: SignUpResult = await signUp({
        name,
        email,
        phoneNumber,
        terms,
      });
      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error("Error in sign-up route:", error);
      res
        .status(500)
        .json({ success: false, message: "An error occurred during sign up" });
    }
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
