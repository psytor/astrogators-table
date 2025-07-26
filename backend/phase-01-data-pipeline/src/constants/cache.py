# src/constants/cache.py

"""
Defines constants for caching mechanisms, such as Redis.
"""

# --- Cache Time-to-Live (TTL) ---

# TTL for player data cache in seconds (1 hour = 3600 seconds)
PLAYER_DATA_TTL = 3600

# TTL for static game data (e.g., units, skills) in seconds (24 hours = 86400 seconds)
# This serves as a fallback; primary cache control is proactive invalidation.
GAME_DATA_TTL = 86400

# TTL for localization bundles in seconds (24 hours = 86400 seconds)
# This serves as a fallback; primary cache control is proactive invalidation.
LOCALIZATION_TTL = 86400


# --- Cache Key Prefixes ---

# Prefix for Redis keys storing player data.
# Example: "player:123456789"
PLAYER_KEY_PREFIX = "player:"

# Prefix for Redis keys storing game data bundles.
# Example: "gamedata:latestGamedataVersion"
GAME_DATA_KEY_PREFIX = "gamedata:"

# Prefix for Redis keys storing localization bundles.
# Example: "localization:latestLocalizationBundleVersion"
LOCALIZATION_KEY_PREFIX = "localization:"
