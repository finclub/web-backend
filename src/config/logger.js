import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),  // To log error stacks
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        // Write all logs with level `info` and below to `combined.log` 
        // Write all logs with level `error` and below to `error.log`
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

// Console transport with colorizing
const consoleFormat = winston.format.combine(
    winston.format.colorize({
        all: true  // Colorize the entire message
    }),
    winston.format.printf(
        ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`
    )
);


// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: consoleFormat
    }));
}

export default logger;
