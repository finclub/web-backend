import { sequelize } from '../config/db.js';

const syncModels = async (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    try {
      await sequelize.sync({ alter: true }); // Safely tries to bring the database schema to the new model state
      console.log('Database models were synchronized successfully.');
    } catch (error) {
      console.error('Failed to synchronize database models:', error);
      return res.status(500).send('Failed to synchronize database models.');
    }
  }
  next();
};

export default syncModels;
