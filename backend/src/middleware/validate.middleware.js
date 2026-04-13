import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

/**
 * Middleware to check for validation errors from express-validator
 * If errors are found, formats them into standard ApiError and passes to next()
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
  return next(new ApiError(422, "Received data is invalid", extractedErrors));
};
