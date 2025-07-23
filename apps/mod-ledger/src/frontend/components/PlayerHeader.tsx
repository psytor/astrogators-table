import styles from './PlayerHeader.module.css';
import CollectionEfficiencyDisplay from '@/frontend/components/CollectionEfficiencyDisplay';

interface PlayerHeaderProps {
  playerName: string;
  modCount: number;
}

export default function PlayerHeader({ playerName, modCount }: PlayerHeaderProps) {
  // --- START: Placeholder Data ---
  const placeholderCollectionStats = {
    average: 85.2,
    count: 150,
    breakdown: {
      keep: { total: 100, count: 10, average: 90.5 },
      sell: { total: 50, count: 5, average: 45.2 },
      slice: { total: 80, count: 8, average: 88.1 },
      level: { total: 70, count: 7, average: 75.9 },
    },
  };

  const placeholderModStats = {
    keep: 10,
    sell: 5,
    slice: 8,
    level: 7,
  };
  // --- END: Placeholder Data ---

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h2 className={styles.playerName}>{playerName}</h2>
        <p className={styles.modCount}>
          Showing {modCount} mods
        </p>
        <CollectionEfficiencyDisplay
          collectionStats={placeholderCollectionStats}
          modStats={placeholderModStats}
        />
      </div>
    </div>
  );
}