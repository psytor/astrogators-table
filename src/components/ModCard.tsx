'use client';

import { HydratedPlayerData } from '@/services/modHydrationService';
import { useDbLookups } from '@/contexts/DbLookupsContext';
import styles from './ModCard.module.css';

// This is a temporary type definition until we define the CompactMod type properly
type CompactMod = HydratedPlayerData['rosterUnit'][0]['mods'][0];

interface ModCardProps {
  mod: CompactMod;
}

export default function ModCard({ mod }: ModCardProps) {
  const { lookups, isLoading } = useDbLookups();

  if (isLoading || !lookups) {
    return <div className={`${styles.card} ${styles.loading}`}>Loading...</div>;
  }

  // TODO: Replace these with real data and logic
  const recommendation = "Keep";
  const score = "95%";

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.recommendation}>{recommendation}</span>
        <span className={styles.score}>{score}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.modVisual}>
          {/* TODO: Add CSS placeholders for rarity and shape */}
          <p>Shape: {lookups.shapes[mod.d.split('_')[1]]?.name || 'Unknown'}</p>
          <p>Set: {lookups.sets[mod.d.split('_')[0]]?.name || 'Unknown'}</p>
        </div>
        <div className={styles.stats}>
          <div className={styles.primaryStat}>
            {lookups.stats[mod.p.i]?.name || 'Unknown Stat'}: {mod.p.v}
          </div>
          <ul className={styles.secondaryStats}>
            {mod.s.map((stat, index) => (
              <li key={index}>
                ({stat.r}) {lookups.stats[stat.i]?.name || 'Unknown Stat'}: {stat.v}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
