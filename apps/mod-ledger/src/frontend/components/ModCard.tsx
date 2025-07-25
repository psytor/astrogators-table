'use client';

import { useMemo } from 'react';
import { HydratedPlayerData } from '@/backend/services/modHydrationService';
import { useDbLookups } from '@/frontend/contexts/DbLookupsContext';
import { useWorkflows } from '@/frontend/contexts/WorkflowContext';
import { executeWorkflow, WorkflowResult } from '@/frontend/services/modWorkflowService';
import styles from './ModCard.module.css';
import ModVisual from '@/frontend/components/ModVisual';
import { MOD_SETS, MOD_SLOTS, MOD_TIER_COLORS } from '@/frontend/lib/mod-constants';

type CompactMod = HydratedPlayerData['rosterUnit'][0]['mods'][0];

interface ModCardProps {
  mod: CompactMod;
  characterId: string;
  onSelect: (mod: CompactMod, evaluation: WorkflowResult) => void;
  activeWorkflow: string;
}

export default function ModCard({ mod, characterId, onSelect, activeWorkflow }: ModCardProps) {
  const { lookups, isLoading: isDbLoading } = useDbLookups();
  const workflowConfig = useWorkflows();

  const evaluation = useMemo(() => {
    if (!workflowConfig.workflows || !activeWorkflow) {
      return { resultCode: 'ERROR', trace: [] };
    }
    // The executeWorkflow function expects the profile *name* (a string), not the profile object.
    return executeWorkflow(mod, activeWorkflow);
  }, [mod, activeWorkflow, workflowConfig.workflows]);

  if (isDbLoading || !lookups || !workflowConfig || !evaluation) {
    return <div className={`${styles.card} ${styles.loading}`}>Evaluating...</div>;
  }
  
  const evaluationDisplay = workflowConfig.results[evaluation.resultCode] || workflowConfig.results['ERROR'];

  const handleCardClick = () => {
    if (evaluation) {
      onSelect(mod, evaluation);
    }
  };

  const overallEfficiency = mod.oe ? `${mod.oe.toFixed(1)}%` : "0.0%";

  const setId = parseInt(mod.d.charAt(0), 10);
  const rarity = parseInt(mod.d.charAt(1), 10);
  const shapeId = parseInt(mod.d.charAt(2), 10);

  const isSixDot = rarity === 6;
  const totalRarityDots = 7;

  const setType = MOD_SETS[setId] || null;
  const shapeType = MOD_SLOTS[shapeId] || null;
  const modTierNameForVisual = MOD_TIER_COLORS[mod.t] || null;

  const modTierColorName = (MOD_TIER_COLORS[mod.t] || 'grey').toLowerCase();
  const modTierColor = `var(--tier-${modTierColorName})`;
  const modTierColorMuted = `var(--tier-${modTierColorName}-muted)`;

  return (
    <div
      className={styles.modCard}
      onClick={handleCardClick}
      style={
        {
          '--mod-border-color': modTierColor,
          '--mod-border-color-muted': modTierColorMuted,
        } as React.CSSProperties
      }
    >
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
        <span className={styles.recommendation} style={{ color: evaluationDisplay.colorVar }}>
          {evaluationDisplay.text}
        </span>
        <span className={styles.score}>{overallEfficiency}</span>
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
              modTierName={modTierNameForVisual}
              is6Dot={isSixDot}
            />
            <div className={styles.modLevel}>{mod.l}</div>
            <div className={styles.characterIcon}></div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.primaryStat}>
            <span className={styles.statName}>{lookups.stats[mod.p.i]?.name || 'Unknown Stat'}</span>
            <span className={styles.statValue}>
              {lookups.stats[mod.p.i]?.isPercentage ? `${mod.p.v}%` : mod.p.v}
            </span>
          </div>
          <ul className={styles.secondaryStats}>
            {mod.s.map((stat, index) => {
              const statInfo = lookups.stats[stat.i];
              const statName = statInfo?.name || 'Unknown Stat';
              const isPercentage = statInfo?.isPercentage || false;
              const statValue = isPercentage ? `${stat.v.toFixed(2)}%` : stat.v;

              return (
                <li key={index} className={styles.secondaryStat}>
                  <span className={styles.statValue}>{statValue}</span>
                  <span className={styles.statName}>{statName}</span>
                  <span className={styles.statRolls}>({stat.r}) {stat.e ? `${stat.e.toFixed(0)}%` : ''}</span>
                </li>
              );
            })}
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