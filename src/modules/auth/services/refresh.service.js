import { verifyRefreshToken, signAccessToken } from "../../../utils/jwt.js";
import { User } from "../models/user.model.js";

export const refreshTokenService = async (token) => {
  if (!token) throw new Error("No refresh token provided");

 
  let payload;
  
  try {
    payload = verifyRefreshToken(token); 
    
  } catch (err) {
    throw new Error("Invalid or expired refresh token");
  }

  const user = await User.findById(payload.id);
  if (!user) throw new Error("User not found");

  const newAccessToken = signAccessToken({ id: user._id, role: user.role, email: user.email });
  return newAccessToken;
};
