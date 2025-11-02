import { registerSchema } from "../dto/auth.zod.js";
import { registerUserService } from "../services/register.service.js";


export const registerController = async (req, res) => {
  try {
    // Validate user input with Zod
    const validatedData = registerSchema.parse(req.body);

    // Call service
    const user = await registerUserService(validatedData);

    // Send success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.error("Register Controller Error:", error.message);

    if (error.errors) {
      // Zod validation error
      return res.status(400).json({
        success: false,
        message: error.errors[0].message,
      });
    }

    // Other runtime errors
    return res.status(400).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};
