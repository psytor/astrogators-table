import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as path from 'path';
import findUp from 'find-up';

/**
 * Finds the project's root directory by searching upwards for the `.git` directory.
 * This is a reliable method for monorepos, as it ensures that logs are placed
 * in a central `logs` folder at the true project root, regardless of where the
 * script using the logger is located (e.g., in `packages/database` or `apps/mod-ledger`).
 * The `.git` directory is used as the anchor because it is a standard, unique marker
 * for the root of a version-controlled project.
 * @returns The absolute path to the project root.
 * @throws {Error} If the `.git` directory cannot be found.
 */
function getProjectRoot() {
  const gitDir = findUp.sync('.git', { type: 'directory' });
  if (!gitDir) {
    throw new Error('Could not find project root. The `.git` directory is required to determine the root.');
  }
  // The project root is the directory containing the `.git` folder.
  return path.dirname(gitDir);
}

// --- Logger Configuration ---

const customLevels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
};

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
 * @param appName - The name of the application (e.g., 'mod-ledger', 'database-seeder').
 */
export function createLogger(appName: string) {
  const logLevel = process.env.LOG_LEVEL || 'info';

  const logFormat = winston.format.printf(
    ({ timestamp, level, message, ...meta }) => {
      const appLabel = meta.appName || appName;
      const pid = process.pid;
      let logMessage = `${timestamp} [${level.toUpperCase()}] [${appLabel}] [PID: ${pid}] ${message}`;

      if (level === 'verbose' && typeof meta === 'object' && Object.keys(meta).length > 1) {
          const metaStr = JSON.stringify(meta, null, 2);
          if (metaStr !== '{}') {
              logMessage += `\n${metaStr}`;
          }
      }
      return logMessage;
    }
  );

  const transports: winston.transport[] = [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
  ];

  try {
    const projectRoot = getProjectRoot();
    const logDir = path.join(projectRoot, 'logs');

    transports.push(
      new winston.transports.DailyRotateFile({
        filename: path.join(logDir, `astrogators-table-%DATE%.log`),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      })
    );
    transports.push(
      new winston.transports.DailyRotateFile({
        level: 'error',
        filename: path.join(logDir, `astrogators-table.error-%DATE%.log`),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d',
      })
    );
  } catch (error) {
    console.error('Failed to initialize file logging:', error);
  }

  return winston.createLogger({
    level: logLevel,
    levels: customLevels,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      winston.format.splat(),
      logFormat
    ),
    transports,
    defaultMeta: { appName },
  });
}