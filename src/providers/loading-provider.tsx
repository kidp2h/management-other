'use client';
import React, { useMemo } from 'react';

import { LoadingScreen } from '@/components/common';

interface LoadingContextProps {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = React.createContext<LoadingContextProps>({
  isLoading: false,
  setLoading: () => {},
});

export function useLoading() {
  const context = React.useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

export function LoadingProvider({ children }: React.PropsWithChildren) {
  const [isLoading, setLoading] = React.useState<boolean>(false);

  return (
    <LoadingContext.Provider
      value={useMemo(() => {
        return {
          isLoading,
          setLoading,
        };
      }, [isLoading, setLoading])}
    >
      <LoadingScreen isLoading={isLoading} />
      {children}
    </LoadingContext.Provider>
  );
}
