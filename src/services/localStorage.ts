import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage } from 'zustand/middleware';

export const STORAGE_KEYS = {
  user: 'numu:user',
  children: 'numu:children',
  assessment: 'numu:assessment',
  game: 'numu:game',
  plan: 'numu:plan',
  settings: 'numu:settings',
} as const;

/** Shared AsyncStorage-backed JSON storage adapter for every zustand `persist` store. */
export const asyncJSONStorage = createJSONStorage(() => AsyncStorage);

export async function clearAllNumuData(): Promise<void> {
  const keys = Object.values(STORAGE_KEYS);
  await AsyncStorage.multiRemove(keys);
}
