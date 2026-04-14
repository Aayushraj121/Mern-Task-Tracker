import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  userId: string;
  createdAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true },
    userId: { type: String, required: true, index: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Task = mongoose.model<ITask>("Task", taskSchema);
