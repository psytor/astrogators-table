#!/usr/bin/env python3
# src/constants/api.py

"""
Defines constants, enums, and payload generators for the SWGOH Comlink API.
"""
from enum import Enum

# --- SWGOH API Enums ---

class GameDataSegment(Enum):
    """
    Enumerates the available segments for the /data endpoint.
    Using an enum makes code more readable and prevents errors.

    Note: When requesting a partial segment, the API response will still
    include all top-level keys that are present in a FULL request. However,
    keys not belonging to the requested segment will contain empty data
    (e.g., [] or {}).
    
    Segments as documented by swgoh-utils:
    - 0: Full game data (200+ MB)
    - 1: Partial data (50 MB) - Includes equipment, materials, skills, etc.
    - 2: Partial data (50 MB) - Includes abilities, raids, stat mods, etc.
    - 3: Partial data (50-80+ MB) - Includes relic tiers and units.
    - 4: Partial data (25+ MB) - Includes artifacts, campaigns, datacrons, etc.
    """
    FULL = 0
    PARTIAL_1 = 1
    PARTIAL_2 = 2
    PARTIAL_3 = 3
    PARTIAL_4 = 4

# --- SWGOH API Endpoints ---

# The endpoint path for POST requests to fetch application metadata.
# This is often the first call to get the latest game data versions.
METADATA_ENDPOINT = "metadata"

# The endpoint path for POST requests to fetch player data.
PLAYER_ENDPOINT = "player"

# The endpoint path for POST requests to fetch various game data assets.
DATA_ENDPOINT = "data"

# The endpoint path for POST requests to fetch localization bundles (game text).
LOCALIZATION_ENDPOINT = "localization"


# --- SWGOH API Payload Generators ---

def get_player_payload(ally_code: str) -> dict:
    """
    Generates the JSON payload for the player endpoint POST request.

    Args:
        ally_code: The player's ally code as a string.

    Returns:
        A dictionary representing the request payload.
    """
    return {
        "payload": {
            "allyCode": ally_code
        },
        "enums": False
    }

def get_data_payload(
    latestGamedataVersion: str,
    segment: GameDataSegment
) -> dict:
    """
    Generates the JSON payload for the data endpoint POST request.

    Args:
        latestGamedataVersion: The game data version to fetch.
        segment: The specific segment of the game data to request.

    Returns:
        A dictionary representing the request payload.
    """
    return {
        "payload": {
            "version": latestGamedataVersion,
            "includePveUnits": False,
            "requestSegment": segment.value
        },
        "enums": False
    }

def get_localization_payload(
    latestLocalizationBundleVersion: str,
    unzip: bool = True
) -> dict:
    """
    Generates the JSON payload for the localization endpoint POST request.

    Args:
        latestLocalizationBundleVersion: The localization version id to fetch.
        unzip: If True, the API returns a map of language keys to text files.
               If False, it returns a single base64 encoded zip file.

    Returns:
        A dictionary representing the request payload.
    """
    return {
        "unzip": unzip,
        "payload": {
            "id": latestLocalizationBundleVersion
        },
        "enums": False
    }
