import { PlayerData, fetchPlayer, Mod, SecondaryStat } from './swgohComlinkService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// --- Type definitions for our final API response ---

interface CompactStat {
  i: number; // statId
  v: number; // value
  r?: number; // rolls (only for secondary stats)
}

interface CompactMod {
  id: string;
  d: string; // definitionId
  l: number; // level
  t: number; // tier
  c: string; // characterId
  p: CompactStat;
  s: CompactStat[];
}

interface LookupTable<T> {
  [key: string]: T;
}

export interface HydratedPlayerData {
  playerName: string;
  allyCode: string;
  lastUpdated: string;
  rosterUnit: {
    id: string; // character definitionId
    mods: CompactMod[];
  }[];
}

export interface DbLookups {
    stats: LookupTable<{ name: string; isPercentage: boolean }>;
    sets: LookupTable<{ name: string; bonus: string }>;
    shapes: LookupTable<{ name: string; formalName: string }>;
    rarities: LookupTable<{ name: string }>;
}


// --- Service Implementation ---

/**
 * Formats a raw stat value from the API into a display-friendly number.
 * @param statId The ID of the stat.
 * @param decimalValue The raw value from `statValueDecimal`.
 * @param lookups The database lookups containing stat metadata.
 * @returns A formatted number (e.g., 8.5 for 8.5% or 25 for Speed).
 */
function formatStatValue(statId: number, decimalValue: number, lookups: DbLookups): number {
  const realValue = Number(decimalValue) / 10000;
  const statInfo = lookups.stats[statId];

  if (statInfo && statInfo.isPercentage) {
    // For percentage stats, convert to a percentage number (e.g., 0.085 -> 8.5)
    // Round to 3 decimal places to handle floating point inaccuracies.
    return Math.round(realValue * 100 * 1000) / 1000;
  }

  // For flat stats, return the integer value
  return Math.floor(realValue);
}


/**
 * Fetches and processes a player's mod data into a display-ready format.
 * @param allyCode The player's ally code.
 * @returns The player's structured data, or null if an error occurs.
 */
export async function getPlayerData(allyCode: string): Promise<HydratedPlayerData | null> {
  const [rawPlayerData, dbLookups] = await Promise.all([
    fetchPlayer(allyCode),
    getDbLookups()
  ]);

  if (!rawPlayerData) {
    return null;
  }

  const rosterUnit: HydratedPlayerData['rosterUnit'] = rawPlayerData.rosterUnit.map(unit => {
    const characterId = unit.definitionId;
    const mods: CompactMod[] = unit.equippedStatMod?.map((mod: Mod) => ({
      id: mod.id,
      d: mod.definitionId,
      l: mod.level,
      t: mod.tier,
      c: characterId,
      p: {
        i: mod.primaryStat.stat.unitStatId,
        v: formatStatValue(mod.primaryStat.stat.unitStatId, mod.primaryStat.stat.statValueDecimal, dbLookups),
      },
      s: mod.secondaryStat.map((stat: SecondaryStat) => ({
        i: stat.stat.unitStatId,
        v: formatStatValue(stat.stat.unitStatId, stat.stat.statValueDecimal, dbLookups),
        r: stat.statRolls,
      })),
    })) || [];

    return {
      id: unit.definitionId,
      mods,
    };
  });

  return {
    playerName: rawPlayerData.name,
    allyCode: rawPlayerData.allyCode,
    lastUpdated: new Date().toISOString(), // Placeholder
    rosterUnit,
  };
}

/**
 * Fetches the static game data needed for lookups.
 * @returns An object containing all static game data.
 */
export async function getDbLookups(): Promise<DbLookups> {
    const [dbStats, dbSets, dbShapes, dbRarities] = await Promise.all([
        prisma.stat.findMany(),
        prisma.modSet.findMany(),
        prisma.modShape.findMany(),
        prisma.modRarity.findMany(),
    ]);

    const dbLookups: DbLookups = {
        stats: Object.fromEntries(dbStats.map(s => [s.id, { name: s.name, isPercentage: s.is_percentage }])),
        sets: Object.fromEntries(dbSets.map(s => [s.id, { name: s.name, bonus: s.bonus_description }])),
        shapes: Object.fromEntries(dbShapes.map(s => [s.id, { name: s.name, formalName: s.formal_name }])),
        rarities: Object.fromEntries(dbRarities.map(r => [r.dot_value, { name: r.dot_value.toString() }])),
    };

    return dbLookups;
}
