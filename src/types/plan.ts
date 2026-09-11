import type { DevelopmentAreaId } from './child';

export interface PlanFocusArea {
  area: DevelopmentAreaId;
  icon: string;
  goal: string;
  activityCount: number;
  estimatedDuration: string; // e.g. "15 min / week"
  gameIds: string[];
}

export interface PersonalizedPlan {
  id: string;
  childId: string;
  createdAt: string;
  developmentProfileId: string;
  focusAreas: PlanFocusArea[];
}

export type WeeklyActivityStatus = 'completed' | 'today' | 'upcoming';

export interface WeeklyActivity {
  id: string;
  day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';
  title: string;
  area: DevelopmentAreaId;
  gameId: string;
  durationMinutes: number;
  status: WeeklyActivityStatus;
}

export interface WeeklyPlan {
  id: string;
  childId: string;
  weekOf: string; // ISO date, Monday of the week
  personalizedPlanId: string;
  activities: WeeklyActivity[];
}
