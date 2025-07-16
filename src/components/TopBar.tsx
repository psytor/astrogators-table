// src/components/TopBar.tsx
'use client';

import { useState } from 'react';
import styles from './TopBar.module.css';

// Define the types for the component's props
interface Player {
  allyCode: string;
  name: string;
  lastUpdated?: number;
}

interface TopBarProps {
  currentPlayer: Player | null;
  savedPlayers: Player[];
  onPlayerSwitch: (allyCode: string) => void;
  onRefresh: () => void;
  onAddNew: () => void;
  isRefreshing: boolean;
  onDeletePlayer: (allyCode: string) => void;
}

export default function TopBar({
  currentPlayer,
  savedPlayers,
  onPlayerSwitch,
  onRefresh,
  onAddNew,
  isRefreshing,
  onDeletePlayer,
}: TopBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={styles.navBar}>
      <div className={styles.navContainer}>
        <div className={styles.navLeft}>
          <h1 className={styles.navTitle}>The Astrogator's Table</h1>
        </div>

        <div className={`${styles.navRight} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
          {currentPlayer && (
            <div className={styles.playerDropdown}>
              <button
                className={styles.playerDropdownToggle}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div>
                  {currentPlayer.name}
                  {currentPlayer.lastUpdated && (
                    <div className={styles.lastUpdated}>
                      Last updated: {new Date(currentPlayer.lastUpdated).toLocaleTimeString()}
                    </div>
                  )}
                </div>
                <span className={styles.dropdownArrow}>▼</span>
              </button>

              {dropdownOpen && (
                <div className={styles.playerDropdownMenu}>
                  {savedPlayers.map((player) => (
                    <div key={player.allyCode} className={styles.dropdownPlayerRow}>
                      <button
                        className={`${styles.dropdownItem} ${
                          player.allyCode === currentPlayer.allyCode ? styles.active : ''
                        }`}
                        onClick={() => {
                          onPlayerSwitch(player.allyCode);
                          setDropdownOpen(false);
                        }}
                      >
                        {player.name}
                      </button>
                      <button
                        className={styles.playerDeleteBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete ${player.name}?`)) {
                            onDeletePlayer(player.allyCode);
                          }
                        }}
                        title="Delete player"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                  <div className={styles.dropdownDivider}></div>
                  <button
                    className={`${styles.dropdownItem} ${styles.addNew}`}
                    onClick={() => {
                      onAddNew();
                      setDropdownOpen(false);
                    }}
                  >
                    + Add New Player
                  </button>
                </div>
              )}
            </div>
          )}

          {currentPlayer && (
            <button
              className={`${styles.refreshButton} ${isRefreshing ? styles.refreshing : ''}`}
              onClick={onRefresh}
              title="Refresh player data"
              disabled={isRefreshing}
            >
              🔄
            </button>
          )}
        </div>

        <button
          className={styles.mobileMenuToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
