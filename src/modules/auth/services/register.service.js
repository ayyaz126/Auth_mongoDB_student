import { User } from "../models/user.model.js";
import { hashPassword } from "../../../utils/bcrypt.js";


export const registerUserService = async (userData) => {
  try {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    //  Hash the password
    const hashedPassword = await hashPassword(password);

    // 3️⃣ Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //  Prepare response (remove password)
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
