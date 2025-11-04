import { User } from "../models/user.model.js";
import { comparePassword } from "../../../utils/bcrypt.js";
import { signAccessToken, signRefreshToken } from "../../../utils/jwt.js";


export const loginUserService = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const accessToken = signAccessToken({ id: user._id, role: user.role });
  const refreshToken = signRefreshToken({ id: user._id, role: user.role });

  const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return { userResponse, accessToken, refreshToken };
};
