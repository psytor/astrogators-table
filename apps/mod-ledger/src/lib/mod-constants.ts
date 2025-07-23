// --- Data extracted from Temp/ModCard.jsx ---

// 1. Lookup Maps
export const MOD_SETS: { [key: number]: string } = {
  1: "Health", 2: "Offense", 3: "Defense", 4: "Speed",
  5: "Critical Chance", 6: "Critical Damage", 7: "Potency", 8: "Tenacity"
};

export const MOD_SLOTS: { [key: number]: string } = {
  1: "Square", 2: "Arrow", 3: "Diamond",
  4: "Triangle", 5: "Circle", 6: "Cross"
};

export const MOD_TIER_COLORS: { [key: number]: string } = {
  1: "Grey", 2: "Green", 3: "Blue", 4: "Purple", 5: "Gold"
};

export const MOD_TIER_NAMES: { [key: number]: string } = {
  1: "E", 2: "D", 3: "C", 4: "B", 5: "A"
};

export const STAT_NAMES: Record<number, string> = {
  1: 'Health', 5: 'Speed', 16: 'Crit Damage %', 17: 'Potency %', 18: 'Tenacity %',
  28: 'Protection', 41: 'Offense', 42: 'Defense', 48: 'Offense %', 49: 'Defense %',
  52: 'Accuracy %', 53: 'Crit Chance %', 54: 'Crit Avoidance %', 55: 'Health %', 56: 'Protection %'
};

// 2. Sprite Coordinate Data
export const MOD_SHAPE_SPRITES: Record<string, any> = {
  "Square":   { x: 696, y: 117, w: 79, h: 77 },
  "Arrow":    { x: 696, y: 195, w: 79, h: 77 },
  "Diamond":  { x: 696, y: 433, w: 79, h: 79 },
  "Triangle": { x: 854, y: 212, w: 78, h: 64 },
  "Circle":   { x: 775, y: 354, w: 79, h: 78 },
  "Cross":    { x: 729, y: 37,  w: 76, h: 79 }
};

export const MOD_SHAPE_SPRITES_5DOT: Record<ModShape, any> = {
  "Square":   { "Main": { "x": 696, "y": 117, "w": 79, "h": 77 }, "Inner": { "x": 647, "y": 31, "w": 80, "h": 80 } },
  "Arrow":    { "Main": { "x": 696, "y": 195, "w": 79, "h": 77 }, "Inner": { "x": 566, "y": 31, "w": 80, "h": 80 } },
  "Diamond":  { "Main": { "x": 696, "y": 433, "w": 79, "h": 79 }, "Inner": { "x": 161, "y": 31, "w": 80, "h": 80 } },
  "Triangle": { "Main": { "x": 854, "y": 212, "w": 78, "h": 64 }, "Inner": { "x": 851, "y": 130, "w": 81, "h": 67 } },
  "Circle":   { "Main": { "x": 775, "y": 354, "w": 79, "h": 78 }, "Inner": { "x": 404, "y": 31, "w": 80, "h": 80 } },
  "Cross":    { "Main": { "x": 729, "y": 37,  "w": 76, "h": 79 }, "Inner": { "x": 696, "y": 352, "w": 78, "h": 80 } }
};

export const MOD_SHAPE_SPRITES_6DOT: Record<ModShape, any> = {
  "Square":   { "Main": { "x": 852, "y": 279, "w": 78, "h": 75 }, "Inner": { "x": 647, "y": 31, "w": 80, "h": 80 } },
  "Arrow":    { "Main": { "x": 776, "y": 198, "w": 77, "h": 76 }, "Inner": { "x": 566, "y": 31, "w": 80, "h": 80 } },
  "Diamond":  { "Main": { "x": 777, "y": 434, "w": 77, "h": 78 }, "Inner": { "x": 161, "y": 31, "w": 80, "h": 80 } },
  "Triangle": { "Main": { "x": 887, "y": 66,  "w": 76, "h": 63 }, "Inner": { "x": 851, "y": 130, "w": 81, "h": 67 } },
  "Circle":   { "Main": { "x": 696, "y": 273, "w": 78, "h": 78 }, "Inner": { "x": 404, "y": 31, "w": 80, "h": 80 } },
  "Cross":    { "Main": { "x": 776, "y": 275, "w": 76, "h": 78 }, "Inner": { "x": 696, "y": 352, "w": 78, "h": 80 } }
};

export const MOD_SET_SPRITES: Record<string, any> = {
  "Critical Chance": { x: 1265, y: 358, w: 120, h: 120 },
  "Critical Damage": { x: 1195, y: 992, w: 120, h: 120 },
  "Defense": { x: 1250, y: 1255, w: 120, h: 120 },
  "Health": { x: 1278, y: 1128, w: 120, h: 120 },
  "Offense": { x: 1408, y: 1126, w: 120, h: 120 },
  "Potency": { x: 1143, y: 1117, w: 120, h: 120 },
  "Speed": { x: 1107, y: 747, w: 120, h: 120 },
  "Tenacity": { x: 1288, y: 1385, w: 120, h: 120 }
};


