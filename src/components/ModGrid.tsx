import { HydratedPlayerData } from '@/services/modHydrationService';
import ModCard from './ModCard';
import styles from './ModGrid.module.css';

interface ModGridProps {
  playerData: HydratedPlayerData;
}

export default function ModGrid({ playerData }: ModGridProps) {
  // Flatten the mods from all characters into a single array
  const allMods = playerData.rosterUnit.flatMap(unit => unit.mods);

  return (
    <div className={styles.grid}>
      {allMods.map(mod => (
        <ModCard key={mod.id} mod={mod} />
      ))}
    </div>
  );
}
