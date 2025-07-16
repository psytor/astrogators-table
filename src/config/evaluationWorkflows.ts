// src/config/evaluationWorkflows.ts

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
            "check": "default",
            "onPass": { "action": "STOP", "result": "LVL_9" },
            "onFail": { "action": "ERROR", "result": "ERROR" } // Should be unreachable
          }
        ],
        "level_9": [
          {
            "check": "isSpeedArrow",
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "hasStat",
            "params": { "stat": "Speed" },
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "default",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ]
        // We will add level_15 and other colors later
      }
    }
    // We will add dot_1-4 and dot_6 later
  }
};

export const RESULT_CODES = {
  "KEEP": { verdict: "keep", text: "Keep", className: "keep" },
  "SELL": { verdict: "sell", text: "Sell", className: "sell" },
  "SLICE": { verdict: "slice", text: "Slice", className: "slice" },
  "LVL_6": { verdict: "level", text: "Level to 6", className: "level" },
  "LVL_9": { verdict: "level", text: "Level to 9", className: "level" },
  "LVL_12": { verdict: "level", text: "Level to 12", className: "level" },
  "LVL_15": { verdict: "level", text: "Level to 15", className: "level" },
  "ERROR": { verdict: "error", text: "Error", className: "sell" }
};
