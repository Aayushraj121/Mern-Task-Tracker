import mongoose from "mongoose";
import { logger } from "./logger";

const MONGODB_URI = process.env["MONGODB_URI"];

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is required but was not provided.");
}

let isConnected = false;

export async function connectToMongoDB(): Promise<void> {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI as string);
    isConnected = true;
    logger.info("Connected to MongoDB Atlas");
  } catch (err) {
    logger.error({ err }, "Failed to connect to MongoDB Atlas");
    throw err;
  }
}

export default mongoose;
