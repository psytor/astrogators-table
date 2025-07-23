import { PlayerData, fetchPlayer, Mod, SecondaryStat } from './swgohComlinkService';
import prisma, { Stat, ModSet, ModShape, ModRarity } from '@astrogators-table/database';

// --- Type definitions for our final API response ---

interface CompactStat {
  i: number; // statId
  v: number; // value
  r?: number; // rolls (only for secondary stats)
  e?: number; // efficiency (only for secondary stats)
  rv?: number[]; // roll values (only for secondary stats)
  re?: number[]; // roll efficiencies (only for secondary stats)
}

export interface CompactMod {
  id: string;
  d: string; // definitionId
  l: number; // level
  t: number; // tier
  c: string; // characterId
  p: CompactStat;
  s: CompactStat[];
  oe: number; // overall efficiency
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
    statRollInfo: {
        stat: { name: string };
        rarity_id: number;
        min_roll: number;
        max_roll: number;
    }[];
}


// --- Service Implementation ---

/**
 * Calculates the overall efficiency of a mod based on its secondary stats.
 * @param secondaryStats An array of compact secondary stats.
 * @returns The average efficiency of all secondary stats.
 */
function calculateOverallModEfficiency(secondaryStats: CompactStat[]): number {
  if (!secondaryStats || secondaryStats.length === 0) {
    return 0;
  }

  const totalEfficiency = secondaryStats.reduce((sum, stat) => sum + (stat.e || 0), 0);
  return totalEfficiency / secondaryStats.length;
}

/**
 * Calculates the average roll efficiency for a single secondary stat.
 * @param stat The secondary stat object from the comlink response.
 * @returns The average efficiency as a percentage (0-100), or 0 if data is missing.
 */
function calculateStatEfficiency(stat: SecondaryStat): { average: number; rolls: number[] } {
  const { unscaledRollValue, statRollerBoundsMin, statRollerBoundsMax } = stat;

  if (!unscaledRollValue || !statRollerBoundsMin || !statRollerBoundsMax || unscaledRollValue.length === 0) {
    return { average: 0, rolls: [] };
  }

  const minBound = parseInt(statRollerBoundsMin, 10);
  const maxBound = parseInt(statRollerBoundsMax, 10);
  const range = maxBound - minBound;

  if (range < 0) {
    return { average: 0, rolls: [] }; // Invalid bounds
  }

  const rollEfficiencies: number[] = [];
  let totalEfficiency = 0;

  unscaledRollValue.forEach(rollStr => {
    const rollValue = parseInt(rollStr, 10);
    // The formula is ((value - min + 1) / (max - min + 1)) * 100
    // This distributes the efficiency evenly across the possible roll values.
    const efficiency = ((rollValue - minBound + 1) / (range + 1)) * 100;
    rollEfficiencies.push(efficiency);
    totalEfficiency += efficiency;
  });

  const averageEfficiency = totalEfficiency / unscaledRollValue.length;
  return { average: averageEfficiency, rolls: rollEfficiencies };
}


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
    const mods: CompactMod[] = unit.equippedStatMod?.map((mod: Mod) => {
      const secondaryStats = mod.secondaryStat.map((stat: SecondaryStat) => {
        const efficiencyData = calculateStatEfficiency(stat);
        return {
          i: stat.stat.unitStatId,
          v: formatStatValue(stat.stat.unitStatId, stat.stat.statValueDecimal, dbLookups),
          r: stat.statRolls,
          e: efficiencyData.average,
          rv: stat.unscaledRollValue?.map(v => parseInt(v, 10)) || [],
          re: efficiencyData.rolls,
        };
      });

      return {
        id: mod.id,
        d: mod.definitionId,
        l: mod.level,
        t: mod.tier,
        c: characterId,
        p: {
          i: mod.primaryStat.stat.unitStatId,
          v: formatStatValue(mod.primaryStat.stat.unitStatId, mod.primaryStat.stat.statValueDecimal, dbLookups),
        },
        s: secondaryStats,
        oe: calculateOverallModEfficiency(secondaryStats),
      };
    }) || [];

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
    const [dbStats, dbSets, dbShapes, dbRarities, dbStatRollInfo] = await Promise.all([
        prisma.stat.findMany(),
        prisma.modSet.findMany(),
        prisma.modShape.findMany(),
        prisma.modRarity.findMany(),
        prisma.statRollInfo.findMany({
            select: {
                stat: { select: { name: true } },
                rarity_id: true,
                min_roll: true,
                max_roll: true,
            }
        }),
    ]);

    const dbLookups: DbLookups = {
        stats: Object.fromEntries(dbStats.map((s: Stat) => [s.id, { name: s.name, isPercentage: s.is_percentage }])),
        sets: Object.fromEntries(dbSets.map((s: ModSet) => [s.id, { name: s.name, bonus: s.bonus_description }])),
        shapes: Object.fromEntries(dbShapes.map((s: ModShape) => [s.id, { name: s.name, formalName: s.formal_name }])),
        rarities: Object.fromEntries(dbRarities.map((r: ModRarity) => [r.dot_value, { name: r.dot_value.toString() }])),
        statRollInfo: dbStatRollInfo,
    };

    return dbLookups;
}