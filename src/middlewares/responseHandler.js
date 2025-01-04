/**
 * Sends a standardized JSON response.
 *
 * @param {object} res - The Express response object.
 * @param {object} options - Response options object.
 * @param {boolean} options.success - Indicates the success status of the response.
 * @param {string} options.message - Descriptive message about the response.
 * @param {object|null} [options.data=null] - Data to include in the response, if any.
 * @param {object|null} [options.errors=null] - Error details to include in the response, if any.
 * @param {number} [options.statusCode=200] - HTTP status code to set for the response.
 */
const sendResponse = (res, { success, message, data = null, errors = null, statusCode = 200 }) => {
  // Set the HTTP status code and send the response as JSON
  res.status(statusCode).json({
    success, // Indicates if the operation was successful
    statusCode, // HTTP status
    message, // Message describing the result
    data,    // Data payload (optional)
    errors  // Error details (optional)
  });
};

export default sendResponse;
