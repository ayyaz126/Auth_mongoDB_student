import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/env.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access token missing" });
    }

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decoded; // attach decoded user info
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
