import express from 'express';
import {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getAllInactiveSubscriptions,
} from '../controllers/memberSubscriptionController.js';

const router = express.Router();

// Route to get all subscriptions
router.get('/', getAllSubscriptions);

router.get('/inactive', getAllInactiveSubscriptions);

// Route to get a single subscription by ID
router.get('/:id', getSubscriptionById);

// Route to create a new subscription
router.post('/', createSubscription);

// Route to update an existing subscription
router.put('/:id', updateSubscription);

// Route to delete a subscription
router.delete('/:id', deleteSubscription);


export default router;
