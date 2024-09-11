import mongoose, { Schema, model, Document } from "mongoose";

interface IWitness extends Document {
  phone_number: string;
  initial_contact_date: Date;
  last_contact_date: Date;
}

const WitnessSchema: Schema = new Schema({
  phone_number: {
    type: String,
    required: true,
  },
  initial_contact_date: {
    type: Date,
    required: true,
  },
  last_contact_date: {
    type: Date,
    required: true,
  },
});

export const Witness =
  mongoose.models.Witness || model<IWitness>("Witness", WitnessSchema);
