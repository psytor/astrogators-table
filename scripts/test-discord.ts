// scripts/test-discord.ts
import * as dotenv from 'dotenv';
import * as path from 'path';
import { sendDiscordNotification } from '../src/services/discordService';
import { logger } from '../src/services/logger';

// Load environment variables from .env file at the project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function runTest() {
  logger.info('Running Discord notification test...');

  try {
    await sendDiscordNotification({
      title: '✅ Test Successful',
      message: 'This is a test message from the Astrogator\'s Table application. If you see this, the Discord notification service is working correctly.',
      severity: 'success',
    });

    await sendDiscordNotification({
        title: '⚠️ Test Warning',
        message: 'This is a test of the warning severity level.',
        severity: 'warning',
      });

    logger.info('Test notification sent successfully. Please check your Discord channel.');
  } catch (error) {
    logger.error('Failed to send test notification:', error);
    process.exit(1); // Exit with error code
  }
}

runTest();
