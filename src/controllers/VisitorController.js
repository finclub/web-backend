import Visitor from '../models/Visitor.js';
import STATUS_CODES from '../config/statusCodes.js';
import sendResponse from '../middlewares/responseHandler.js';

// const Visitor = db.Visitor;

export const checkVisitor = async (req, res, next) => {
  const { phone_number } = req.body; // Extract phone_number from the request body

  try {
    // Search for the visitor by phone number
    const visitor = await Visitor.findOne({ where: { phone_number } });

    if (!visitor) {
      return sendResponse(res, {
        success: false,
        message: 'Visitor does not exist.',
        data: null,
        statusCode: STATUS_CODES.NOT_FOUND
      });
    }

    // If visitor exists, return their data
    sendResponse(res, {
      success: true,
      message: 'Visitor found.',
      data: visitor,
      statusCode: STATUS_CODES.OK
    });
  } catch (error) {
    next(error);
  }
};
