import React from 'react';
import { HydratedPlayerData } from '@/services/modHydrationService';
import { DbLookups } from '@/services/modHydrationService';
import { MOD_SETS, MOD_SLOTS, MOD_TIER_COLORS } from '@/lib/mod-constants';
import styles from './ModDetailModal.module.css';

type CompactMod = HydratedPlayerData['rosterUnit'][0]['mods'][0];

interface ModDetailModalProps {
  mod: CompactMod | null;
  onClose: () => void;
  dbLookups: DbLookups | null;
}

const ModDetailModal: React.FC<ModDetailModalProps> = ({ mod, onClose, dbLookups }) => {
  if (!mod || !dbLookups) {
    return null;
  }

  const setId = parseInt(mod.d.charAt(0), 10);
  const rarity = parseInt(mod.d.charAt(1), 10);
  const shapeId = parseInt(mod.d.charAt(2), 10);

  const setName = MOD_SETS[setId] || 'Unknown';
  const shapeName = MOD_SLOTS[shapeId] || 'Unknown';
  const tierName = MOD_TIER_COLORS[mod.t] || 'Unknown';

  const getRollPercentage = (statName: string, rollValue: number): number => {
    const rollInfo = dbLookups.statRollInfo.find(
      (info: any) => info.stat.name === statName && info.rarity_id === rarity
    );

    if (!rollInfo) {
      return 0;
    }

    const { min_roll, max_roll } = rollInfo;
    if (max_roll <= min_roll) {
      return 100;
    }

    const percentage = ((rollValue - min_roll) / (max_roll - min_roll)) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Mod Details</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modInfoBar}>
          <span>Set: <strong>{setName}</strong></span>
          <span>Slot: <strong>{shapeName}</strong></span>
          <span>Tier: <strong>{tierName}</strong></span>
          <span>Level: <strong>{mod.l}/15</strong></span>
        </div>
        <div className={styles.modalBody}>
          <h3 className={styles.sectionTitle}>Secondary Stats</h3>
          <div className={styles.secondaryStatsGrid}>
            {mod.s.map((stat) => {
              const statInfo = dbLookups.stats[stat.i];
              const statName = statInfo?.name || 'Unknown Stat';
              const isPercentage = statInfo?.isPercentage || false;
              const statValueDisplay = isPercentage ? `${stat.v.toFixed(2)}%` : stat.v.toLocaleString();

              return (
                <div key={stat.i} className={styles.statContainer}>
                  <div className={styles.statHeader}>
                    <span className={styles.statName}>{statName}</span>
                    <span className={styles.statValue}>{statValueDisplay}</span>
                    <span className={styles.statRolls}>({stat.r} {stat.r === 1 ? 'roll' : 'rolls'})</span>
                  </div>
                  <div className={styles.rollsContainer}>
                    {stat.rv?.map((rollValue, index) => {
                      const percentage = getRollPercentage(statName, rollValue);
                      return (
                        <div key={index} className={styles.rollBar}>
                          <div
                            className={styles.rollBarFill}
                            style={{ width: `${percentage}%` }}
                          >
                            <span className={styles.rollBarText}>{percentage.toFixed(1)}%</span>
                          </div>
                        </div>
                      );
                    })}
                    {/* Render empty placeholders */}
                    {Array.from({ length: 5 - (stat.rv?.length || 0) }).map((_, index) => (
                        <div key={`placeholder-${index}`} className={styles.rollBarPlaceholder} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <h3 className={styles.sectionTitle}>Evaluation</h3>
          <div className={styles.evaluationSection}>
            <div className={styles.verdictBox}>
              Verdict: <strong>Keep</strong>
            </div>
            <div className={styles.evaluationSteps}>
              <p>Evaluation Steps:</p>
              <ul>
                <li>&rarr; Speed meets threshold (8+)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModDetailModal;