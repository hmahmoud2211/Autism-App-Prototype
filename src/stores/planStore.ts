import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { asyncJSONStorage, STORAGE_KEYS } from '@/services/localStorage';
import type { PersonalizedPlan, WeeklyPlan } from '@/types/plan';

interface PlanState {
  personalizedPlanByChild: Record<string, PersonalizedPlan>;
  weeklyPlanByChild: Record<string, WeeklyPlan>;

  setPersonalizedPlan: (plan: PersonalizedPlan) => void;
  setWeeklyPlan: (plan: WeeklyPlan) => void;
  completeActivity: (childId: string, activityId: string) => void;
  reset: () => void;
}

export const usePlanStore = create<PlanState>()(
  persist(
    (set) => ({
      personalizedPlanByChild: {},
      weeklyPlanByChild: {},

      setPersonalizedPlan: (plan) =>
        set((state) => ({ personalizedPlanByChild: { ...state.personalizedPlanByChild, [plan.childId]: plan } })),

      setWeeklyPlan: (plan) =>
        set((state) => ({ weeklyPlanByChild: { ...state.weeklyPlanByChild, [plan.childId]: plan } })),

      completeActivity: (childId, activityId) =>
        set((state) => {
          const plan = state.weeklyPlanByChild[childId];
          if (!plan) return state;
          return {
            weeklyPlanByChild: {
              ...state.weeklyPlanByChild,
              [childId]: {
                ...plan,
                activities: plan.activities.map((a) => (a.id === activityId ? { ...a, status: 'completed' } : a)),
              },
            },
          };
        }),

      reset: () => set({ personalizedPlanByChild: {}, weeklyPlanByChild: {} }),
    }),
    { name: STORAGE_KEYS.plan, storage: asyncJSONStorage, version: 1 },
  ),
);
