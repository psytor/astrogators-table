import { HydratedPlayerData, HydratedMod } from '@/services/modHydrationService';
import ModCard from './ModCard';
import styles from './ModGrid.module.css';

interface ModGridProps {
  playerData: HydratedPlayerData;
  onModSelect: (mod: HydratedMod) => void;
}

export default function ModGrid({ playerData, onModSelect }: ModGridProps) {
  return (
    <div className={styles.grid}>
      {playerData.rosterUnit.map(unit =>
        unit.mods.map(mod => (
          <ModCard key={mod.id} mod={mod} characterId={unit.id} onSelect={onModSelect} />
        ))
      )}
    </div>
  );
}
