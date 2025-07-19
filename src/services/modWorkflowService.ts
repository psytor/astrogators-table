// src/services/modWorkflowService.ts

import { HydratedPlayerData } from './modHydrationService';
import { EVALUATION_WORKFLOWS, RESULT_CODES } from '@/config/evaluationWorkflows';
import * as ruleFunctions from './modRuleFunctions';

type CompactMod = HydratedPlayerData['rosterUnit'][0]['mods'][0];
type RuleFunction = (mod: CompactMod, params?: any) => boolean;

/**
 * Finds and executes the correct evaluation workflow for a given mod.
 * @param mod The mod to evaluate.
 * @param profileName The name of the evaluation profile to use.
 * @returns The final result code (e.g., "KEEP", "SELL", "LVL_15").
 */
export function executeWorkflow(mod: CompactMod, profileName: string): string {
  const profile = EVALUATION_WORKFLOWS[profileName];
  if (!profile) {
    console.error(`Evaluation profile "${profileName}" not found.`);
    return "ERROR";
  }

  const rarity = parseInt(mod.d.charAt(1), 10);
  let rarityKey: string;

  if (rarity >= 1 && rarity <= 4) {
    rarityKey = "dot_1-4";
  } else {
    rarityKey = `dot_${rarity}`;
  }
  const tier = mod.t; // Assuming tier is 1-5 for grey-gold
  const level = mod.l;

  // This is a placeholder for mapping tier to color name
  const tierMap = { 1: 'grey', 2: 'green', 3: 'blue', 4: 'purple', 5: 'gold' };
  const colorKey = tierMap[tier];

  const levelChecksForColor = profile[rarityKey]?.[colorKey];

  if (!levelChecksForColor) {
    console.warn(`No workflow found for ${rarityKey}, ${colorKey}`);
    return "ERROR";
  }

  // Find the correct level key using the fallback logic
  const availableLevels = Object.keys(levelChecksForColor)
    .map(key => parseInt(key.replace('level_', ''), 10))
    .sort((a, b) => a - b);

  const applicableLevel = availableLevels.reduce((bestFit, currentLevel) => {
    return currentLevel <= level ? currentLevel : bestFit;
  }, -1);

  if (applicableLevel === -1) {
    console.warn(`No applicable level found for mod at level ${level}.`);
    return "ERROR";
  }

  const levelKey = `level_${applicableLevel}`;
  const checks = levelChecksForColor[levelKey];

  if (!checks) {
    // This should theoretically not be reached if the logic above is sound
    console.error(`Could not retrieve checks for determined level key: ${levelKey}`);
    return "ERROR";
  }

  for (const check of checks) {
    const ruleFunc = ruleFunctions[check.check] as RuleFunction;
    if (!ruleFunc) {
      console.error(`Rule function "${check.check}" not found in library.`);
      return "ERROR";
    }

    const passed = ruleFunc(mod, check.params);
    const directive = passed ? check.onPass : check.onFail;

    if (directive.action === 'STOP') {
      return directive.result;
    }
    if (directive.action === 'ERROR') {
      console.error('Reached an explicit error state in workflow.');
      return directive.result;
    }
    // If action is 'CONTINUE', we do nothing and the loop proceeds.
  }

  console.error('Workflow completed without a "STOP" action.');
  return "ERROR"; // Should be unreachable if a 'default' check is always last
}
