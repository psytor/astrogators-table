// src/components/FilterPanel.tsx
'use client';

import styles from './FilterPanel.module.css';
import { MOD_SLOTS, MOD_SETS, MOD_TIER_NAMES, MOD_TIER_COLORS, STAT_NAMES, MOD_SHAPE_SPRITES, MOD_SET_SPRITES } from '@/lib/mod-constants';

interface AdvancedFilters {
  slots: string[];
  sets: string[];
  tiers: number[];
  rarities: string[];
  primaryStats: number[];
  secondaryStats: number[];
}

interface FilterPanelProps {
  advancedFilters: AdvancedFilters;
  setAdvancedFilters: React.Dispatch<React.SetStateAction<AdvancedFilters>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilterPanel({ advancedFilters, setAdvancedFilters, isOpen, setIsOpen }: FilterPanelProps) {
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

  const activeFilterCount =
    advancedFilters.slots.length +
    advancedFilters.sets.length +
    advancedFilters.tiers.length +
    advancedFilters.rarities.length +
    advancedFilters.primaryStats.length +
    advancedFilters.secondaryStats.length;

  return (
    <>
      <div
        className={`${styles.filterToggleTab} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>F</span><span>I</span><span>L</span><span>T</span><span>E</span><span>R</span><span>S</span>
        {activeFilterCount > 0 && (
          <div className={styles.filterCountBadge}>{activeFilterCount}</div>
        )}
      </div>

      <div className={`${styles.filterPanel} ${isOpen ? styles.open : ''}`}>
        <div className={styles.filterPanelContent}>
          <button
            className={styles.filterPanelClose}
            onClick={() => setIsOpen(false)}
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
            <div className={styles.filterSection}>
              <h4>Slots</h4>
              <div className={styles.filterSpritesGrid}>
                {Object.entries(MOD_SLOTS).map(([key, name]) => {
                  const sprite = MOD_SHAPE_SPRITES[name];
                  if (!sprite) return null;
                  
                  const scale = Math.min(30 / sprite.w, 30 / sprite.h);
                  const scaledWidth = sprite.w * scale;
                  const scaledHeight = sprite.h * scale;
                  
                  return (
                    <div
                      key={key}
                      className={`${styles.spriteFilterItem} ${advancedFilters.slots.includes(name) ? styles.active : ''}`}
                      onClick={() => setAdvancedFilters(prev => ({
                        ...prev,
                        slots: prev.slots.includes(name)
                          ? prev.slots.filter(s => s !== name)
                          : [...prev.slots, name]
                      }))}
                    >
                      <div className={styles.filterSpriteContainer}>
                        <div
                          className={styles.filterSpriteShape}
                          style={{
                            width: `${scaledWidth}px`,
                            height: `${scaledHeight}px`,
                            backgroundImage: `url(/images/charactermods_datacard_atlas.png)`,
                            backgroundPosition: `-${sprite.x * scale}px -${sprite.y * scale}px`,
                            backgroundSize: `${1024 * scale}px auto`,
                            imageRendering: 'pixelated'
                          }}
                        />
                      </div>
                      <span>{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4>Sets</h4>
              <div className={`${styles.filterSpritesGrid} ${styles.sets}`}>
                {Object.entries(MOD_SETS).map(([key, name]) => {
                  const sprite = MOD_SET_SPRITES[name];
                  if (!sprite) return null;
                  
                  const scale = Math.min(30 / sprite.w, 120 / sprite.h);
                  const scaledWidth = sprite.w * scale;
                  const scaledHeight = sprite.h * scale;
                  
                  return (
                    <div
                      key={key}
                      className={`${styles.spriteFilterItem} ${advancedFilters.sets.includes(name) ? styles.active : ''}`}
                      onClick={() => setAdvancedFilters(prev => ({
                        ...prev,
                        sets: prev.sets.includes(name)
                          ? prev.sets.filter(s => s !== name)
                          : [...prev.sets, name]
                      }))}
                    >
                      <div className={styles.filterSpriteContainer}>
                        <div
                          className={styles.filterSpriteSet}
                          style={{
                            width: `${scaledWidth}px`,
                            height: `${scaledHeight}px`,
                            backgroundImage: `url(/images/misc_atlas.png)`,
                            backgroundPosition: `-${sprite.x * scale}px -${sprite.y * scale}px`,
                            backgroundSize: `${2048 * scale}px auto`,
                            imageRendering: 'pixelated'
                          }}
                        />
                      </div>
                      <span>{name.split(' ').map(word => word.charAt(0)).join('')}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4>Tier</h4>
              <div className={styles.filterButtonsRow}>
                {Object.entries(MOD_TIER_NAMES).map(([tier, name]) => (
                  <button
                    key={tier}
                    className={`${styles.filterButton} ${styles['tier-' + MOD_TIER_COLORS[parseInt(tier)].toLowerCase()]} ${
                      advancedFilters.tiers.includes(parseInt(tier)) ? styles.active : ''
                    }`}
                    onClick={() => {
                      const tierNum = parseInt(tier);
                      setAdvancedFilters(prev => ({
                        ...prev,
                        tiers: prev.tiers.includes(tierNum)
                          ? prev.tiers.filter(t => t !== tierNum)
                          : [...prev.tiers, tierNum]
                      }));
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4>Primary Stats</h4>
              <div className={styles.statFilterGrid}>
                {[5, 48, 49, 52, 53, 54, 55, 56, 16, 17, 18].map(statId => (
                  <button
                    key={statId}
                    className={`${styles.statFilterChip} ${
                      advancedFilters.primaryStats.includes(statId) ? styles.active : ''
                    }`}
                    onClick={() => setAdvancedFilters(prev => ({
                      ...prev,
                      primaryStats: prev.primaryStats.includes(statId)
                        ? prev.primaryStats.filter(s => s !== statId)
                        : [...prev.primaryStats, statId]
                    }))}
                  >
                    {STAT_NAMES[statId]}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4>Secondary Stats</h4>
              <div className={styles.statFilterGrid}>
                {Object.entries(STAT_NAMES).map(([id, name]) => (
                  <button
                    key={id}
                    className={`${styles.statFilterChip} ${
                      advancedFilters.secondaryStats.includes(parseInt(id)) ? styles.active : ''
                    }`}
                    onClick={() => {
                      const statId = parseInt(id);
                      setAdvancedFilters(prev => ({
                        ...prev,
                        secondaryStats: prev.secondaryStats.includes(statId)
                          ? prev.secondaryStats.filter(s => s !== statId)
                          : [...prev.secondaryStats, statId]
                      }))
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4>Rarity (Dots)</h4>
              <div className={styles.filterButtonsRow}>
                <button
                  className={`${styles.filterButton} ${styles.rarity} ${
                    advancedFilters.rarities.includes('1-4') ? styles.active : ''
                  }`}
                  onClick={() => setAdvancedFilters(prev => ({
                    ...prev,
                    rarities: prev.rarities.includes('1-4')
                      ? prev.rarities.filter(r => r !== '1-4')
                      : [...prev.rarities, '1-4']
                  }))}
                >
                  <span className={styles.dots}>●●●●</span>
                  <span>1-4</span>
                </button>
                <button
                  className={`${styles.filterButton} ${styles.rarity} ${
                    advancedFilters.rarities.includes('5') ? styles.active : ''
                  }`}
                  onClick={() => setAdvancedFilters(prev => ({
                    ...prev,
                    rarities: prev.rarities.includes('5')
                      ? prev.rarities.filter(r => r !== '5')
                      : [...prev.rarities, '5']
                  }))}
                >
                  <span className={styles.dots}>●●●●●</span>
                  <span>5</span>
                </button>
                <button
                  className={`${styles.filterButton} ${styles.rarity} ${
                    advancedFilters.rarities.includes('6') ? styles.active : ''
                  }`}
                  onClick={() => setAdvancedFilters(prev => ({
                    ...prev,
                    rarities: prev.rarities.includes('6')
                      ? prev.rarities.filter(r => r !== '6')
                      : [...prev.rarities, '6']
                  }))}
                >
                  <span className={styles.dots}>●●●●●●</span>
                  <span>6</span>
                </button>
              </div>
            </div>
            {/* Filter sections will be added here */}
          </div>
        </div>
      </div>
    </>
  );
}
