import { Sequelize } from 'sequelize';
import config from './config.js';

const sequelizeOptions = {
  dialect: 'postgres',
  define: {
    underscored: true // Enables camelCase-to-snake_case mapping
  },
  dialectOptions: {}
};

if (config.databaseSSLRequire) {
  sequelizeOptions.dialectOptions.ssl = {
    require: config.databaseSSLRequire,
    rejectUnauthorized: config.databaseSSLRejectUnauthorized
  };
}

const sequelize = new Sequelize(config.databaseURL, sequelizeOptions);

const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const syncDatabase = async () => {
  try {
    await sequelize.sync({
      logging: console.log,
      force: config.syncDatabaseForce
    });
    console.log('Database synced and tables created.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, testDatabaseConnection, syncDatabase };
