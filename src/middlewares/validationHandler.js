import STATUS_CODES from '../config/statusCodes.js';

/**
 * Middleware to validate request data using Joi schema
 * @param {Object} schema - Joi validation schema
 * @param {String} property - The property of req to validate (e.g., 'body', 'query', 'params')
 */
const validationHandler = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      const errors = error.details.reduce((acc, detail) => {
        acc[detail.path.join('.')] = detail.message;
        return acc;
      }, {});

      // Pass validation error to the centralized error handler
      const validationError = new Error('Validation error');
      validationError.statusCode = STATUS_CODES.BAD_REQUEST;
      validationError.errors = errors;
      return next(validationError);
    }

    next();
  };
};

export default validationHandler;
