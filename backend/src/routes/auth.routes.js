import { Router } from "express";
import {
  loginValidator,
  registerValidator,
} from "../validator/auth.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import { loginUser, registerUser } from "../controller/auth.controller.js";

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

export default authRouter;
