import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

import type { SidebarSlice } from '../slices/sidebar-slice';
import { createSidebarSlice } from '../slices/sidebar-slice';

export type GlobalStore = SidebarSlice;

export const createGlobalStore = () => {
  return createStore<SidebarSlice>()(
    devtools(
      persist(
        (set, get, replace) => ({
          ...createSidebarSlice(set, get, replace),
        }),
        {
          name: 'global-store',
          storage: createJSONStorage(() => localStorage),
        },
      ),
    ),
  );
};
