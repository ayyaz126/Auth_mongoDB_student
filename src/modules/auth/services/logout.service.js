import { User } from "../models/user.model.js";

export const logoutService = async (refreshToken) => {

  if (!refreshToken) {    
    return;
  }

  try {
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  } catch (err) {
  
  }
};
