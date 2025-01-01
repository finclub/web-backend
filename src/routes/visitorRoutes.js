import express from 'express';
import { checkVisitor } from '../controllers/visitorController.js';
import validationHandler from '../middlewares/validationHandler.js';
import { checkVisitorSchema } from '../validations/visitorValidation.js';

const router = express.Router();

// Check if visitor exists with Joi validation
router.post('/check', validationHandler(checkVisitorSchema), checkVisitor);

export default router;
