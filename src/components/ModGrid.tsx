import { HydratedPlayerData } from '@/services/modHydrationService';
import styles from './ModGrid.module.css';

// TODO: Import ModCard once it's created
// import ModCard from './ModCard';

interface ModGridProps {
  playerData: HydratedPlayerData;
}

export default function ModGrid({ playerData }: ModGridProps) {
  // Flatten the mods from all characters into a single array
  const allMods = playerData.rosterUnit.flatMap(unit => unit.mods);

  return (
    <div className={styles.grid}>
      {allMods.map(mod => (
        // TODO: Replace this div with <ModCard mod={mod} />
        <div key={mod.id} className={styles.cardPlaceholder}>
          <p>Mod ID: {mod.id}</p>
          <p>Level: {mod.l}</p>
        </div>
      ))}
    </div>
  );
}
