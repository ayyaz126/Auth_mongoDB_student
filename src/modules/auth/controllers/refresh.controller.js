import { refreshTokenService } from "../services/refresh.service.js";
import { asyncHandler } from "../../../middleware/asyncHandler.js";

export const refreshController = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  const newAccess = await refreshTokenService(token);

  return res.status(200).json({
    success: true,
    accessToken: newAccess,
  });
});
