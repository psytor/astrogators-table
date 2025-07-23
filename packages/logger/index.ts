import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as path from 'path';

// Define the custom levels as you specified
const customLevels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
};

// Define colors for the console output
const customColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  verbose: 'cyan',
  debug: 'blue',
};

winston.addColors(customColors);

/**
 * Creates a new logger instance for a specific application.
 * @param appName - The name of the application (e.g., 'mod-ledger', 'astro').
 */
export function createLogger(appName: string) {
  const logDir = path.join(process.cwd(), 'logs');
  const logLevel = process.env.LOG_LEVEL || 'info';

  // The custom format you requested
  const logFormat = winston.format.printf(
    ({ timestamp, level, message, ...meta }) => {
      const appLabel = meta.appName || appName;
      let logMessage = `${timestamp} [${level.toUpperCase()}] [${appLabel}] ${message}`;

      // Handle verbose logging for objects
      if (level === 'verbose' && typeof meta === 'object' && Object.keys(meta).length > 1) {
          const metaStr = JSON.stringify(meta, null, 2);
          if (metaStr !== '{}') {
              logMessage += `\n${metaStr}`;
          }
      }

      return logMessage;
    }
  );

  const transports = [
    // Console transport with colorization
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true })
      ),
    }),
    // Main rotating log file for this specific app
    new winston.transports.DailyRotateFile({
      filename: path.join(logDir, `${appName}-%DATE%.log`),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    // Separate rotating error log file for this specific app
    new winston.transports.DailyRotateFile({
      level: 'error',
      filename: path.join(logDir, `${appName}.error-%DATE%.log`),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
    }),
  ];

  return winston.createLogger({
    level: logLevel,
    levels: customLevels,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      winston.format.splat(),
      logFormat
    ),
    transports,
    defaultMeta: { appName }, // Pass appName to the log format
  });
}