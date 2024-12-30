import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import userRoutes from './routes/UserRoutes.js';
import config from './config/config.js';
import logger from './config/logger.js';
import { testDatabaseConnection } from './config/db.js';

const app = express();
const port = config.port;

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors());
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use('/api/v1', apiLimiter);

app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    const safeBody = { ...req.body };
    delete safeBody.password;
    logger.info(`${req.method} ${req.url} - Body: ${JSON.stringify(safeBody)}`);
  }
  next();
});

// Default root route
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to the Gym Management API!' });
});

// Routes
app.use('/api/v1', userRoutes);

testDatabaseConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log('Failed to connect to the database:', error);
  });
