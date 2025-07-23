import { NextRequest, NextResponse } from 'next/server';
import { getPlayerData } from '@/backend/services/modHydrationService';
import { createLogger } from '@astrogators-table/logger'
const logger = createLogger('ML-player-api')

/**
 * @swagger
 * /api/player/mods/{allycode}:
 *   get:
 *     summary: Fetches hydrated mod data for a specific player
 *     description: Retrieves and processes all mod data for a given player ally code. The returned data is "hydrated," meaning it combines raw game data with static lookups to provide a rich, display-ready object.
 *     tags:
 *       - Player Data
 *     parameters:
 *       - in: path
 *         name: allycode
 *         required: true
 *         description: The player's 9-digit ally code. Can be formatted with or without dashes.
 *         schema:
 *           type: string
 *           example: "123456789"
 *     responses:
 *       200:
 *         description: Successfully retrieved and processed player mod data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HydratedPlayerData'
 *       400:
 *         description: Invalid ally code provided.
 *       500:
 *         description: Failed to fetch or process player data from the upstream service.
 *
 * components:
 *   schemas:
 *     HydratedPlayerData:
 *       type: object
 *       properties:
 *         playerName:
 *           type: string
 *           description: The player's in-game name.
 *         allyCode:
 *           type: string
 *           description: The player's 9-digit ally code.
 *         lastUpdated:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the data was last fetched.
 *         rosterUnit:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RosterUnit'
 *     RosterUnit:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The character's definitionId (e.g., "JEDIKNIGHTLUKE").
 *         mods:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CompactMod'
 *     CompactMod:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique ID of the mod.
 *         d:
 *           type: string
 *           description: A compact definition string containing Set, Rarity, and Shape IDs.
 *         l:
 *           type: integer
 *           description: "Mod level (1-15)."
 *         t:
 *           type: integer
 *           description: "Mod tier (quality, e.g., 5 for Gold)."
 *         c:
 *           type: string
 *           description: The definitionId of the character the mod is equipped to.
 *         p:
 *           $ref: '#/components/schemas/CompactStat'
 *           description: The primary stat of the mod.
 *         s:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CompactStat'
 *           description: An array of secondary stats.
 *         oe:
 *           type: number
 *           description: "Overall Efficiency of the mod, calculated as the average of its secondary stat efficiencies."
 *     CompactStat:
 *       type: object
 *       properties:
 *         i:
 *           type: integer
 *           description: "The stat's unique ID (from the Stat table)."
 *         v:
 *           type: number
 *           description: "The stat's formatted value."
 *         r:
 *           type: integer
 *           description: "The number of times the stat has been rolled (upgraded)."
 *         e:
 *           type: number
 *           description: "The calculated efficiency of this stat (0-100)."
 *         rv:
 *           type: array
 *           items:
 *             type: integer
 *           description: "An array of the raw, unscaled values for each individual roll."
 *         re:
 *           type: array
 *           items:
 *             type: number
 *             format: float
 *           description: "An array of the calculated efficiency for each individual roll (0-100)."
 */
export async function GET(request: NextRequest) {
  const rawAllyCode = request.nextUrl.pathname.split('/').pop() || '';

  // Normalize the ally code by removing all non-digit characters
  const numericAllyCode = rawAllyCode.replace(/\D/g, '');

  // Validate that the normalized code contains exactly 9 digits
  if (numericAllyCode.length !== 9) {
    return NextResponse.json(
      { error: 'Invalid ally code. It must contain exactly 9 digits.' },
      { status: 400 }
    );
  }

  const playerData = await getPlayerData(numericAllyCode);

  if (!playerData) {
    return NextResponse.json(
      { error: 'Failed to fetch or process player data.' },
      { status: 500 }
    );
  }

  return NextResponse.json(playerData);
}