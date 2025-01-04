import memberSubscriptionModel from "../models/memberSubscriptionModel.js";
import STATUS_CODES from "../config/statusCodes.js";
import sendResponse from "../middlewares/responseHandler.js";

import { Op } from 'sequelize';
import subscriptionHistoryModel from '../models/subscriptionHistoryModel.js';  // Import SubscriptionHistory model
import Member from '../models/memberModel.js';  // Import Member model



export const createSubscription = async (req, res, next) => {
  const { club_id, name, category, price, billing_cycle, description, duration_days, sessions } = req.body;
  try {
    const subscription = await memberSubscriptionModel.create({
      club_id,
      name,
      category,
      price,
      billing_cycle,
      description,
      duration_days,   // Duration in days
      sessions,        // Sessions included in the plan
    });

    sendResponse(res, {
      success: true,
      message: "Subscription created successfully.",
      data: subscription,
      statusCode: STATUS_CODES.CREATED,
    });
  } catch (error) {
    next(error);
  }
};


export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await memberSubscriptionModel.findAll({
      where: {
        active: true,
        deleted: false,
      },
      order: [["created_at", "DESC"]],
    });

    sendResponse(res, {
      success: true,
      message: "Active subscriptions fetched successfully.",
      data: subscriptions,
      statusCode: STATUS_CODES.OK,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const subscription = await memberSubscriptionModel.findByPk(id);

    if (!subscription) {
      return sendResponse(res, {
        success: false,
        message: "Subscription not found.",
        statusCode: STATUS_CODES.NOT_FOUND,
      });
    }

    sendResponse(res, {
      success: true,
      message: "Subscription fetched successfully.",
      data: subscription,
      statusCode: STATUS_CODES.OK,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  const { id } = req.params;
  const { club_id, name, category, price, billing_cycle, description, duration_days, sessions, active } = req.body;

  try {
    // Find the subscription by ID
    const subscription = await memberSubscriptionModel.findByPk(id);

    // If the subscription doesn't exist or is inactive, return a 404
    if (!subscription || subscription.deleted || !subscription.active) {
      return sendResponse(res, {
        success: false,
        message: "Subscription not found or is inactive.",
        statusCode: STATUS_CODES.NOT_FOUND,
      });
    }

    // Update the subscription with new values
    const updatedSubscription = await subscription.update({
      club_id,
      name,
      category,
      price,
      billing_cycle,
      description,
      duration_days,  // Updated duration (in days)
      sessions,       // Updated sessions
      active,         // Active status of the subscription
    });

    // Send the success response
    sendResponse(res, {
      success: true,
      message: "Subscription updated successfully.",
      data: updatedSubscription,
      statusCode: STATUS_CODES.OK,
    });
  } catch (error) {
    next(error); // Pass errors to the error-handling middleware
  }
};


export const deleteSubscription = async (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return sendResponse(res, {
      success: false,
      message: "Invalid or missing subscription ID.",
      statusCode: STATUS_CODES.BAD_REQUEST,
    });
  }

  try {
    const subscription = await memberSubscriptionModel.findByPk(id);

    if (!subscription) {
      return sendResponse(res, {
        success: false,
        message: "Subscription not found.",
        statusCode: STATUS_CODES.NOT_FOUND,
      });
    }

    await subscription.update({
      deleted: true,
      updated_at: new Date(),
    });

    sendResponse(res, {
      success: true,
      message: "Subscription marked as deleted successfully.",
      data: { ...subscription.toJSON(), deleted: true },
      statusCode: STATUS_CODES.OK,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllInactiveSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await memberSubscriptionModel.findAll({
      where: {
        active: false,
        deleted: false,
      },
      order: [["created_at", "DESC"]],
    });

    sendResponse(res, {
      success: true,
      message: "Inactive subscriptions fetched successfully.",
      data: subscriptions,
      statusCode: STATUS_CODES.OK,
    });
  } catch (error) {
    next(error);
  }
};


// subscription history 


// Function to check and update expired subscriptions
export const checkExpiredSubscriptions = async () => {
  try {
    // Get today's date
    const today = new Date();

    // Find all subscriptions where the end_date has passed, and the status is still 'active'
    const expiredSubscriptions = await subscriptionHistoryModel.findAll({
      where: {
        end_date: { [Op.lt]: today }, // Subscriptions with end_date before today
        status: 'active',  // Only check for active subscriptions
      },
    });

    // Update the status of expired subscriptions
    await Promise.all(
      expiredSubscriptions.map(async (subscription) => {
        subscription.status = 'expired';  // Set the status to expired
        await subscription.save();  // Save the changes
      })
    );

    console.log(`${expiredSubscriptions.length} subscriptions updated to 'expired' status.`);
  } catch (error) {
    console.error("Error updating subscription statuses:", error);
  }
};

