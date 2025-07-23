import { NextResponse } from 'next/server';
import { getDbLookups } from '@/backend/services/modHydrationService';
import { createLogger } from '@astrogators-table/logger';

const logger = createLogger('ML-dblookup-api');

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
  logger.info('Request received for DB lookups.');
  try {
    logger.debug('Fetching all DB lookups...');
    const dbLookups = await getDbLookups();
    logger.debug('Successfully fetched DB lookups.');
    return NextResponse.json(dbLookups);
  } catch (error) {
    logger.error('Failed to fetch DB lookups:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
