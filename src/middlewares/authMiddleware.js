import jwt from 'jsonwebtoken';
import STATUS_CODES from '../config/statusCodes.js';
import sendResponse from '../utils/responseHandler.js';
import config from '../config/config.js';
import logger from '../config/logger.js';

// export const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     return sendResponse(res, {
//       success: false,
//       message: 'Authorization token missing.',
//       statusCode: STATUS_CODES.UNAUTHORIZED
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return sendResponse(res, {
//       success: false,
//       message: 'Invalid token.',
//       statusCode: STATUS_CODES.UNAUTHORIZED
//     });
//   }
// };

/**
 * Middleware to verify JWT tokens.
 * Extracts token from the Authorization header ("Bearer <token>")
 * and validates it. If valid, attaches the user info to the request object.
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    logger.warn('Token missing in request from IP:', req.ip); // Log with IP address
    return res.status(401).json({ message: 'Token missing' });
  }

  logger.info(`Token received from IP: ${req.ip}`);

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      logger.error(`Invalid token received from IP: ${req.ip} - Error: ${err.message}`); // Log invalid token error
      return res.status(403).json({ message: 'Invalid token' });
    }

    logger.info(`User authenticated successfully: ${user.email} from IP: ${req.ip}`);

    req.user = user; // Attach user info to the request object
    next();
  });
};
export const authenticateAdmin = (req, res, next) => {
  authenticateToken(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next(); // Allow access to the next middleware (i.e., the route handler)
    } else {
      logger.warn(`Unauthorized access attempt from IP: ${req.ip}. User {role: ${req.user?.role}, email: ${req.user?.email}}`);
      return res.status(403).json({ message: 'Admin privileges required' }); // Reject if user is not admin
    }
  });
};