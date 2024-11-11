'use client';
import React, { useContext, useRef } from 'react';
import { useStore } from 'zustand';

import type { GlobalStore } from '@/lib/zustand/stores/global-store';
import { createGlobalStore } from '@/lib/zustand/stores/global-store';

interface GlobalStoreProviderProps {
  children: React.ReactNode;
}
export const GlobalStoreContext = React.createContext<
  GlobalStoreApi | undefined
>(undefined);
export type GlobalStoreApi = ReturnType<typeof createGlobalStore>;

export const GlobalStoreProvider = ({ children }: GlobalStoreProviderProps) => {
  const storeRef = useRef<GlobalStoreApi>();
  if (!storeRef.current) {
    const store = createGlobalStore();
    storeRef.current = store;
  }
  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

export const useGlobalStore = <T,>(selector: (store: GlobalStore) => T): T => {
  const globalStoreContext = useContext(GlobalStoreContext);

  if (!globalStoreContext) {
    throw new Error(`useGlobalStore must be used within GlobalStoreProvider`);
  }

  return useStore(globalStoreContext, selector);
};
