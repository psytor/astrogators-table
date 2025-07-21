// src/config/ruleDescriptions.ts

export const RULE_DESCRIPTIONS: { [key: string]: (params: any) => string } = {
  isArrowPrimSpeed: () => 'Primary stat is Speed',
  statThreshold: (params) => {
    if (params.any) {
      return `Has ${params.stat} as a secondary stat`;
    }
    if (params.min && params.max) {
      return `${params.stat} is between ${params.min} and ${params.max}`;
    }
    if (params.min) {
      return `${params.stat} is at least ${params.min}`;
    }
    if (params.max) {
      return `${params.stat} is at most ${params.max}`;
    }
    return `Check for ${params.stat}`;
  },
  defaultRule: () => 'Default condition',
};
