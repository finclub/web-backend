import dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

export default {
  databaseURL: process.env.DATABASE_URL,
  databaseSSLRequire: process.env.DATABASE_SSL_REQUIRE === 'true',
  databaseSSLRejectUnauthorized:
    process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'true',
  port: process.env.PORT || 5005
};
