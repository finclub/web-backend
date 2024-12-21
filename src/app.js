import express from 'express';
import userRoutes from './api/routes/UserRoutes.js';
import config from './config/config.js';
import logger from './config/logger.js';
import { testDatabaseConnection } from './db/index.js';

const app = express();

app.use(express.json());

// Logger middleware to log every HTTP request
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use('/api', userRoutes);

const port = config.port;

// Test database connection and start server
testDatabaseConnection().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
