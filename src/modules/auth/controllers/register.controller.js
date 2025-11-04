import { registerSchema } from "../dto/auth.zod.js";
import { registerUserService } from "../services/register.service.js";
import { asyncHandler } from "../../../middleware/asyncHandler.js";

export const registerController = asyncHandler(async (req, res) => {
  
  const validatedData = registerSchema.parse(req.body);


  const user = await registerUserService(validatedData);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});
