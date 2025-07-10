import { z } from 'zod';

// Define the expected structure of the player data from swgoh-comlink
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

export type PlayerData = z.infer<typeof PlayerDataSchema>;
export type Mod = z.infer<typeof ModSchema>;
export type SecondaryStat = z.infer<typeof SecondaryStatSchema>;

const COMLINK_URL = process.env.SWGOH_COMLINK_URL;
const ACCESS_KEY = process.env.SWGOH_COMLINK_ACCESS_KEY;

/**
 * Fetches a player's raw data from the swgoh-comlink service.
 * @param allyCode The player's ally code as a numeric string.
 * @returns The player's raw data, or null if an error occurs.
 */
export async function fetchPlayer(allyCode: string): Promise<PlayerData | null> {
  if (!COMLINK_URL || !ACCESS_KEY) {
    console.error('SWGOH_COMLINK_URL or SWGOH_COMLINK_ACCESS_KEY is not defined in environment variables.');
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
      console.error(`Error fetching player data from comlink: ${response.status} ${response.statusText}`);
      const errorBody = await response.text();
      console.error('Error body:', errorBody);
      return null;
    }

    const data = await response.json();
    
    // Validate the response data against our schema
    const validationResult = PlayerDataSchema.safeParse(data);
    if (!validationResult.success) {
        console.error('Invalid player data structure received from comlink:', validationResult.error);
        return null;
    }

    return validationResult.data;
  } catch (error) {
    console.error('An unexpected error occurred while fetching player data:', error);
    return null;
  }
}
