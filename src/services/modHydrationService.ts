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
 * Fetches and processes a player's mod data into a display-ready format.
 * @param allyCode The player's ally code.
 * @returns The player's structured data, or null if an error occurs.
 */
export async function getPlayerData(allyCode: string): Promise<HydratedPlayerData | null> {
  const rawPlayerData = await fetchPlayer(allyCode);
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
        v: mod.primaryStat.stat.statValueDecimal,
      },
      s: mod.secondaryStat.map((stat: SecondaryStat) => ({
        i: stat.stat.unitStatId,
        v: stat.stat.statValueDecimal,
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
