'use client';

import { useState, useMemo, useEffect } from 'react';
import { HydratedPlayerData } from '@/services/modHydrationService';
import TopBar from '@/components/TopBar';
import AllyCodeForm from '@/components/AllyCodeForm';
import PlayerHeader from '@/components/PlayerHeader';
import FilterPanel from '@/components/FilterPanel';
import ModGrid from '@/components/ModGrid';
import styles from './mods.module.css';

interface Player {
  allyCode: string;
  name: string;
  lastUpdated?: number;
}

export default function ModsPage() {
  const [playerData, setPlayerData] = useState<HydratedPlayerData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [savedPlayers, setSavedPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const storedPlayers = localStorage.getItem('savedPlayers');
    if (storedPlayers) {
      const players: Player[] = JSON.parse(storedPlayers);
      setSavedPlayers(players);
      if (players.length > 0) {
        const lastPlayerAllyCode = localStorage.getItem('lastPlayer');
        const playerToLoad = players.find(p => p.allyCode === lastPlayerAllyCode) || players[0];
        setCurrentPlayer(playerToLoad);
        handleFetch(playerToLoad.allyCode);
      }
    }
  }, []);

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

      const now = Date.now();
      const newPlayer = { allyCode, name: data.playerName, lastUpdated: now };
      
      setSavedPlayers(prev => {
        const existingPlayerIndex = prev.findIndex(p => p.allyCode === allyCode);
        let newPlayers;
        if (existingPlayerIndex > -1) {
          newPlayers = [...prev];
          newPlayers[existingPlayerIndex] = newPlayer;
        } else {
          newPlayers = [...prev, newPlayer];
        }
        localStorage.setItem('savedPlayers', JSON.stringify(newPlayers));
        return newPlayers;
      });
      
      setCurrentPlayer(newPlayer);
      localStorage.setItem('lastPlayer', allyCode);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayerSwitch = (allyCode: string) => {
    const player = savedPlayers.find(p => p.allyCode === allyCode);
    if (player) {
      setCurrentPlayer(player);
      handleFetch(allyCode);
    }
  };

  const handleRefresh = () => {
    if (currentPlayer) {
      handleFetch(currentPlayer.allyCode);
    }
  };

  const handleAddNew = () => {
    setCurrentPlayer(null);
    setPlayerData(null);
  };

  const handleDeletePlayer = (allyCode: string) => {
    setSavedPlayers(prev => {
      const newPlayers = prev.filter(p => p.allyCode !== allyCode);
      localStorage.setItem('savedPlayers', JSON.stringify(newPlayers));
      return newPlayers;
    });

    if (currentPlayer?.allyCode === allyCode) {
      setCurrentPlayer(null);
      setPlayerData(null);
      localStorage.removeItem('lastPlayer');
    }
  };

  const totalModCount = useMemo(() => {
    if (!playerData) return 0;
    return playerData.rosterUnit.reduce((acc, unit) => acc + unit.mods.length, 0);
  }, [playerData]);

  return (
    <div className={styles.modListContainer}>
      <TopBar
        currentPlayer={currentPlayer}
        savedPlayers={savedPlayers}
        onPlayerSwitch={handlePlayerSwitch}
        onRefresh={handleRefresh}
        onAddNew={handleAddNew}
        isRefreshing={isLoading}
        onDeletePlayer={handleDeletePlayer}
      />
      
      <div className={styles.contentWrapper}>
        {!currentPlayer && !isLoading && (
          <div className={styles.formContainer}>
            <h1 className={styles.title}>The Mod Ledger</h1>
            <p>Enter an ally code to get started.</p>
            <AllyCodeForm onFetch={handleFetch} isLoading={isLoading} />
          </div>
        )}

        {isLoading && <p className={styles.loading}>Loading player data...</p>}
        {error && <p className={styles.error}>Error: {error}</p>}
        
        {playerData && (
          <div className={styles.mainContent}>
            <div className={styles.modDisplay}>
              <PlayerHeader playerName={playerData.playerName} modCount={totalModCount} />
              <ModGrid playerData={playerData} />
            </div>
            <FilterPanel />
          </div>
        )}
      </div>
    </div>
  );
}
