import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { asyncJSONStorage, STORAGE_KEYS } from '@/services/localStorage';
import type { GameResult } from '@/types/game';
import { generateId } from '@/utils/id';

export interface StoredGameResult extends GameResult {
  id: string;
}

interface GameState {
  results: StoredGameResult[];
  unlockedLevel: Record<string, Record<string, 1 | 2 | 3>>; // childId -> gameId -> highest unlocked level

  addResult: (result: GameResult) => string;
  getUnlockedLevel: (childId: string, gameId: string) => 1 | 2 | 3;
  resultsForChild: (childId: string) => StoredGameResult[];
  resultsForGame: (childId: string, gameId: string) => StoredGameResult[];
  latestResultForArea: (childId: string, area: GameResult['developmentalArea']) => StoredGameResult | undefined;
  seedResults: (results: GameResult[]) => void;
  reset: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      results: [],
      unlockedLevel: {},

      addResult: (result) => {
        const id = generateId('result');
        set((state) => {
          const nextResults = [...state.results, { id, ...result }];
          let unlockedLevel = state.unlockedLevel;
          if (result.success && result.level < 3) {
            const childLevels = { ...(unlockedLevel[result.childId] ?? {}) };
            const nextLevel = Math.min(3, result.level + 1) as 1 | 2 | 3;
            const current = childLevels[result.gameId] ?? 1;
            childLevels[result.gameId] = Math.max(current, nextLevel) as 1 | 2 | 3;
            unlockedLevel = { ...unlockedLevel, [result.childId]: childLevels };
          }
          return { results: nextResults, unlockedLevel };
        });
        return id;
      },

      getUnlockedLevel: (childId, gameId) => get().unlockedLevel[childId]?.[gameId] ?? 1,

      resultsForChild: (childId) => get().results.filter((r) => r.childId === childId),

      resultsForGame: (childId, gameId) => get().results.filter((r) => r.childId === childId && r.gameId === gameId),

      latestResultForArea: (childId, area) => {
        const list = get()
          .results.filter((r) => r.childId === childId && r.developmentalArea === area)
          .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime());
        return list[list.length - 1];
      },

      seedResults: (results) =>
        set((state) => ({ results: [...state.results, ...results.map((r) => ({ id: generateId('result'), ...r }))] })),

      reset: () => set({ results: [], unlockedLevel: {} }),
    }),
    { name: STORAGE_KEYS.game, storage: asyncJSONStorage, version: 1 },
  ),
);
