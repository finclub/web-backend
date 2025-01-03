// src\routes\index.js
import express from 'express';
import userRoutes from './userRoutes.js';
import visitorRoutes from './visitorRoutes.js';
// import memberRoutes from './memberRoutes.js';
import memberRoutes from './memberRoutes.js';

import memberSubscriptionRoutes from './memberSubscriptionRoutes.js'

const router = express.Router();

router.use('/users', userRoutes);
router.use('/visitors', visitorRoutes);
router.use('/members/subscriptions',memberSubscriptionRoutes)
router.use('/members', memberRoutes);
// router.use('/members', memberRoutes);

export default router;
