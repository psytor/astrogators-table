import styles from './PlayerHeader.module.css';

interface PlayerHeaderProps {
  playerName: string;
  modCount: number;
}

export default function PlayerHeader({ playerName, modCount }: PlayerHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h2 className={styles.playerName}>{playerName}</h2>
        <p className={styles.modCount}>
          Showing {modCount} mods
        </p>
        {/* Placeholder for future average score */}
        <p className={styles.averageScore}>
          Average Score: [TBD]
        </p>
      </div>
    </div>
  );
}
