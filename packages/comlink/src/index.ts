import { z } from 'zod';
import { createLogger } from '@astrogators-table/logger';
const logger = createLogger('comlink-service');

// --- Zod Schemas for Data Validation ---

const StatSchema = z.object({
  unitStatId: z.number(),
  statValueDecimal: z.preprocess(
    (val) => (val === '' ? 0 : (typeof val === 'string' ? parseFloat(val) : val)),
    z.number()
  ),
}).passthrough();

const PrimaryStatSchema = z.object({
  stat: StatSchema,
}).passthrough();

const SecondaryStatSchema = z.object({
  stat: StatSchema,
  statRolls: z.number(),
  unscaledRollValue: z.array(z.string()).optional(),
  statRollerBoundsMin: z.string().optional(),
  statRollerBoundsMax: z.string().optional(),
}).passthrough();

const ModSchema = z.object({
  id: z.string(),
  definitionId: z.string(),
  level: z.number(),
  tier: z.number(),
  primaryStat: PrimaryStatSchema,
  secondaryStat: z.array(SecondaryStatSchema),
}).passthrough();

const PlayerDataSchema = z.object({
  name: z.string(),
  level: z.number(),
  allyCode: z.string(),
  rosterUnit: z.array(z.object({
    id: z.string(),
    definitionId: z.string(),
    equippedStatMod: z.array(ModSchema).optional(),
  }).passthrough()),
}).passthrough();

const MetadataSchema = z.object({
    latestGamedataVersion: z.string(),
    latestLocalizationBundleVersion: z.string(),
}).passthrough();

const UnitSchema = z.object({
    id: z.string(),
    baseId: z.string(),
    nameKey: z.string(),
    categoryId: z.array(z.string()),
    combatType: z.number(),
    thumbnailName: z.string(),
    rarity: z.number(),
    obtainable: z.boolean(),
    obtainableTime: z.string(),
}).passthrough();

const GameDataSchema = z.object({
    units: z.array(UnitSchema),
}).passthrough();


// --- Type Exports ---

export type PlayerData = z.infer<typeof PlayerDataSchema>;
export type Mod = z.infer<typeof ModSchema>;
export type SecondaryStat = z.infer<typeof SecondaryStatSchema>;
export type Metadata = z.infer<typeof MetadataSchema>;
export type Unit = z.infer<typeof UnitSchema>;


// --- Service Implementation ---

const COMLINK_URL = process.env.SWGOH_COMLINK_URL;
const ACCESS_KEY = process.env.SWGOH_COMLINK_ACCESS_KEY;

/**
 * Fetches a player's raw data from the swgoh-comlink service.
 * @param allyCode The player's ally code as a numeric string.
 * @returns The player's raw data, or null if an error occurs.
 */
export async function fetchPlayer(allyCode: string): Promise<PlayerData | null> {
  if (!COMLINK_URL || !ACCESS_KEY) {
    logger.error('SWGOH_COMLINK_URL or SWGOH_COMLINK_ACCESS_KEY is not defined in environment variables.');
    return null;
  }

  try {
    const response = await fetch(`${COMLINK_URL}/player`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_KEY}`,
      },
      body: JSON.stringify({
        payload: {
          allyCode: allyCode,
        },
        enums: false,
      }),
      
    });

    if (!response.ok) {
      logger.error(`Error fetching player data from comlink: ${response.status} ${response.statusText}`);
      const errorBody = await response.text();
      logger.error('Error body:', errorBody);
      return null;
    }

    const data = await response.json();
    const validationResult = PlayerDataSchema.safeParse(data);
    if (!validationResult.success) {
        logger.error('Invalid player data structure received from comlink:', validationResult.error);
        return null;
    }

    return validationResult.data;
  } catch (error) {
    logger.error('An unexpected error occurred while fetching player data:', error);
    return null;
  }
}

/**
 * Fetches the game metadata from the swgoh-comlink service.
 * @returns The game metadata, or null if an error occurs.
 */
export async function getMetadata(): Promise<Metadata | null> {
    if (!COMLINK_URL || !ACCESS_KEY) {
        logger.error('SWGOH_COMLINK_URL or SWGOH_COMLINK_ACCESS_KEY is not defined in environment variables.');
        return null;
    }

    try {
        const response = await fetch(`${COMLINK_URL}/metadata`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_KEY}`,
            },
            
        });

        if (!response.ok) {
            logger.error(`Error fetching metadata from comlink: ${response.status} ${response.statusText}`);
            const errorBody = await response.text();
            logger.error('Error body:', errorBody);
            return null;
        }

        const data = await response.json();
        const validationResult = MetadataSchema.safeParse(data);
        if (!validationResult.success) {
            logger.error('Invalid metadata structure received from comlink:', validationResult.error);
            return null;
        }

        return validationResult.data;
    } catch (error) {
        logger.error('An unexpected error occurred while fetching metadata:', error);
        return null;
    }
}

/**
 * Fetches game data, including the full list of units, from the swgoh-comlink service.
 * @param gameVersion The latest game data version from the metadata endpoint.
 * @returns An array of unit data, or null if an error occurs.
 */
export async function getUnits(gameVersion: string): Promise<Unit[] | null> {
    if (!COMLINK_URL || !ACCESS_KEY) {
        logger.error('SWGOH_COMLINK_URL or SWGOH_COMLINK_ACCESS_KEY is not defined in environment variables.');
        return null;
    }

    try {
        const response = await fetch(`${COMLINK_URL}/data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_KEY}`,
            },
            body: JSON.stringify({
                payload: {
                    version: gameVersion,
                    includePveUnits: false,
                    requestSegment: 3
                },
                enums: false
            }),
        });

        if (!response.ok) {
            logger.error(`Error fetching units from comlink: ${response.status} ${response.statusText}`);
            const errorBody = await response.text();
            logger.error('Error body:', errorBody);
            return null;
        }

        const data = await response.json();
        const validationResult = GameDataSchema.safeParse(data);
        if (!validationResult.success) {
            logger.error('Invalid unit data structure received from comlink:', validationResult.error);
            return null;
        }

        const filteredUnits = validationResult.data.units.filter(unit =>
            unit.rarity === 7 && unit.obtainable === true && unit.obtainableTime === '0'
        );

        return filteredUnits;
    } catch (error) {
        logger.error('An unexpected error occurred while fetching units:', error);
        return null;
    }
}