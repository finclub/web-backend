const sendResponse = (
  res,
  { success, message, data = null, errors = null, statusCode = 200 }
) => {
  res.status(statusCode).json({ success, message, data, errors });
};

export default sendResponse;
