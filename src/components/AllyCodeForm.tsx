'use client';

import { useState } from 'react';
import styles from './AllyCodeForm.module.css';

interface AllyCodeFormProps {
  onFetch: (allyCode: string) => void;
  isLoading: boolean;
}

const formatAllyCode = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 9)}`;
};

export default function AllyCodeForm({ onFetch, isLoading }: AllyCodeFormProps) {
  const [allyCode, setAllyCode] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const digits = allyCode.replace(/\D/g, '');
    if (/^\d{9}$/.test(digits)) {
      onFetch(digits);
    } else {
      alert('Invalid Ally Code. Please enter 9 digits.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAllyCode(e.target.value);
    setAllyCode(formatted);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={allyCode}
          onChange={handleChange}
          placeholder="123-456-789"
          maxLength={11}
          className={styles.input}
          disabled={isLoading}
        />
      </div>
      <div className={`${styles.buttonWrapper} ${isLoading ? styles.disabled : ''}`}>
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Analyse Mods'}
        </button>
      </div>
    </form>
  );
}
