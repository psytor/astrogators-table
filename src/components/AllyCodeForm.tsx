'use client';

import { useState } from 'react';
import styles from './AllyCodeForm.module.css';

interface AllyCodeFormProps {
  onFetch: (allyCode: string) => void;
  isLoading: boolean;
}

export default function AllyCodeForm({ onFetch, isLoading }: AllyCodeFormProps) {
  const [allyCode, setAllyCode] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Basic validation before calling the fetch handler
    if (/^\d{9}$/.test(allyCode)) {
      onFetch(allyCode);
    } else {
      alert('Invalid Ally Code. Please enter 9 digits.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={allyCode}
        onChange={(e) => setAllyCode(e.target.value.replace(/\D/g, ''))}
        placeholder="Enter 9-digit Ally Code"
        maxLength={9}
        className={styles.input}
        disabled={isLoading}
      />
      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Analyse Mods'}
      </button>
    </form>
  );
}
