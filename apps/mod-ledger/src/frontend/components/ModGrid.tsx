import { HydratedPlayerData, CompactMod } from '@/backend/services/modHydrationService';
import ModCard from '@/frontend/components/ModCard';
import styles from './ModGrid.module.css';

interface ModGridProps {
  playerData: HydratedPlayerData;
  onModSelect: (mod: CompactMod, evaluation: any) => void;
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
