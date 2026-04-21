import { Router } from "express";
import {
  loginValidator,
  registerValidator,
} from "../validator/auth.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  googleCallback,
  loginUser,
  registerUser,
} from "../controller/auth.controller.js";
import passport from "passport";
import { config } from "../config/config.js";

const authRouter = Router();

/**
 * @route - /api/auth/register
 * @description - Register a new user
 * @access - public
 */
authRouter.post("/register", registerValidator, validate, registerUser);

/**
 * @route - /api/auth/login
 * @description - Login a user
 * @access - public
 */
authRouter.post("/login", loginValidator, validate, loginUser);

/**
 * @route   GET /api/auth/google
 * @desc    Initiate Google OAuth login
 * @access  Public
 */
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

/**
 * @route   GET /api/auth/google/callback
 * @desc    Google OAuth callback
 * @access  Public
 */
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect:
      config.NODE_ENV === "development"
        ? "http://localhost:5173/login"
        : "/login",
  }),
  googleCallback,
);

export default authRouter;
