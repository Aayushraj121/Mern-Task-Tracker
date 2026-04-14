import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  createdAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const Task = mongoose.model<ITask>("Task", taskSchema);
