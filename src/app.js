import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/membersRoutes.js';
import membersRoutes from './routes/membersRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Authentication Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', membersRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
