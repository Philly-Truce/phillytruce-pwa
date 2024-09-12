import mongoose, { Schema, model, Document } from "mongoose";

interface ISession extends Document {
  sessionToken: string;
  userId: string;
  expires: Date;
}

const SessionSchema: Schema = new Schema({
  sessionToken: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

export const Session =
  mongoose.models.Session || model<ISession>("Session", SessionSchema);

enum ReportStage {
  data_gathering = "data_gathering",
  unclaimed = "unclaimed",
  claimed = "claimed",
  archived = "archived",
}

enum ReportOrigin {
  user_created = "user_created",
  witness_text = "witness_text",
}

interface IReport extends Document {
  incident_report_number: number;
  report_origin: ReportOrigin;
  report_initiated_at: Date;
  report_stage: ReportStage;
  incident_type: string[];
  description: string;
  location: string;
  report_last_updated_at: Date;
  ppd_notified: boolean;
  creator_user_id?: string;
  witness_id?: string;
  session_id?: string;
  chat_service_id?: string;
  last_message_at?: Date;
  unclaimed_at?: Date;
  claimed_at?: Date;
  messages?: any;
  archived_at?: Date;
}

const ReportSchema: Schema = new Schema({
  incident_report_number: {
    type: Number,
    unique: true,
    required: true,
  },
  report_origin: {
    type: String,
    enum: Object.values(ReportOrigin),
    required: true,
  },
  report_initiated_at: {
    type: Date,
    required: true,
  },
  report_stage: {
    type: String,
    enum: Object.values(ReportStage),
    required: true,
  },
  incident_type: [String],
  description: String,
  location: String,
  report_last_updated_at: Date,
  ppd_notified: Boolean,
  creator_user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  witness_id: {
    type: Schema.Types.ObjectId,
    ref: "Witness",
  },
  session_id: String,
  chat_service_id: String,
  last_message_at: Date,
  unclaimed_at: Date,
  claimed_at: Date,
  messages: Schema.Types.Mixed,
  archived_at: Date,
});

export const Report =
  mongoose.models.Report || model<IReport>("Report", ReportSchema);
