import { asyncHandler } from "../utils/asyncHandler.js";
import UserModel from "../model/user.model.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../config/constants.js";
import { generateToken } from "../utils/tokens.js";
import { ApiError } from "../utils/ApiError.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { email, contact, password, fullname, role } = req.body;

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
    role,
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

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_MESSAGES.INVALID_CREDENTIALS,
    );
  }

  generateToken(res, user._id, user.email);

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: {
      user,
    },
  });
});
