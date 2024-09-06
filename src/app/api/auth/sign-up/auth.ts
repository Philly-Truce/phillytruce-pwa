import jwt from "jsonwebtoken";
import { User } from "../../../../models/user";

interface SignUpData {
  name: string;
  email: string;
  phoneNumber: string;
  terms: boolean;
}

export async function signUp(
  data: SignUpData
): Promise<{ success: boolean; message: string; token?: string }> {
  const { name, email, phoneNumber, terms } = data;

  try {
    const existingUser = await User.findOne({ email });
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

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return { success: true, message: "Thank you for signing", token };
  } catch (error) {
    console.error("Error in signUp:", error);
    return { success: false, message: "An error occurred during sign up" };
  }
}

export async function verifyToken(
  token: string
): Promise<{ valid: boolean; userId?: string }> {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    return { valid: true, userId: decoded.userId };
  } catch (error) {
    return { valid: false };
  }
}

export async function login(
  email: string
): Promise<{ success: boolean; message: string; token?: string }> {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        success: false,
        message: "We are sorry. We do not know who you are.",
      };
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "2w" }
    );

    return { success: true, message: "Login successful", token };
  } catch (error) {
    console.error("Error in login:", error);
    return { success: false, message: "An error occurred during login" };
  }
}
