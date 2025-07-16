// src/contexts/WorkflowContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WorkflowConfig {
  workflows: any;
  results: any;
}

const WorkflowContext = createContext<WorkflowConfig | null>(null);

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<WorkflowConfig | null>(null);

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
      }
    }

    fetchConfig();
  }, []);

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
