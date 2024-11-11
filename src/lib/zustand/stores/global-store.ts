import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

import {
  createProvinceSlice,
  type ProvinceSlice,
} from '@/lib/zustand/slices/province-slice';
import {
  createRoleSlice,
  type RoleSlice,
} from '@/lib/zustand/slices/role-slice';
import {
  createSidebarSlice,
  type SidebarSlice,
} from '@/lib/zustand/slices/sidebar-slice';
import {
  createUserSlice,
  type UserSlice,
} from '@/lib/zustand/slices/user-slice';

export type GlobalStore = SidebarSlice & ProvinceSlice & RoleSlice & UserSlice;

export const createGlobalStore = () => {
  return createStore<GlobalStore>()(
    devtools(
      persist(
        (set, get, replace) => ({
          ...createSidebarSlice(set, get, replace),
          ...createProvinceSlice(set, get, replace),
          ...createRoleSlice(set, get, replace),
          ...createUserSlice(set, get, replace),
        }),

        {
          name: 'global-store',
          storage: createJSONStorage(() => localStorage),
        },
      ),
    ),
  );
};
