import { asyncHandler } from "../utils/asyncHandler.js";
import UserModel from "../model/user.model.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../config/constants.js";
import { generateToken } from "../utils/tokens.js";
import { ApiError } from "../utils/ApiError.js";
import { config } from "../config/config.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { email, contact, password, fullname, role } = req.body;

  const query = { $or: [{ email }] };
  if (contact) query.$or.push({ contact });

  const existingUser = await UserModel.findOne(query);

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

export const googleCallback = asyncHandler(async (req, res) => {
  const { id, displayName, emails } = req.user;

  let user = await UserModel.findOne({ email: emails[0].value });
  let isNewUser = false;

  if (!user) {
    user = await UserModel.create({
      fullname: displayName,
      email: emails[0].value,
      googleId: id,
      isVerified: true,
    });
    isNewUser = true;
  }

  generateToken(res, user._id, user.email);

  const baseUrl =
    config.NODE_ENV === "development"
      ? `http://localhost:${config.Frontend_PORT}`
      : config.CLIENT_URL || "/";

  res.redirect(isNewUser ? `${baseUrl}/select-role` : baseUrl);
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: { user: req.user },
  });
});

export const selectRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  if (!["buyer", "seller"].includes(role)) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid role. Must be buyer or seller.");
  }

  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    { role },
    { new: true },
  );

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Role updated successfully",
    data: { user },
  });
});
