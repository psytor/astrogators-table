'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { DbLookups } from '@/backend/services/modHydrationService';

// Define the shape of the context data
interface DbLookupsContextType {
  lookups: DbLookups | null;
  isLoading: boolean;
  error: string | null;
}

// Create the context with a default value
const DbLookupsContext = createContext<DbLookupsContextType | undefined>(undefined);

// Custom hook for easy consumption of the context
export function useDbLookups() {
  const context = useContext(DbLookupsContext);
  if (context === undefined) {
    throw new Error('useDbLookups must be used within a DbLookupsProvider');
  }
  return context;
}

// Define the props for the provider component
interface DbLookupsProviderProps {
  children: ReactNode;
}

export function DbLookupsProvider({ children }: DbLookupsProviderProps) {
  const [lookups, setLookups] = useState<DbLookups | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLookups = async () => {
      try {
        const response = await fetch('/api/db-lookups');
        if (!response.ok) {
          throw new Error(`Failed to fetch DB lookups: ${response.statusText}`);
        }
        const data: DbLookups = await response.json();
        setLookups(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLookups();
  }, []); // Empty dependency array ensures this runs only once on mount

  const value = {
    lookups,
    isLoading,
    error,
  };

  return (
    <DbLookupsContext.Provider value={value}>
      {children}
    </DbLookupsContext.Provider>
  );
}
