import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./modules/auth/routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
  origin: "http://localhost:3000", 
}));
app.use(morgan("dev")); 


app.use("/api/v1/auth", authRoutes);





export default app;
