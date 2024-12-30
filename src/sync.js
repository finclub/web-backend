import { sequelize } from './config/db.js';

sequelize
  .sync({ force: true })
  .then(() => console.log('Database models were synchronized successfully.'))
  .catch((error) =>
    console.error('Failed to synchronize database models:', error)
  );
