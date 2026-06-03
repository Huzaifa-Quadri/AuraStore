import mongoose from "mongoose";
import multer from "multer";
import { ApiError } from "../utils/ApiError.js";

/**
 * Global Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = err;

  //? Translate multer upload errors into a clean 400 instead of a 500.
  if (error instanceof multer.MulterError) {
    const message =
      error.code === "LIMIT_FILE_SIZE"
        ? "File too large. Max size is 5MB."
        : error.code === "LIMIT_UNEXPECTED_FILE"
        ? "Too many files or wrong field name. Use the 'images' field."
        : error.message;
    error = new ApiError(400, message);
  }

  // If the error is not an instance of ApiError, convert it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || (error instanceof mongoose.Error ? 400 : 500);
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  // Define the response payload
  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}), // include stack trace in dev mode
  };

  return res.status(error.statusCode).json(response);
};

export { errorHandler };
