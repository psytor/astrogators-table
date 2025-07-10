import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

const { combine, timestamp, printf, colorize } = winston.format;

// Custom log format to match your specification
const logFormat = printf(({ level, message, timestamp: ts, processName, pid }) => {
  return `${ts} [${pid}] [${processName}] [${level.toUpperCase()}] ${message}`;
});

export const createLogger = (processName: string) => {
  const logger = winston.createLogger({
    level: 'info', // Default level
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format((info) => {
        info.pid = process.pid;
        info.processName = processName;
        return info;
      })(),
      logFormat
    ),
    transports: [
      // Console transport with colorized output
      new winston.transports.Console({
        format: combine(
          colorize(),
          logFormat
        ),
      }),
      // Daily rotating file transport
      new winston.transports.DailyRotateFile({
        filename: path.join('logs', `${processName}-%DATE%.log`),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        level: 'info', // Log 'info' and higher levels to the file
      }),
      // Daily rotating file transport for errors
      new winston.transports.DailyRotateFile({
        filename: path.join('logs', `${processName}-error-%DATE%.log`),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        level: 'error', // Log only 'error' level to this file
      }),
    ],
  });

  return logger;
};
