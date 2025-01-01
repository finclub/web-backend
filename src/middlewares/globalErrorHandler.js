import config from '../config/config.js';
import STATUS_CODES from '../config/statusCodes.js';

/**
 * Global error handler middleware
 * @param {Object} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const globalErrorHandler = (err, req, res, next) => {
  // Log the error for debugging
  // console.error(
  //   `[${new Date().toISOString()}] [${req.method}] ${req.originalUrl}`
  // );
  // console.error(err.stack);

  // Sanitize error message for production
  const errorMessage =
    config.env === 'production' ? 'An unexpected error occurred.' : err.message;

  res.status(err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: errorMessage,
    errors: err.errors || null
  });
};

export default globalErrorHandler;
