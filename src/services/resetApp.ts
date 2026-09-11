import { useUserStore } from '@/stores/userStore';
import { useChildStore } from '@/stores/childStore';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { useGameStore } from '@/stores/gameStore';
import { usePlanStore } from '@/stores/planStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { clearAllNumuData } from '@/services/localStorage';

/** Wipes every store's in-memory state and its AsyncStorage-persisted copy. */
export async function resetAllAppData(): Promise<void> {
  useUserStore.getState().signOut();
  useChildStore.getState().reset();
  useAssessmentStore.getState().reset();
  useGameStore.getState().reset();
  usePlanStore.getState().reset();
  useSettingsStore.getState().reset();
  await clearAllNumuData();
}
