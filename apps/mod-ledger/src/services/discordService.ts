import { createLogger } from '@astrogators-table/logger';
const logger = createLogger('mod-ledger');

const COLORS = {
  info: 3447003,    // Blue
  success: 5763719,  // Green
  warning: 16705372, // Yellow
  error: 15548997,   // Red
  default: 2040319,  // Dark Grey
};

type Severity = 'info' | 'success' | 'warning' | 'error';

interface DiscordPayload {
  title: string;
  message: string;
  severity?: Severity;
}

/**
 * Sends a formatted notification to a Discord webhook.
 * @param payload - The content of the message to send.
 * @returns A promise that resolves when the message is sent.
 */
export async function sendDiscordNotification(payload: DiscordPayload): Promise<void> {
  const { title, message, severity = 'default' } = payload;
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    logger.warn('DISCORD_WEBHOOK_URL is not set. Skipping notification.');
    // Silently fail in development if the webhook isn't set up
    return;
  }

  const embed = {
    title,
    description: message,
    color: COLORS[severity] || COLORS.default,
    timestamp: new Date().toISOString(),
    footer: {
      text: 'The Astrogator\'s Table',
    },
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      logger.error(`Failed to send Discord notification. Status: ${response.status}. Body: ${errorBody}`);
      throw new Error(`Discord API request failed with status ${response.status}`);
    }

    logger.info(`Discord notification sent successfully for: ${title}`);
  } catch (error) {
    logger.error('Error sending Discord notification:', error);
    // Re-throw the error to allow the caller to handle it if needed
    throw error;
  }
}
