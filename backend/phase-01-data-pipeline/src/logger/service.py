# src/logger/service.py

import logging
import os
from logging.handlers import RotatingFileHandler

from src.config.environment import settings

# --- Log Directory ---
LOG_DIR = "logs"
if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)

# --- Custom Log Formatter ---
class CustomFormatter(logging.Formatter):
    """
    Custom log formatter to include application name, process ID, and color-coded log levels.
    """
    def __init__(self, app_name):
        super().__init__()
        self.app_name = app_name

    def format(self, record):
        log_format = (
            f"%(asctime)s.%(msecs)03d "
            f"[{self.app_name}]"
            f"[%(process)d]"
            f"[%(levelname)s] "
            f"%(message)s"
        )
        formatter = logging.Formatter(log_format, datefmt="%Y-%m-%d %H:%M:%S")
        return formatter.format(record)

# --- Logger Factory ---
def get_logger(name: str, log_group: str = 'core'):
    """
    Configures and returns a logger instance.

    The log file and behavior are determined by the global LOG_LEVEL setting.
    - DEBUG: Logs are written to a file specific to the logger's name (e.g., 'logs/data_fetcher.log').
    - INFO & above: Logs are written to a consolidated file based on the log_group (e.g., 'logs/core.log').

    Args:
        name (str): The name of the logger, used for the log file in DEBUG mode.
        log_group (str): The group to log to in INFO mode. Defaults to 'core'.

    Returns:
        logging.Logger: A configured logger instance.
    """
    logger = logging.getLogger(name)
    logger.setLevel(settings.LOG_LEVEL)

    # Prevent log messages from being duplicated in parent loggers
    logger.propagate = False

    # Determine log file path based on log level
    if settings.LOG_LEVEL == "DEBUG":
        log_file = os.path.join(LOG_DIR, f"{name}.log")
    else:
        log_file = os.path.join(LOG_DIR, f"{log_group}.log")

    # --- File Handler ---
    # Use RotatingFileHandler to manage log file size
    handler = RotatingFileHandler(
        log_file,
        maxBytes=10*1024*1024,  # 10 MB
        backupCount=5
    )
    handler.setFormatter(CustomFormatter(app_name=name))

    # Add handler only if not already present
    if not any(isinstance(h, RotatingFileHandler) and h.baseFilename == handler.baseFilename for h in logger.handlers):
        logger.addHandler(handler)

    return logger
