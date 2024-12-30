import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Custom log format for Console
const consoleFormat = winston.format.combine(
  winston.format.colorize(), // Colorize the log levels
  winston.format.printf(
    ({ level, message, timestamp, stack }) =>
      `${timestamp} ${level}: ${stack || message}`
  )
);

// Custom log format for Files
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }), // Include error stacks
  winston.format.json() // Structured JSON format for logs
);

// Create logger instance
const logger = winston.createLogger({
  level: 'info', // Default log level
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(), // For string interpolation
    winston.format.json() // Default log format for files
  ),
  defaultMeta: { service: 'user-service' }, // Add default metadata
  transports: [
    // Daily rotation for error logs
    new DailyRotateFile({
      filename: 'logs/%DATE%-error.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '14d' // Retain logs for 14 days
    }),
    // Daily rotation for combined logs
    new DailyRotateFile({
      filename: 'logs/%DATE%-combined.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d' // Retain logs for 14 days
    })
  ]
});

// Add Console transport for development
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat // Use the custom console format
    })
  );
}

export default logger;