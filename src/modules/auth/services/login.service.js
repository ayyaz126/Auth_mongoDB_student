import { User } from "../models/user.model.js";
import { comparePassword } from "../../../utils/bcrypt.js";
import { signAccessToken, signRefreshToken } from "../../../utils/jwt.js";


export const loginUserService = async (data) => {
  const { email, password } = data;

  // Step 1: Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Step 2: Compare password
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Step 3: Generate tokens
  const accessToken = signAccessToken({ id: user._id, role: user.role });
  const refreshToken = signRefreshToken({ id: user._id, role: user.role });

  // Step 4: Prepare user data (hide password)
  const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return { userResponse, accessToken, refreshToken };
};
