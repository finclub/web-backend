import 'dotenv/config';

export default {
    databaseURL: process.env.DATABASE_URL,
    databaseSSLRequire: process.env.DATABASE_SSL_REQUIRE === 'true',
    databaseSSLRejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'true',
    port: process.env.PORT || 3000
};