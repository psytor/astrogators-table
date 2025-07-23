// src/config/evaluationWorkflows.ts
import { type Workflows } from '@/lib/types/workflows';

export const EVALUATION_WORKFLOWS: Workflows = {
  "beginner_speed_focus": {
    name: "Beginner: Speed Focus",
    description: "A balanced approach to finding mods with high speed secondaries.",
    "dot_1-4":{
      "grey": {
        "level_1": [
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL"},
            "onFail": { "action": "ERROR", "result": "ERROR"}
          }
        ],
        "green": {
          "level_1": [
            {
              "check": "defaultRule",
              "onPass": { "action": "STOP", "result": "SELL"},
              "onFail": { "action": "ERROR", "result": "ERROR"}
            }
          ]
        },
        "blue": {
          "level_1": [
            {
              "check": "defaultRule",
              "onPass": { "action": "STOP", "result": "SELL"},
              "onFail": { "action": "ERROR", "result": "ERROR"}
            }
          ]
        },
        "purple": {
          "level_1": [
            {
              "check": "defaultRule",
              "onPass": { "action": "STOP", "result": "SELL"},
              "onFail": { "action": "ERROR", "result": "ERROR"}
            }
          ]
        },
        "gold": {
          "level_1": [
            {
              "check": "defaultRule",
              "onPass": { "action": "STOP", "result": "SELL"},
              "onFail": { "action": "ERROR", "result": "ERROR"}
            }
          ]
        }
      },
    },
    "dot_5": {
      "grey": {
        "level_1": [
          {
            "check": "isArrowPrimSpeed",
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
            "check": "isArrowPrimSpeed",
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
        ],
        "level_15": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "any": true },
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ]
      },
      "green": {
        "level_1": [
          {
            "check": "isArrowPrimSpeed",
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
            "check": "isArrowPrimSpeed",
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
        ],
        "level_15": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 5 },
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "any": true },
            "onPass": { "action": "STOP", "result": "KEEP" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ]
      },
      "blue": {
        "level_1": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "LVL_6" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ],
        "level_6":[
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "LVL_15"},
            "onFail": { "action": "CONTINUE"}
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "any": true },
            "onPass": { "action": "STOP", "result": "LVL_12" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ],
        "level_12": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 6 },
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ],
        "level_15": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 8 },
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 6 },
            "onPass": { "action": "STOP", "result": "KEEP" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ]
      },
"purple": {
        "level_1": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "LVL_3" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ],
        "level_3":[
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "LVL_15"},
            "onFail": { "action": "CONTINUE"}
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "any": true },
            "onPass": { "action": "STOP", "result": "LVL_12" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ],
        "level_12": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 6 },
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ],
        "level_15": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 10 },
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 6 },
            "onPass": { "action": "STOP", "result": "KEEP" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ]
      },
