import { HydratedPlayerData } from '@/services/modHydrationService';
import ModCard from './ModCard';
import styles from './ModGrid.module.css';

interface ModGridProps {
  playerData: HydratedPlayerData;
}

export default function ModGrid({ playerData }: ModGridProps) {
  return (
    <div className={styles.grid}>
      {playerData.rosterUnit.map(unit =>
        unit.mods.map(mod => (
          <ModCard key={mod.id} mod={mod} characterId={unit.id} />
        ))
      )}
    </div>
  );
}
