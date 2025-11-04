import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./modules/auth/routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js"; 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
  origin: "http://localhost:3000", 
}));
app.use(morgan("dev")); 


app.use("/api/v1/auth", authRoutes);




app.use(errorHandler);

export default app;
