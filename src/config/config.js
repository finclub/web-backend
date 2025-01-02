import dotenv from 'dotenv';

dotenv.config();

export default {
  env: process.env.NODE_ENV,
  syncDatabase: process.env.SYNC_DATABASE || false,
  syncDatabaseForce: process.env.SYNC_DATABASE_FORCE || false,
  databaseURL: process.env.DATABASE_URL,
  databaseSSLRequire: process.env.DATABASE_SSL_REQUIRE === 'true',
  databaseSSLRejectUnauthorized:
    process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'true',
  port: process.env.PORT || 5005
};
