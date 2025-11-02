import { loginSchema } from "../dto/auth.zod.js";
import { loginUserService } from "../services/login.service.js";

export const loginController = async (req, res) => {
  try {
    // Step 1: Validate request body using Zod
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
    // Step 2: Call login service
    const { userResponse, accessToken, refreshToken } = await loginUserService({
      email,
      password,
    });

//     loginUserService kya karta hai?

// Ye function user ko login karne ka business logic handle karta hai:

// Database me email check karta hai.

// Password compare karta hai (bcrypt se).

// Agar sab sahi ho → access token aur refresh token generate karta hai.

// User ka sensitive data hide karke user info return karta hai.

    // Step 3: Set refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Step 4: Send response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: userResponse,
        accessToken,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(401).json({
      success: false,
      message: error.message || "Invalid credentials",
    });
  }
};
