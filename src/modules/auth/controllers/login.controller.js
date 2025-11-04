import { loginSchema } from "../dto/auth.zod.js";
import { loginUserService } from "../services/login.service.js";
import { asyncHandler } from "../../../middleware/asyncHandler.js";

export const loginController = asyncHandler(async (req, res) =>{

  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    const errors = validation.error.errors.map((err) => err.message);
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  const { email, password } = validation.data;
  
  const { userResponse, accessToken, refreshToken } = await loginUserService({
    email,
    password,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: userResponse,
      accessToken,
    },
  });
});
