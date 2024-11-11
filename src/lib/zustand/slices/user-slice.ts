import type { User } from '@clerk/nextjs/server';
import type { StateCreator } from 'zustand';

export interface UserSlice {
  users: User[];
  setUsers: (users: User[]) => void;
}
export const createUserSlice: StateCreator<UserSlice, [], []> = set => ({
  users: [],
  setUsers: (users: User[]) => set(() => ({ users })),
});
