'use client';

import { useState, useMemo } from 'react';
import { HydratedPlayerData } from '@/services/modHydrationService';
import AllyCodeForm from '@/components/AllyCodeForm';
import PlayerHeader from '@/components/PlayerHeader';
import styles from './mods.module.css';

export default function ModsPage() {
  const [playerData, setPlayerData] = useState<HydratedPlayerData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async (allyCode: string) => {
    setIsLoading(true);
    setError(null);
    setPlayerData(null);

    try {
      const response = await fetch(`/api/player/mods/${allyCode}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch player data.');
      }
      const data: HydratedPlayerData = await response.json();
      setPlayerData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const totalModCount = useMemo(() => {
    if (!playerData) return 0;
    return playerData.rosterUnit.reduce((acc, unit) => acc + unit.mods.length, 0);
  }, [playerData]);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>The Mod Ledger</h1>
      <AllyCodeForm onFetch={handleFetch} isLoading={isLoading} />

      {isLoading && <p>Loading...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      
      {playerData && (
        <>
          <PlayerHeader playerName={playerData.playerName} modCount={totalModCount} />
          {/* TODO: Add ModGrid component to display results */}
          <pre>{JSON.stringify(playerData, null, 2)}</pre>
        </>
      )}
    </main>
  );
}
