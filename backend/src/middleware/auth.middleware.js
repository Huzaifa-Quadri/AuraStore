import { config } from "../config/config.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../config/constants.js";
import UserModel from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);
  const user = await UserModel.findById(decoded.userId);

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
  }

  req.user = user;
  next();
});

export const authenticateSeller = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);
  const user = await UserModel.findById(decoded.userId);

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
  }

  if (user.role !== "seller") {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);
  }

  req.seller = user;
  next();
});
