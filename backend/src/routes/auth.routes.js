import { Router } from "express";
import { registerValidator } from "../validator/auth.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import { registerUser } from "../controller/auth.controller.js";

const authRouter = Router();

/**
 * @route - /api/v1/auth/register
 * @description - Register a new user
 * @access - public
 */
authRouter.post("/register", registerValidator, validate, registerUser);

export default authRouter;
