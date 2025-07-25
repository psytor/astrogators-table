// src/services/modWorkflowService.ts

import { HydratedPlayerData } from '@/backend/services/modHydrationService';
import { EVALUATION_WORKFLOWS, RESULT_CODES } from '@/frontend/config/evaluationWorkflows';
import * as ruleFunctions from './modRuleFunctions';
import { RULE_DESCRIPTIONS } from '@/frontend/config/ruleDescriptions';

type CompactMod = HydratedPlayerData['rosterUnit'][0]['mods'][0];
type RuleFunction = (mod: CompactMod, params?: any) => boolean | null;

/**
 * Describes a single step in the evaluation process for tracing.
 */
export interface EvaluationStep {
  stepId: number;
  rule: string;
  params?: any;
  outcome: 'Pass' | 'Fail' | 'Skip';
  result: string;
  description: string;
}

/**
 * Encapsulates the final result and the execution trace of a workflow.
 */
export interface WorkflowResult {
  resultCode: string;
  trace: EvaluationStep[];
}

/**
 * Finds and executes the correct evaluation workflow for a given mod.
 * @param mod The mod to evaluate.
 * @param profileName The name of the evaluation profile to use.
 * @returns A WorkflowResult object containing the final result code and the execution trace.
 */
export function executeWorkflow(mod: CompactMod, profileName: string): WorkflowResult {
  const trace: EvaluationStep[] = [];
  let stepCounter = 1;

  console.debug(`Executing workflow "${profileName}" for mod ${mod.id}`);

  const profile = EVALUATION_WORKFLOWS[profileName];
  if (!profile) {
    const errorMsg = `Evaluation profile "${profileName}" not found.`;
    console.error(errorMsg);
    return {
      resultCode: "ERROR",
      trace: [{ stepId: stepCounter, rule: 'Setup', outcome: 'Fail', result: 'ERROR', description: errorMsg }]
    };
  }

  const rarity = parseInt(mod.d.charAt(1), 10);
  let rarityKey: string;

  if (rarity >= 1 && rarity <= 4) {
    rarityKey = "dot_1-4";
  } else {
    rarityKey = `dot_${rarity}`;
  }
  const tier = mod.t;
  const level = mod.l;

  const tierMap: { [key: number]: string } = { 1: 'grey', 2: 'green', 3: 'blue', 4: 'purple', 5: 'gold' };
  const colorKey = tierMap[tier];

  console.debug(`Mod properties - RarityKey: ${rarityKey}, Color: ${colorKey}, Level: ${level}`);

  const levelChecksForColor = profile[rarityKey]?.[colorKey];

  if (!levelChecksForColor) {
    const errorMsg = `No workflow found for Rarity: ${rarityKey}, Color: ${colorKey}.`;
    console.warn(errorMsg);
    return {
      resultCode: "ERROR",
      trace: [{ stepId: stepCounter, rule: 'Setup', outcome: 'Fail', result: 'ERROR', description: errorMsg }]
    };
  }

  const availableLevels = Object.keys(levelChecksForColor)
    .map(key => parseInt(key.replace('level_', ''), 10))
    .sort((a, b) => a - b);

  const applicableLevel = availableLevels.reduce((bestFit, currentLevel) => {
    return currentLevel <= level ? currentLevel : bestFit;
  }, -1);

  if (applicableLevel === -1) {
    const errorMsg = `No applicable level found for mod at level ${level}.`;
    console.warn(errorMsg);
    return {
      resultCode: "ERROR",
      trace: [{ stepId: stepCounter, rule: 'Setup', outcome: 'Fail', result: 'ERROR', description: errorMsg }]
    };
  }

  const levelKey = `level_${applicableLevel}`;
  const checks = levelChecksForColor[levelKey];
  console.debug(`Using checks from level key: ${levelKey}`);

  if (!checks) {
    const errorMsg = `Could not retrieve checks for determined level key: ${levelKey}.`;
    console.error(errorMsg);
    return {
      resultCode: "ERROR",
      trace: [{ stepId: stepCounter, rule: 'Setup', outcome: 'Fail', result: 'ERROR', description: errorMsg }]
    };
  }

  for (const check of checks) {
    const checkName = check.check as keyof typeof ruleFunctions;
    const ruleFunc = ruleFunctions[checkName] as RuleFunction;
    if (!ruleFunc) {
      const errorMsg = `Rule function "${check.check}" not found in library.`;
      console.error(errorMsg);
      trace.push({ stepId: stepCounter++, rule: check.check, outcome: 'Fail', result: 'ERROR', description: errorMsg });
      return { resultCode: "ERROR", trace };
    }

    console.debug(`Executing rule: ${check.check} with params: ${JSON.stringify(check.params)}`);
    const result = ruleFunc(mod, check.params);

    // If the rule is not applicable, skip it and continue to the next check.
    if (result === null) {
      console.debug(`Rule ${check.check} was not applicable. Skipping.`);
      trace.push({
        stepId: stepCounter++,
        rule: check.check,
        params: check.params,
        outcome: 'Skip',
        result: 'N/A',
        description: `Rule was not applicable to this mod.`
      });
      continue;
    }

    const passed = result;
    const outcome = passed ? 'Pass' : 'Fail';
    const directive = passed ? check.onPass : check.onFail;
    const description = generateStepDescription(check.check, check.params);
    console.debug(`Rule ${check.check} outcome: ${outcome}. Directive: ${directive.action}, Result: ${directive.result}`);

    trace.push({
      stepId: stepCounter++,
      rule: check.check,
      params: check.params,
      outcome,
      result: directive.result,
      description
    });

    if (directive.action === 'STOP' || directive.action === 'ERROR') {
      if (directive.action === 'ERROR') {
        console.error(`Explicit ERROR state reached in workflow: ${directive.result}`);
      }
      console.debug(`Workflow for mod ${mod.id} finished with result: ${directive.result}`);
      return { resultCode: directive.result, trace };
    }
  }

  const finalErrorMsg = 'Workflow completed without a "STOP" or "ERROR" action.';
  console.error(finalErrorMsg);
  trace.push({ stepId: stepCounter, rule: 'End of Workflow', outcome: 'Fail', result: 'ERROR', description: finalErrorMsg });
  return { resultCode: "ERROR", trace };
}

/**
 * Generates a human-readable description for an evaluation step.
 * @param rule The name of the rule function.
 * @param params The parameters used by the rule.
 * @returns A descriptive string.
 */
function generateStepDescription(rule: string, params: any): string {
  const descriptionBuilder = RULE_DESCRIPTIONS[rule];
  if (descriptionBuilder) {
    return descriptionBuilder(params);
  }

  let description = `Rule '${rule}'`;
  if (params) {
    description += ` with params ${JSON.stringify(params)}`;
  }
  return description;
}