import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

export const generateToken = (res, userId, email) => {
  const token = jwt.sign({ userId, email }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE || "5d",
  });
  return setTokenInCookies(res, token);
};

export const generateRefreshToken = (res, userId) => {
  const token = jwt.sign({ userId }, config.JWT_REFRESH_SECRET, {
    expiresIn: config.JWT_EXPIRE || "7d",
  });
  return setTokenInCookies(res, token);
};

const setTokenInCookies = (res, token) => {
  //set token in cookies
  res.cookie("token", token, {
    httpOnly: true,
    // secure: true,// only in production
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};