"gold": {
        "level_1": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "any": true },
            "onPass": { "action": "STOP", "result": "LVL_12" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ],
        "level_12": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 8 },
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ],
        "level_15": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 12 },
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 8 },
            "onPass": { "action": "STOP", "result": "KEEP" },
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
    // We will add dot_1-4 and dot_6 later
  },
  "beginner_speed_economy": {
    name: "Beginner: Speed Economy",
    description: "A budget-friendly approach to finding speed, selling more mods to save credits.",
    "dot_1-4":{
      "grey": {
        "level_1": [
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL"},
            "onFail": { "action": "ERROR", "result": "ERROR"}
          }
        ],
        "green": {
          "level_1": [
            {
              "check": "defaultRule",
              "onPass": { "action": "STOP", "result": "SELL"},
              "onFail": { "action": "ERROR", "result": "ERROR"}
            }
          ]
        },
        "blue": {
          "level_1": [
            {
              "check": "defaultRule",
              "onPass": { "action": "STOP", "result": "SELL"},
              "onFail": { "action": "ERROR", "result": "ERROR"}
            }
          ]
        },
        "purple": {
          "level_1": [
            {
              "check": "defaultRule",
              "onPass": { "action": "STOP", "result": "SELL"},
              "onFail": { "action": "ERROR", "result": "ERROR"}
            }
          ]
        },
        "gold": {
          "level_1": [
            {
              "check": "defaultRule",
              "onPass": { "action": "STOP", "result": "SELL"},
              "onFail": { "action": "ERROR", "result": "ERROR"}
            }
          ]
        }
      },
    },
    "dot_5": {
      "grey": {
        "level_1": [
          {
            "check": "isArrowPrimSpeed",
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
            "check": "isArrowPrimSpeed",
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
        ],
        "level_15": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "any": true },
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ]
      },
      "green": {
        "level_1": [
          {
            "check": "isArrowPrimSpeed",
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
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 5 },
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ],
        "level_15": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 6 },
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 5 },
            "onPass": { "action": "STOP", "result": "KEEP" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ]
      },
      "blue": {
        "level_1": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "LVL_6" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ],
        "level_6":[
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "LVL_15"},
            "onFail": { "action": "CONTINUE"}
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "any": true },
            "onPass": { "action": "STOP", "result": "LVL_12" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ],
        "level_12": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 8 },
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ],
        "level_15": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 10 },
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 8 },
            "onPass": { "action": "STOP", "result": "KEEP" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ]
      },
      "purple": {
        "level_1": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "LVL_3" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ],
        "level_3":[
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "LVL_15"},
            "onFail": { "action": "CONTINUE"}
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "any": true },
            "onPass": { "action": "STOP", "result": "LVL_12" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ],
        "level_12": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 10 },
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ],
        "level_15": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 12 },
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 10 },
            "onPass": { "action": "STOP", "result": "KEEP" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ]
      },
      "gold": {
        "level_1": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "any": true },
            "onPass": { "action": "STOP", "result": "LVL_12" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ],
        "level_12": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 12 },
            "onPass": { "action": "STOP", "result": "LVL_15" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "defaultRule",
            "onPass": { "action": "STOP", "result": "SELL" },
            "onFail": { "action": "ERROR", "result": "ERROR" }
          }
        ],
        "level_15": [
          {
            "check": "isArrowPrimSpeed",
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 14 },
            "onPass": { "action": "STOP", "result": "SLICE" },
            "onFail": { "action": "CONTINUE" }
          },
          {
            "check": "statThreshold",
            "params": { "stat": "Speed", "min": 12 },
            "onPass": { "action": "STOP", "result": "KEEP" },
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
    // We will add dot_6 later
  }
};

export const RESULT_CODES = {
  "KEEP": { verdict: "keep", text: "Keep", className: "keep", colorVar: "var(--verdict-keep)", colorBgVar: "var(--verdict-keep-bg)" },
  "SELL": { verdict: "sell", text: "Sell", className: "sell", colorVar: "var(--verdict-sell)", colorBgVar: "var(--verdict-sell-bg)" },
  "SLICE": { verdict: "slice", text: "Slice", className: "slice", colorVar: "var(--verdict-slice)", colorBgVar: "var(--verdict-slice-bg)" },
  "LVL_6": { verdict: "level", text: "Level to 6", className: "level", colorVar: "var(--verdict-level)", colorBgVar: "var(--verdict-level-bg)" },
  "LVL_9": { verdict: "level", text: "Level to 9", className: "level", colorVar: "var(--verdict-level)", colorBgVar: "var(--verdict-level-bg)" },
  "LVL_12": { verdict: "level", text: "Level to 12", className: "level", colorVar: "var(--verdict-level)", colorBgVar: "var(--verdict-level-bg)" },
  "LVL_15": { verdict: "level", text: "Level to 15", className: "level", colorVar: "var(--verdict-level)", colorBgVar: "var(--verdict-level-bg)" },
  "ERROR": { verdict: "error", text: "Error", className: "sell", colorVar: "var(--verdict-error)", colorBgVar: "var(--verdict-error-bg)" }
};
