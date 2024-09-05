import jwt from "jsonwebtoken";

export interface SignUpData {
  name: string;
  email: string;
  phoneNumber: string;
  terms: boolean;
}

export interface SignUpResult {
  success: boolean;
  message: string;
  token?: string;
}

export async function signUp(data: SignUpData): Promise<SignUpResult> {
  const { name, email, phoneNumber, terms } = data;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        success: false,
        message: "It seems like you already have an account with us.",
      };
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      phoneNumber,
      terms,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return { success: true, message: "Thank you for signing up", token };
  } catch (error) {
    console.error("Error in signUp:", error);
    return { success: false, message: "An error occurred during sign up" };
  }
}
