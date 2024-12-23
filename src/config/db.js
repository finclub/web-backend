import pkg from 'pg';
import config from './config.js';
import logger from './logger.js';

const { Pool } = pkg;

// Configure Pool
const pool = new Pool({
  connectionString: config.database.url,
  ssl: config.environment === 'production' ? config.database.ssl : false,
});

pool.on('connect', () => {
  logger.info('Connected to the database');
});

pool.on('error', (err) => {
  logger.error(`Database connection error: ${err.message}`);
});

export default pool;






// import pkg from 'pg'; // Import the entire package as a default import
// const { Pool } = pkg; // Destructure the Pool class from the package

// import dotenv from 'dotenv';
// import logger from './logger.js';

// dotenv.config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
// });

// pool.on('connect', () => {
//   logger.info('Connected to the database');
// });

// pool.on('error', (err) => {
//   logger.error(`Database connection error: ${err.message}`);
// });

// export default pool;
