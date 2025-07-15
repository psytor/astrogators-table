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

  const setId = parseInt(mod.d.charAt(0), 10);
  const rarity = parseInt(mod.d.charAt(1), 10);
  const shapeId = parseInt(mod.d.charAt(2), 10);

  const isSixDot = rarity === 6;
  const totalRarityDots = 7;

  // Derive props for ModVisual
  const setType = MOD_SETS[setId] || null;
  const shapeType = MOD_SLOTS[shapeId] || null;
  const modTierName = MOD_TIERS[mod.t] || null;

  return (
    <div className={styles.modCard}>
      <div className={styles.modBorders}>
        <div className={styles.borderLeft}></div>
        <div className={styles.borderRight}></div>
        <div className={styles.borderTop}></div>
        <div className={styles.borderBottom}></div>
        <div className={`${styles.borderCornerWrap} ${styles.cornerWrapTl}`}></div>
        <div className={`${styles.borderCornerWrap} ${styles.cornerWrapTr}`}></div>
        <div className={`${styles.borderCornerWrap} ${styles.cornerWrapBl}`}></div>
        <div className={`${styles.borderCornerWrap} ${styles.cornerWrapBr}`}></div>
        <div className={`${styles.cornerDiagonal} ${styles.diagonalTl}`}></div>
        <div className={`${styles.cornerDiagonal} ${styles.diagonalTr}`}></div>
        <div className={`${styles.cornerDiagonal} ${styles.diagonalBl}`}></div>
        <div className={`${styles.cornerDiagonal} ${styles.diagonalBr}`}></div>
      </div>
      <div className={styles.header}>
        <span className={styles.recommendation}>{recommendation}</span>
        <span className={styles.score}>{score}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.leftColumn}>
          <div className={styles.modRarity}>
            {Array.from({ length: totalRarityDots }).map((_, i) => (
              <span
                key={i}
                className={`${styles.rarityDot} ${i < rarity ? styles.rarityDotActive : ''}`}
              ></span>
            ))}
          </div>
          <div className={styles.modVisualContainer}>
            <ModVisual
              shapeType={shapeType}
              setType={setType}
              modTierName={modTierName}
              is6Dot={isSixDot}
            />
            <div className={styles.characterIcon}></div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.primaryStat}>
            <span className={styles.statName}>{lookups.stats[mod.p.i]?.name || 'Unknown Stat'}</span>
            <span className={styles.statValue}>{mod.p.v}</span>
          </div>
          <ul className={styles.secondaryStats}>
            {mod.s.map((stat, index) => (
              <li key={index} className={styles.secondaryStat}>
                <span className={styles.statValue}>{stat.v}</span>
                <span className={styles.statName}>{lookups.stats[stat.i]?.name || 'Unknown Stat'}</span>
                <span className={styles.statRolls}>({stat.r})</span>
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
