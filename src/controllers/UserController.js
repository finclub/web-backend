import User from '../models/User.js';
import STATUS_CODES from '../config/statusCodes.js';
import sendResponse from '../middlewares/responseHandler.js';

// Fetch all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    sendResponse(res, {
      success: true,
      message: 'Users fetched successfully.',
      data: users,
      statusCode: STATUS_CODES.OK
    });
  } catch (error) {
    sendResponse(res, {
      success: false,
      message: 'Failed to fetch users.',
      errors: { details: error.message },
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR
    });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const user = await User.create({ first_name, last_name, email, password });
    sendResponse(res, {
      success: true,
      message: 'User created successfully.',
      data: { user_id: user.user_id },
      statusCode: STATUS_CODES.CREATED
    });
  } catch (error) {
    sendResponse(res, {
      success: false,
      message: 'Failed to create user.',
      errors: { details: error.message },
      statusCode: STATUS_CODES.BAD_REQUEST
    });
  }
};
