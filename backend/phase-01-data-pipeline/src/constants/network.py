#!/usr/bin/env python3
# src/constants/network.py

"""
Defines constants related to network operations, such as API timeouts.
"""

# Default timeout for external API calls in seconds.
# This is a generous timeout to accommodate potentially large game data downloads
# while still preventing the application from hanging indefinitely.
DEFAULT_API_TIMEOUT = 60
