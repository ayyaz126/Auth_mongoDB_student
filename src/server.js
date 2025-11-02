import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { PORT } from "./config/env.js";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
