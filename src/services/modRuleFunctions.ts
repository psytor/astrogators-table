// src/services/modRuleFunctions.ts

import { HydratedPlayerData } from './modHydrationService';

type CompactMod = HydratedPlayerData['rosterUnit'][0]['mods'][0];

// --- Type definition for a Rule Function ---
export type RuleFunction = (mod: CompactMod, params?: any) => boolean;

// --- Library of Rule Functions ---

/**
 * Checks if a mod is an Arrow with Speed as its primary stat.
 * @param mod The mod to check.
 * @returns True if the mod is a Speed Arrow, false otherwise.
 */
export const isSpeedArrow: RuleFunction = (mod) => {
  const shapeId = parseInt(mod.d.charAt(2), 10);
  const primaryStatId = mod.p.i;

  // Shape ID 2 is Arrow, Stat ID 5 is Speed
  return shapeId === 2 && primaryStatId === 5;
};

/**
 * Checks if a mod's secondary stat meets a certain threshold.
 * @param mod The mod to check.
 * @param params An object with `stat` (name), and optionally `any` (boolean) or `min` (number).
 * @returns True if the condition is met, false otherwise.
 */
export const statThreshold: RuleFunction = (mod, params) => {
  if (!params || !params.stat) {
    console.warn('statThreshold check called without a stat parameter.');
    return false;
  }

  // This is a placeholder for now. We will need to look up the stat ID from the name.
  // For now, we will hardcode Speed (ID 5).
  const targetStatId = 5; // Placeholder for "Speed"

  const targetStat = mod.s.find(stat => stat.i === targetStatId);

  if (!targetStat) {
    return false; // Mod does not have the stat we're looking for.
  }

  // Case 1: Check for existence only
  if (params.any === true) {
    return true; // The stat exists.
  }

  // Case 2: Check for a minimum value
  if (params.min !== undefined) {
    return (targetStat.v || 0) >= params.min;
  }

  console.warn('statThreshold check called with invalid parameters.');
  return false;
};

/**
 * A catch-all rule that always passes.
 * @returns Always returns true.
 */
export const defaultRule: RuleFunction = () => {
  return true;
};
