'use client';

import { HydratedPlayerData } from '@/services/modHydrationService';
import { useDbLookups } from '@/contexts/DbLookupsContext';
import styles from './ModCard.module.css';
import ModVisual from './ModVisual';
import { MOD_SETS, MOD_SLOTS, MOD_TIERS } from '@/lib/mod-constants';

type CompactMod = HydratedPlayerData['rosterUnit'][0]['mods'][0];

interface ModCardProps {
  mod: CompactMod;
  characterId: string;
}

export default function ModCard({ mod, characterId }: ModCardProps) {
  const { lookups, isLoading } = useDbLookups();

  if (isLoading || !lookups) {
    return <div className={`${styles.card} ${styles.loading}`}>Loading...</div>;
  }

  const recommendation = "Keep";
  const score = "95%";
  const isSixDot = mod.d[1] === 6;
  const totalRarityDots = 7;

  // Derive props for ModVisual
  const setType = MOD_SETS[mod.d[0]] || null;
  const shapeType = MOD_SLOTS[mod.d[2]] || null;
  const modTierName = MOD_TIERS[mod.t] || null;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.recommendation}>{recommendation}</span>
        <span className={styles.score}>{score}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.modVisual}>
          <div className={styles.modRarity}>
            {Array.from({ length: totalRarityDots }).map((_, i) => (
              <span
                key={i}
                className={`${styles.rarityDot} ${i < mod.d[1] ? styles.rarityDotActive : ''}`}
              ></span>
            ))}
          </div>
          <ModVisual
            shapeType={shapeType}
            setType={setType}
            modTierName={modTierName}
            is6Dot={isSixDot}
          />
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
      <div className={styles.footer}>
        <div className={`${styles.calibration} ${!isSixDot ? styles.calibrationDisabled : ''}`}>
          <span>Calibration Count:</span>
          <span>0/0</span>
        </div>
        <div className={styles.equippedCharacter}>
          {characterId}
        </div>
      </div>
    </div>
  );
}
