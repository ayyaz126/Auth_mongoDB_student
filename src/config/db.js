import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(" MongoDB connected successfully");

    mongoose.connection.on("disconnected", () => {
      console.warn(" MongoDB disconnected! Retrying in 5 seconds");
      setTimeout(connectDB, 5000);
    });

    mongoose.connection.on("error", (err) => {
      console.error(" MongoDB error:", err.message);
    });
  } catch (error) {
    console.error(" Mongo connection failed:", error.message);
    setTimeout(connectDB, 5000);
  }
};
