import { asyncHandler } from "../utils/asyncHandler.js";
import UserModel from "../model/user.model.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../config/constants.js";
import { generateToken } from "../utils/tokens.js";
import { ApiError } from "../utils/ApiError.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { email, contact, password, fullname } = req.body;

  const existingUser = await UserModel.findOne({
    $or: [{ email }, { contact }],
  });

  if (existingUser) {
    throw new ApiError(HTTP_STATUS.CONFLICT, ERROR_MESSAGES.USER_EXISTS);
  }

  const user = await UserModel.create({
    email,
    contact,
    password,
    fullname,
  });

  generateToken(res, user._id, user.email);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user,
    },
  });
});
