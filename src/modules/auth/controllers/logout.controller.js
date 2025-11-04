import { logoutService } from "../services/logout.service.js";
import { asyncHandler } from "../../../middleware/asyncHandler.js";

export const logoutController = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;

  await logoutService(token);
  
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({ success: true, message: "Logged out successfully" });
});
