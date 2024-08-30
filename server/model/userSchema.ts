import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  terms: boolean;
  createdAt: Date;
}

const spmSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name is required"],
    match: [/^[A-Za-z]{2,} [A-Za-z]{2,}$/, "Please enter your full name."],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address",
    ],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  terms: {
    type: Boolean,
    required: [true, "You must agree to the terms and conditions"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SPM = model<IUser>("User", spmSchema);

export default SPM;
