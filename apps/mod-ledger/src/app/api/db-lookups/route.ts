import { NextResponse } from 'next/server';
import { getDbLookups } from '@/services/modHydrationService';

/**
 * @swagger
 * /api/db-lookups:
 *   get:
 *     summary: Fetches static database lookups
 *     description: Retrieves all static game data required for the frontend, such as stat names, mod set bonuses, and shape definitions. This data is used to hydrate the compact mod data from the player endpoint.
 *     tags:
 *       - Lookups
 *     responses:
 *       200:
 *         description: Successfully retrieved the database lookups.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stats:
 *                   type: object
 *                   description: A map of stat IDs to their names and properties.
 *                 sets:
 *                   type: object
 *                   description: A map of mod set IDs to their names and bonuses.
 *                 shapes:
 *                   type: object
 *                   description: A map of mod shape IDs to their names.
 *                 rararities:
 *                   type: object
 *                   description: A map of rarity levels (pips) to their names.
 *                 statRollInfo:
 *                   type: array
 *                   description: A list of all possible stat roll ranges.
 */
export async function GET() {
  const dbLookups = await getDbLookups();
  return NextResponse.json(dbLookups);
}
