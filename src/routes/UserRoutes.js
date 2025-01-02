// src/routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser, getAllUsers, } from '../controllers/userController.js';
import validationHandler from '../middlewares/validationHandler.js';
import { registerUserSchema, loginUserSchema, } from '../validations/userValidation.js';

const router = express.Router();

// Register a new user
router.post('/', validationHandler(registerUserSchema), registerUser);

// Login a user
router.post('/login', validationHandler(loginUserSchema), loginUser);

// Get all users
router.get('/', getAllUsers);

export default router;
