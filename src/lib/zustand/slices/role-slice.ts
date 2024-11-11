import type { StateCreator } from 'zustand';

import { getAllRoles } from '@/db/actions/roles';
import type { Roles } from '@/db/schema';

export interface RoleSlice {
  roles: Roles[];
  setRoles: (roles: Roles[]) => void;
  fetchRoles: () => Promise<void>;
}
export const createRoleSlice: StateCreator<RoleSlice, [], []> = set => ({
  roles: [],
  setRoles: (roles: Roles[]) => set(() => ({ roles })),
  fetchRoles: async () => {
    const { data } = await getAllRoles();
    if (data) set({ roles: data });
  },
});
