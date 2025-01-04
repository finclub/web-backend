// src/controllers/userController.js
import bcrypt from 'bcryptjs'; // to hash passwords
import jwt from 'jsonwebtoken'; // to generate JWT tokens
import User from '../models/User.js'; // to interact with the User model to perform CRUD operations
import logger from '../config/logger.js'; // to log errors
import config from '../config/config.js';
import sendResponse from '../middlewares/responseHandler.js';
import STATUS_CODES from '../config/statusCodes.js';

/**
 * Register a new user
 * @param {object} req - The request object containing user input data.
 * @param {object} res - The response object used to send responses back to the client.
 */
export const registerUser = async (req, res) => {
  // Destructure necessary fields from the request body
  const { name, phone_number, email, password, role = 'admin' } = req.body; // default role is 'admin'

  try {
    // Hash the user's password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record in the database
    const newUser = await User.create({
      name,
      phone_number,
      email,
      password: hashedPassword,
      role
    });

    // Exclude password from the response
    const { password: _, ...userWithoutPassword } = newUser.toJSON();

    return sendResponse(res, {
      success: true,
      statusCode: STATUS_CODES.CREATED,
      message: 'User registered successfully!',
      data: {
        'user': userWithoutPassword
      }
    });
  } catch (error) {
    return sendResponse(res, {
      success: false,
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Failed to register user',
      errors: error.message
    });
  }
};

/**
 * User login route.
 * Validates email and password. If successful, generates a JWT token.
 */
export const loginUser = async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    // If user not found, return error
    if (!user) {
      // Log error message
      logger.error('User not found');

      return sendResponse(res, {
        success: false,
        statusCode: STATUS_CODES.NOT_FOUND,
        message: 'User not found'
      });
    }

    // Compare submitted password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is invalid, return error
    if (!isPasswordValid) {
      // Log error message
      logger.error('Invalid password');

      return sendResponse(res, {
        success: false,
        statusCode: STATUS_CODES.NOT_FOUND,
        message: 'User not found'
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role }, // payload
      config.jwtSecret, // secret key
      { expiresIn: '1d' } // expiry time
    );

    // Respond with success message and the token
    return sendResponse(res, {
      success: true,
      statusCode: STATUS_CODES.OK,
      message: 'Login successful',
      data: {
        'token': token
      }
    });

  } catch (error) {
    // Respond with error message if login fails

    // Log error message
    logger.error(`Failed to login: ${error.message}`);

    return sendResponse(res, {
      success: false,
      statusCode: STATUS_CODES.UNAUTHORIZED,
      message: 'Failed to login',
      errors: error.message
    });
  }
};

/**
 * Get all users
 * @param {object} req - The request object.
 * @param {object} res - The response object used to send a list of all users.
 */
export const getAllUsers = async (req, res) => {
  try {
    // Retrieve all users without the password field
    const users = await User.findAll({
      attributes: { exclude: ['password', 'created_at'] }
    });

    // Log success message
    logger.info('Users fetched successfully');

    // Respond with list of users
    return sendResponse(res, {
      success: true,
      statusCode: STATUS_CODES.OK,
      message: 'Users fetched successfully',
      data: {
        'users': users
      }
    });
  } catch (error) {
    // Respond with error message if fetch fails

    // Log error message
    logger.error(`Failed to fetch users: ${error.message}`);

    return sendResponse(res, {
      success: false,
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Failed to fetch users',
      errors: error.message
    });
  }
};
