# Mod Evaluation Workflow Guide

This guide explains how to create and configure custom mod evaluation workflows for The Astrogator's Table. The entire evaluation process is controlled by the `src/config/evaluationWorkflows.ts` file, allowing for complex, data-driven logic without changing application code.

---

## 1. Core Concepts

The evaluation engine is a **bidirectional, sequential workflow**. It processes a mod by passing it through a series of ordered checks. Each check can either stop the evaluation with a final result or continue to the next check.

- **Workflow:** A named set of rules for evaluating mods (e.g., "Beginner Speed Chaser").
- **Check:** A single rule object in the workflow that calls a specific `Rule Function`.
- **Rule Function:** A JavaScript function that performs a specific check on a mod (e.g., `isSpeedArrow`).
- **Directive:** An instruction (`onPass` or `onFail`) that tells the engine what to do based on the result of a Rule Function.
- **Action:** The specific action within a directive, either `STOP` or `CONTINUE`.
- **Result:** The final outcome of an evaluation (e.g., `SELL`, `LVL_15`).

---

## 2. Configuration Structure

The main export in `evaluationWorkflows.ts` is the `EVALUATION_WORKFLOWS` object. This object has the following hierarchical structure:

```
[Profile Name] -> [Dot Rarity] -> [Color Tier] -> [Level] -> [Array of Checks]
```

- **Profile Name:** A unique string for the workflow (e.g., `"beginner_speed_chaser"`).
- **Dot Rarity:** The mod's dot/pip count (e.g., `"dot_5"`, `"dot_6"`).
- **Color Tier:** The mod's color (e.g., `"grey"`, `"green"`, `"blue"`).
- **Level:** The mod's current level, written as `"level_X"` (e.g., `"level_1"`, `"level_9"`).

### The Level Fallback System

The engine uses a "fallback" logic for levels. If an exact level match is not found for a mod, the engine will use the rules for the **highest level defined in the configuration that is less than or equal to the mod's actual level**.

**Example:** A Level 6 Grey mod is being evaluated. The config has rules for `level_1` and `level_9`. The engine will use the `level_1` rules.

### The Check Object

Each check in the array is an object with the following properties:

```json
{
  "check": "nameOfRuleFunction",
  "params": { "param1": "value1" }, // Optional
  "onPass": { "action": "STOP", "result": "RESULT_CODE" },
  "onFail": { "action": "CONTINUE" }
}
```

- **`check` (string, required):** The name of the `Rule Function` to execute.
- **`params` (object, optional):** An object of parameters to pass to the rule function.
- **`onPass` (object, required):** The directive to follow if the rule function returns `true`.
- **`onFail` (object, required):** The directive to follow if the rule function returns `false`.

---

## 3. Available Rule Functions

All rule functions are located in `src/services/modRuleFunctions.ts`.

### `isSpeedArrow`

- **Description:** Checks if the mod is an Arrow shape with a Speed primary stat.
- **Parameters:** None.

### `statThreshold`

- **Description:** Checks if a mod has a secondary stat that meets certain criteria.
- **Parameters:**
    - `stat` (string, required): The name of the stat to check (e.g., `"Speed"`).
    - `any` (boolean, optional): If `true`, the check passes if the stat exists at all, regardless of value.
    - `min` (number, optional): The minimum value the stat must have for the check to pass.

### `defaultRule`

- **Description:** A catch-all rule that always passes. It should always be the last check in a sequence to guarantee a result.
- **Parameters:** None.

---

## 4. Example Workflow: Beginner Speed Chaser

This is the full, correct configuration for the `beginner_speed_chaser` profile.

```typescript
// In src/config/evaluationWorkflows.ts

export const EVALUATION_WORKFLOWS = {
  "beginner_speed_chaser": {
    name: "Beginner Speed Chaser",
    description: "A simple workflow that only checks for Speed secondaries.",
    "dot_5": {
      "grey": {
        "level_1": [
          {
            "check": "isSpeedArrow",
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "LVL_9" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ],
        "level_9": [
          {
            "check": "isSpeedArrow",
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "any": true },
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ]
      }
    }
  }
};
```
