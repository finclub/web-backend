import 'dotenv/config';

export default {
  database: {
    url: process.env.DATABASE_URL,
    ssl: {
      require: process.env.DATABASE_SSL_REQUIRE === 'true',
      rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'true',
    },
  },
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
  environment: process.env.NODE_ENV || 'development',
};



// import dotenv from 'dotenv';

// dotenv.config();

// const config = {
//   PORT: process.env.PORT || 5000,
//   NODE_ENV: process.env.NODE_ENV || 'development',
//   JWT_SECRET: process.env.JWT_SECRET || 'default_jwt_secret',
//   DATABASE: {
//     USER: process.env.DB_USER,
//     HOST: process.env.DB_HOST,
//     NAME: process.env.DB_NAME,
//     PASSWORD: process.env.DB_PASS,
//     PORT: process.env.DB_PORT || 5432,
//     URL: process.env.DATABASE_URL,
//     // SSL: {
//     //   REQUIRE: process.env.DATABASE_SSL_REQUIRE === 'true',
//     //   REJECT_UNAUTHORIZED: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'true',
//     // },
//   },
// };

// export default config;
