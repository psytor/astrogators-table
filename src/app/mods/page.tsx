'use client';

import { useState } from 'react';
import { HydratedPlayerData } from '@/services/modHydrationService';
import AllyCodeForm from '@/components/AllyCodeForm';
import styles from './mods.module.css';

export default function ModsPage() {
  const [playerData, setPlayerData] = useState<HydratedPlayerData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = (allyCode: string) => {
    // TODO: Implement data fetching logic here
    console.log('Fetching data for ally code:', allyCode);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>The Mod Ledger</h1>
      <AllyCodeForm onFetch={handleFetch} isLoading={isLoading} />

      {isLoading && <p>Loading...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      
      {/* TODO: Add ModGrid component to display results */}
      {playerData && (
        <div>
          <h2>{playerData.playerName}</h2>
          <pre>{JSON.stringify(playerData, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}