// 3. Layout Configuration for Set Icons
export const SET_ICON_LAYOUT_CONFIG: Record<ModShape, Record<ModSet, any>> = {
  "Square": {
    "Critical Chance": { "size": 31, "offsetX": 34, "offsetY": 16 },
    "Critical Damage": { "size": 31, "offsetX": 34, "offsetY": 16 },
    "Defense": { "size": 31, "offsetX": 34, "offsetY": 16 },
    "Health": { "size": 30, "offsetX": 35, "offsetY": 19 },
    "Offense": { "size": 30, "offsetX": 34, "offsetY": 17 },
    "Potency": { "size": 29, "offsetX": 35, "offsetY": 18 },
    "Speed": { "size": 29, "offsetX": 36, "offsetY": 17 },
    "Tenacity": { "size": 26, "offsetX": 37, "offsetY": 20 }
  },
  "Arrow": {
    "Critical Chance": { "size": 24, "offsetX": 40, "offsetY": 17 },
    "Critical Damage": { "size": 24, "offsetX": 40, "offsetY": 17 },
    "Defense": { "size": 24, "offsetX": 41, "offsetY": 17 },
    "Health": { "size": 21, "offsetX": 44, "offsetY": 17 },
    "Offense": { "size": 23, "offsetX": 41, "offsetY": 17 },
    "Potency": { "size": 23, "offsetX": 41, "offsetY": 18 },
    "Speed": { "size": 22, "offsetX": 42, "offsetY": 17 },
    "Tenacity": { "size": 21, "offsetX": 42, "offsetY": 18 }
  },
  "Diamond": {
    "Critical Chance": { "size": 28, "offsetX": 26, "offsetY": 25 },
    "Critical Damage": { "size": 28, "offsetX": 26, "offsetY": 25 },
    "Offense": { "size": 27, "offsetX": 27, "offsetY": 26 },
    "Defense": { "size": 25, "offsetX": 28, "offsetY": 26 },
    "Health": { "size": 26, "offsetX": 28, "offsetY": 26 },
    "Potency": { "size": 28, "offsetX": 26, "offsetY": 25 },
    "Speed": { "size": 26, "offsetX": 27, "offsetY": 26 },
    "Tenacity": { "size": 25, "offsetX": 28, "offsetY": 25 }
  },
  "Triangle": {
    "Critical Chance": { "size": 22, "offsetX": 29, "offsetY": 35 },
    "Critical Damage": { "size": 22, "offsetX": 29, "offsetY": 36 },
    "Offense": { "size": 21, "offsetX": 30, "offsetY": 36 },
    "Defense": { "size": 22, "offsetX": 30, "offsetY": 34 },
    "Health": { "size": 20, "offsetX": 31, "offsetY": 36 },
    "Potency": { "size": 22, "offsetX": 30, "offsetY": 34 },
    "Speed": { "size": 20, "offsetX": 29, "offsetY": 35 },
    "Tenacity": { "size": 20, "offsetX": 31, "offsetY": 36 }
  },
  "Circle": {
    "Critical Chance": { "size": 27, "offsetX": 27, "offsetY": 27 },
    "Critical Damage": { "size": 27, "offsetX": 27, "offsetY": 27 },
    "Offense": { "size": 27, "offsetX": 27, "offsetY": 27 },
    "Defense": { "size": 26, "offsetX": 28, "offsetY": 26 },
    "Health": { "size": 25, "offsetX": 29, "offsetY": 29 },
    "Potency": { "size": 28, "offsetX": 26, "offsetY": 26 },
    "Speed": { "size": 24, "offsetX": 28, "offsetY": 27 },
    "Tenacity": { "size": 24, "offsetX": 30, "offsetY": 28 }
  },
  "Cross": {
    "Critical Chance": { "size": 23, "offsetX": 27, "offsetY": 28 },
    "Critical Damage": { "size": 23, "offsetX": 27, "offsetY": 28 },
    "Offense": { "size": 22, "offsetX": 28, "offsetY": 29 },
    "Defense": { "size": 23, "offsetX": 29, "offsetY": 28 },
    "Health": { "size": 21, "offsetX": 31, "offsetY": 29 },
    "Potency": { "size": 25, "offsetX": 27, "offsetY": 27 },
    "Speed": { "size": 22, "offsetX": 28, "offsetY": 28 },
    "Tenacity": { "size": 21, "offsetX": 29, "offsetY": 29 }
  }
};

export type ModShape = typeof MOD_SLOTS[keyof typeof MOD_SLOTS];
export type ModSet = typeof MOD_SETS[keyof typeof MOD_SETS];