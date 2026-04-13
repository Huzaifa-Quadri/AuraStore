import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

/**
 * Global Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = err;

  // If the error is not an instance of ApiError, convert it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error instanceof mongoose?.Error ? 400 : 500;
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
