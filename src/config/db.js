import { Sequelize } from 'sequelize';
import config from './config.js';

const sequelizeOptions = {
  dialect: 'postgres',
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

export { sequelize, testDatabaseConnection };
