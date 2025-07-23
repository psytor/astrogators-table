// src/contexts/WorkflowContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of a single workflow object
export interface Workflow {
  name: string;
  description: string;
  [key: string]: any; // Allow other properties
}

// Define the shape of the entire configuration object
interface WorkflowConfig {
  workflows: {
    [key: string]: Workflow; // Index signature using the Workflow type
  };
  results: any;
}

const WorkflowContext = createContext<WorkflowConfig | null>(null);

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<WorkflowConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch('/api/workflows');
        if (!response.ok) {
          throw new Error('Failed to fetch workflow configuration');
        }
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error(error);
        // Handle error state if necessary
      } finally {
        setIsLoading(false);
      }
    }

    fetchConfig();
  }, []);

  if (isLoading) {
    // You can return a loader here if you want
    return null;
  }

  return (
    <WorkflowContext.Provider value={config}>
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflows() {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflows must be used within a WorkflowProvider');
  }
  return context;
}