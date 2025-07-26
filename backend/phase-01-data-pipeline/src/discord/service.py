#!/usr/bin/env python3
# src/discord/service.py

import httpx
from typing import Literal

from src.config.environment import settings
from src.logger.service import get_logger

# Get a logger instance for this service
logger = get_logger(__name__)

# --- Type Definitions for Embed Colors ---
EmbedColor = Literal[int]

class DiscordColors:
    """Standardized colors for Discord embeds."""
    SUCCESS: EmbedColor = 0x2ECC71  # Green
    ERROR: EmbedColor = 0xE74C3C    # Red
    WARNING: EmbedColor = 0xF1C40F  # Yellow
    INFO: EmbedColor = 0x3498DB     # Blue

class DiscordNotificationService:
    """
    A service to send rich notifications to a Discord webhook using embeds.
    """

    @staticmethod
    def _send_embed(title: str, description: str, color: EmbedColor, fields: list[dict] = None):
        """
        Constructs and sends a Discord embed to the configured webhook URL.

        Args:
            title (str): The title of the embed.
            description (str): The main content of the embed.
            color (EmbedColor): The color of the left border of the embed.
            fields (list[dict], optional): A list of field objects to include in the embed.
        """
        webhook_url = settings.DISCORD_WEBHOOK_URL
        if not webhook_url:
            logger.warning("DISCORD_WEBHOOK_URL is not configured. Skipping notification.")
            return

        embed = {
            "title": title,
            "description": description,
            "color": color,
        }
        if fields:
            embed["fields"] = fields

        payload = {"embeds": [embed]}

        try:
            with httpx.Client() as client:
                response = client.post(webhook_url, json=payload)
                response.raise_for_status()
            logger.info(f"Successfully sent '{title}' notification to Discord.")
        except httpx.RequestError as e:
            logger.error(f"Error sending notification to Discord: {e}")
        except httpx.HTTPStatusError as e:
            logger.error(
                f"Discord notification failed with status {e.response.status_code}: {e.response.text}"
            )

    @classmethod
    def send_success(cls, title: str, description: str):
        """Sends a success-themed notification."""
        cls._send_embed(title, description, DiscordColors.SUCCESS)

    @classmethod
    def send_error(cls, title: str, description: str, details: str = None):
        """Sends an error-themed notification."""
        fields = [{"name": "Details", "value": details, "inline": False}] if details else None
        cls._send_embed(title, description, DiscordColors.ERROR, fields=fields)

    @classmethod
    def send_info(cls, title: str, description: str):
        """Sends an info-themed notification."""
        cls._send_embed(title, description, DiscordColors.INFO)

    @classmethod
    def send_new_content_alert(cls, title: str, content_type: str, new_items: list[str]):
        """Sends a specialized alert for new game content."""
        description = f"New {content_type} have been detected and added to the system."
        # Format the list of new items into a clean, readable string
        items_value = "\\n".join(f"- {item}" for item in new_items)
        fields = [{"name": f"New {content_type}", "value": items_value, "inline": False}]
        cls._send_embed(title, description, DiscordColors.INFO, fields=fields)

# Example of how to use the service:
# if __name__ == "__main__":
#     DiscordNotificationService.send_success(
#         "Database Sync", "Successfully updated all player information."
#     )
#     DiscordNotificationService.send_error(
#         "API Client Failure", "Could not connect to SWGOH API.", "Status Code: 503"
#     )
#     DiscordNotificationService.send_info(
#         "Localization Update", "New text assets have been synced to the database."
#     )
#     DiscordNotificationService.send_new_content_alert(
#         "New Content Added", "Characters", ["Jedi Knight Cal Kestis", "Second Sister"]
#     )
