#!/usr/bin/env python3
# src/config/environment.py

from pydantic_settings import BaseSettings, SettingsConfigDict

class AppConfig(BaseSettings):
    """
    Defines the application's configuration settings, loaded from environment
    variables and .env files.

    Utilizes pydantic-settings to automatically read and validate configuration
    at application startup.
    """
    # --- Logging Configuration ---
    LOG_LEVEL: str = "INFO"

    # --- SWGOH Comlink Service ---
    SWGOH_COMLINK_URL: str
    SWGOH_COMLINK_ACCESS_KEY: str

    # --- Discord Webhook for Notifications ---
    DISCORD_WEBHOOK_URL: str | None = None

    # --- Database Configuration ---
    DATABASE_URL: str

    # --- Redis Cache Configuration ---
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    REDIS_PASSWORD: str

    # Model configuration
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding='utf-8',
        extra='ignore'
    )

# Instantiate the configuration object
# This single instance will be used throughout the application
settings = AppConfig()
