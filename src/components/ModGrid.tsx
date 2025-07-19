import { HydratedPlayerData, HydratedMod } from '@/services/modHydrationService';
import ModCard from './ModCard';
import styles from './ModGrid.module.css';

interface ModGridProps {
  playerData: HydratedPlayerData;
  onModSelect: (mod: HydratedMod, evaluation: any) => void;
  activeWorkflow: string;
}

export default function ModGrid({ playerData, onModSelect, activeWorkflow }: ModGridProps) {
  return (
    <div className={styles.grid}>
      {playerData.rosterUnit.map(unit =>
        unit.mods.map(mod => (
          <ModCard 
            key={mod.id} 
            mod={mod} 
            characterId={unit.id} 
            onSelect={onModSelect} 
            activeWorkflow={activeWorkflow} 
          />
        ))
      )}
    </div>
  );
}
