import mongoose, { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{10}$/,
  },
});

export default mongoose.models.User || model<IUser>("User", UserSchema);
