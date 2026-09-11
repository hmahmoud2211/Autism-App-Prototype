import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { asyncJSONStorage, STORAGE_KEYS } from '@/services/localStorage';
import type { AgeGroupId, Child } from '@/types/child';
import { generateId } from '@/utils/id';

interface ChildState {
  children: Child[];
  activeChildId: string | null;
  addChild: (data: { name: string; dob: string; gender?: Child['gender']; avatarKey: string; ageGroup: AgeGroupId }) => Child;
  updateChild: (id: string, patch: Partial<Omit<Child, 'id'>>) => void;
  removeChild: (id: string) => void;
  setActiveChild: (id: string) => void;
  activeChild: () => Child | undefined;
  reset: () => void;
}

export const useChildStore = create<ChildState>()(
  persist(
    (set, get) => ({
      children: [],
      activeChildId: null,
      addChild: (data) => {
        const child: Child = { id: generateId('child'), createdAt: new Date().toISOString(), ...data };
        set((state) => ({ children: [...state.children, child], activeChildId: child.id }));
        return child;
      },
      updateChild: (id, patch) =>
        set((state) => ({ children: state.children.map((c) => (c.id === id ? { ...c, ...patch } : c)) })),
      removeChild: (id) =>
        set((state) => {
          const children = state.children.filter((c) => c.id !== id);
          const activeChildId = state.activeChildId === id ? (children[0]?.id ?? null) : state.activeChildId;
          return { children, activeChildId };
        }),
      setActiveChild: (id) => set({ activeChildId: id }),
      activeChild: () => get().children.find((c) => c.id === get().activeChildId),
      reset: () => set({ children: [], activeChildId: null }),
    }),
    { name: STORAGE_KEYS.children, storage: asyncJSONStorage, version: 1 },
  ),
);
