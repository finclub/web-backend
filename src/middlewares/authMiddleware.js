import jwt from 'jsonwebtoken';
import STATUS_CODES from '../config/statusCodes.js';
import sendResponse from '../utils/responseHandler.js';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return sendResponse(res, {
      success: false,
      message: 'Authorization token missing.',
      statusCode: STATUS_CODES.UNAUTHORIZED
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return sendResponse(res, {
      success: false,
      message: 'Invalid token.',
      statusCode: STATUS_CODES.UNAUTHORIZED
    });
  }
};
