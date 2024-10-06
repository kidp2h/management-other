import type { StateCreator } from 'zustand';

export interface SidebarSlice {
  isOpen: boolean;
  toggle: () => void;
}
export const createSidebarSlice: StateCreator<SidebarSlice, [], []> = set => ({
  isOpen: false,
  toggle: () => set(state => ({ isOpen: !state.isOpen })),
});
