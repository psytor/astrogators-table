'use client';

import { useState, useMemo, useEffect } from 'react';
import { HydratedPlayerData } from '@/services/modHydrationService';
import TopBar from '@/components/TopBar';
import AllyCodeForm from '@/components/AllyCodeForm';
import PlayerHeader from '@/components/PlayerHeader';
import FilterPanel from '@/components/FilterPanel';
import ModGrid from '@/components/ModGrid';
import { useWorkflows } from '@/contexts/WorkflowContext';
import { MOD_SETS, MOD_SLOTS } from '@/lib/mod-constants';
import styles from '@/app/mods/mods.module.css';

interface Player {
  allyCode: string;
  name: string;
  lastUpdated?: number;
}

export default function ModsPageClient() {
  const [playerData, setPlayerData] = useState<HydratedPlayerData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [savedPlayers, setSavedPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const [advancedFilters, setAdvancedFilters] = useState({
    slots: [],
    sets: [],
    tiers: [],
    rarities: [],
    primaryStats: [],
    secondaryStats: [],
  });

  const workflowConfig = useWorkflows();

  useEffect(() => {
    const storedPlayers = localStorage.getItem('savedPlayers');
    if (storedPlayers) {
      const players: Player[] = JSON.parse(storedPlayers);
      setSavedPlayers(players);
      if (players.length > 0) {
        const lastPlayerAllyCode = localStorage.getItem('lastPlayer');
        const playerToLoad = players.find(p => p.allyCode === lastPlayerAllyCode) || players[0];
        if (playerToLoad) {
          setCurrentPlayer(playerToLoad);
          handleFetch(playerToLoad.allyCode);
        }
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

  const filteredPlayerData = useMemo(() => {
    if (!playerData) return null;

    const { slots, sets, tiers, rarities, primaryStats, secondaryStats } = advancedFilters;

    if (slots.length === 0 && sets.length === 0 && tiers.length === 0 && rarities.length === 0 && primaryStats.length === 0 && secondaryStats.length === 0) {
      return playerData;
    }

    const newRoster = playerData.rosterUnit.map(unit => ({
      ...unit,
      mods: unit.mods.filter(mod => {
        const modSet = MOD_SETS[parseInt(mod.d.charAt(0), 10)];
        const modRarity = parseInt(mod.d.charAt(1), 10);
        const modSlot = MOD_SLOTS[parseInt(mod.d.charAt(2), 10)];
        const modTier = mod.t;
        const primaryStatId = mod.p.i;
        const secondaryStatIds = mod.s.map(s => s.i);

        if (slots.length > 0 && !slots.includes(modSlot)) return false;
        if (sets.length > 0 && !sets.includes(modSet)) return false;
        if (tiers.length > 0 && !tiers.includes(modTier)) return false;
        if (rarities.length > 0) {
          const rarityGroup = modRarity <= 4 ? '1-4' : modRarity.toString();
          if (!rarities.includes(rarityGroup)) return false;
        }
        if (primaryStats.length > 0 && !primaryStats.includes(primaryStatId)) return false;
        if (secondaryStats.length > 0 && !secondaryStats.some(s => secondaryStatIds.includes(s))) return false;
        
        return true;
      })
    })).filter(unit => unit.mods.length > 0);

    return {
      ...playerData,
      rosterUnit: newRoster,
    };
  }, [playerData, advancedFilters]);

  const filteredModCount = useMemo(() => {
    if (!filteredPlayerData) return 0;
    return filteredPlayerData.rosterUnit.reduce((acc, unit) => acc + unit.mods.length, 0);
  }, [filteredPlayerData]);

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
        
        {filteredPlayerData && (
          <div className={styles.mainContent}>
            <div className={styles.modDisplay}>
              <PlayerHeader playerName={filteredPlayerData.playerName} modCount={filteredModCount} />
              <ModGrid playerData={filteredPlayerData} />
            </div>
            <FilterPanel
              advancedFilters={advancedFilters}
              setAdvancedFilters={setAdvancedFilters}
            />
          </div>
        )}
      </div>
    </div>
  );
}
