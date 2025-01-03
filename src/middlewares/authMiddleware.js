import jwt from 'jsonwebtoken';
import STATUS_CODES from '../config/statusCodes.js';
import config from '../config/config.js';
import logger from '../config/logger.js';
import sendResponse from '../middlewares/responseHandler.js';

/**
 * Middleware to verify JWT tokens.
 * Extracts token from the Authorization header ("Bearer <token>")
 * and validates it. If valid, attaches the user info to the request object.
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    // Respond with error message if token is missing
    logger.warn('Token missing from request.');
    return sendResponse(res, {
      success: false,
      message: 'Authorization token missing.',
      statusCode: STATUS_CODES.UNAUTHORIZED
    });
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      // Respond with error message if token is invalid
      logger.error(`Invalid token: ${err.message}`);
      return sendResponse(res, {
        success: false,
        message: 'Invalid authorization token.',
        statusCode: STATUS_CODES.UNAUTHORIZED
      });
    }

    logger.info(`User authenticated successfully: ${user.email}`);

    req.user = user; // Attach user info to the request object
    next();
  });
};

export const authenticateAdmin = (req, res, next) => {
  authenticateToken(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      logger.warn(`Unauthorized access attempt from email: ${req.user?.email}}`);

      return sendResponse(res, {
        success: false,
        message: 'Admin privileges required',
        statusCode: STATUS_CODES.FORBIDDEN
      });
    }
  });
};