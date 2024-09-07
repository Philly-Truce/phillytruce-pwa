import mongoose, { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  verified: boolean;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  phoneNumber: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
    match: /^\d{10}$/,
  },
  password: {
    type: String,
    required: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", function (next) {
  if (!this.email && !this.phoneNumber) {
    next(new Error("Either email or phone number must be provided"));
  } else {
    next();
  }
});

export default mongoose.models.User || model<IUser>("User", UserSchema);
