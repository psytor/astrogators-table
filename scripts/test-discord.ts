// scripts/test-discord.ts
import * as dotenv from 'dotenv';
import * as path from 'path';
import { sendDiscordNotification } from '../src/services/discordService';

// Load environment variables from .env file at the project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function runTest() {
  console.info('Running Discord notification test...');

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

    console.info('Test notification sent successfully. Please check your Discord channel.');
  } catch (error) {
    console.error('Failed to send test notification:', error);
    process.exit(1); // Exit with error code
  }
}

runTest();
