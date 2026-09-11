import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { asyncJSONStorage, STORAGE_KEYS } from '@/services/localStorage';
import type { ParentUser } from '@/types/child';
import { generateId } from '@/utils/id';

interface UserState {
  user: ParentUser | null;
  createAccount: (name: string, email: string, language: string) => void;
  signOut: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      createAccount: (name, email, language) =>
        set({
          user: { id: generateId('user'), name, email, language, createdAt: new Date().toISOString() },
        }),
      signOut: () => set({ user: null }),
    }),
    { name: STORAGE_KEYS.user, storage: asyncJSONStorage, version: 1 },
  ),
);
