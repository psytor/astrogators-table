// src/components/CollectionEfficiencyDisplay.tsx
'use client';

import styles from './CollectionEfficiencyDisplay.module.css';

interface Breakdown {
  total: number;
  count: number;
  average: number;
}

interface CollectionStats {
  average: number;
  count: number;
  breakdown: {
    keep: Breakdown;
    sell: Breakdown;
    slice: Breakdown;
    level: Breakdown;
  };
}

interface ModStats {
  keep: number;
  sell: number;
  slice: number;
  level: number;
}

interface CollectionEfficiencyDisplayProps {
  collectionStats: CollectionStats;
  modStats: ModStats;
}

export default function CollectionEfficiencyDisplay({ collectionStats, modStats }: CollectionEfficiencyDisplayProps) {
  return (
    <div className={styles.collectionEfficiency}>
      <div className={styles.collectionOverall}>
        <span className={styles.efficiencyLabel}>Collection Average:</span>
        <span className={styles.efficiencyValue}>{collectionStats.average.toFixed(1)}%</span>
      </div>

      <div className={styles.collectionBreakdown}>
        {modStats.keep > 0 && (
          <div className={`${styles.breakdownItem} ${styles.breakdownKeep}`}>
            <span className={styles.breakdownLabel}>Keep: {modStats.keep}</span>
            <span className={styles.breakdownSeparator}>-</span>
            <span className={styles.breakdownValue}>{collectionStats.breakdown.keep?.average.toFixed(1) || '0.0'}%</span>
          </div>
        )}
        {modStats.sell > 0 && (
          <div className={`${styles.breakdownItem} ${styles.breakdownSell}`}>
            <span className={styles.breakdownLabel}>Sell: {modStats.sell}</span>
            <span className={styles.breakdownSeparator}>-</span>
            <span className={styles.breakdownValue}>{collectionStats.breakdown.sell?.average.toFixed(1) || '0.0'}%</span>
          </div>
        )}
        {modStats.slice > 0 && (
          <div className={`${styles.breakdownItem} ${styles.breakdownSlice}`}>
            <span className={styles.breakdownLabel}>Slice: {modStats.slice}</span>
            <span className={styles.breakdownSeparator}>-</span>
            <span className={styles.breakdownValue}>{collectionStats.breakdown.slice?.average.toFixed(1) || '0.0'}%</span>
          </div>
        )}
        {modStats.level > 0 && (
          <div className={`${styles.breakdownItem} ${styles.breakdownLevel}`}>
            <span className={styles.breakdownLabel}>Level: {modStats.level}</span>
            <span className={styles.breakdownSeparator}>-</span>
            <span className={styles.breakdownValue}>{collectionStats.breakdown.level?.average.toFixed(1) || '0.0'}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
