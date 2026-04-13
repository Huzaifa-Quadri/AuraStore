/**
 * Async handler to wrap route controllers and pass errors to the global error handler
 * @param {Function} requestHandler
 * @returns {Function}
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
