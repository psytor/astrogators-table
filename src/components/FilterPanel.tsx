// src/components/FilterPanel.tsx
'use client';

import { useState } from 'react';
import styles from './FilterPanel.module.css';

// These would typically be imported from a central config or context
const MOD_SLOTS = { '1': 'Square', '2': 'Arrow', '3': 'Diamond', '4': 'Triangle', '5': 'Circle', '6': 'Cross' };
const MOD_SETS = { '1': 'Health', '2': 'Offense', '3': 'Defense', '4': 'Speed', '5': 'Crit Chance', '6': 'Crit Damage', '7': 'Potency', '8': 'Tenacity' };
const MOD_TIERS = { '1': 'E', '2': 'D', '3': 'C', '4': 'B', '5': 'A' };
const STAT_NAMES: Record<number, string> = {
  1: 'Health', 5: 'Speed', 16: 'Crit Damage %', 17: 'Potency %', 18: 'Tenacity %',
  28: 'Protection', 41: 'Offense', 42: 'Defense', 48: 'Offense %', 49: 'Defense %',
  52: 'Accuracy %', 53: 'Crit Chance %', 54: 'Crit Avoidance %', 55: 'Health %', 56: 'Protection %'
};

// Placeholder for sprite data - this should be moved to a more appropriate location
const MOD_SHAPE_SPRITES: Record<string, any> = {};
const MOD_SET_SPRITES: Record<string, any> = {};

interface FilterPanelProps {
  // Define props here
}

export default function FilterPanel({}: FilterPanelProps) {
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    slots: [],
    sets: [],
    tiers: [],
    rarities: [],
    primaryStats: [],
    secondaryStats: [],
  });

  const clearAdvancedFilters = () => {
    setAdvancedFilters({
      slots: [],
      sets: [],
      tiers: [],
      rarities: [],
      primaryStats: [],
      secondaryStats: [],
    });
  };

  const activeFilterCount = 0; // Placeholder

  return (
    <>
      <div
        className={`${styles.filterToggleTab} ${filterPanelOpen ? styles.open : ''}`}
        onClick={() => setFilterPanelOpen(!filterPanelOpen)}
      >
        <span>F</span><span>I</span><span>L</span><span>T</span><span>E</span><span>R</span><span>S</span>
        {activeFilterCount > 0 && (
          <div className={styles.filterCountBadge}>{activeFilterCount}</div>
        )}
      </div>

      <div className={`${styles.filterPanel} ${styles.enhanced} ${filterPanelOpen ? styles.open : ''}`}>
        <div className={styles.filterPanelContent}>
          <button
            className={styles.filterPanelClose}
            onClick={() => setFilterPanelOpen(false)}
          >
            ×
          </button>

          <h2 className={styles.filterPanelTitle}>Filters</h2>

          <div className={styles.filterControlsPanel}>
            <div className={styles.advancedFiltersHeader}>
              <h3>Advanced Filters</h3>
              <button
                className={styles.clearAdvancedBtn}
                onClick={clearAdvancedFilters}
                disabled={activeFilterCount === 0}
              >
                Clear
              </button>
            </div>
            {/* Filter sections will be added here */}
          </div>
        </div>
      </div>
    </>
  );
}
