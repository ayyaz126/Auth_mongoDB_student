import { User } from "../models/user.model.js";
import { hashPassword } from "../../../utils/bcrypt.js";

export const registerUserService = async (userData) => {
  try {
    const { name, email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  } catch (error) {
    console.error("Register Service Error:", error.message);
    throw new Error(error.message || "Failed to register user");
  }
};
