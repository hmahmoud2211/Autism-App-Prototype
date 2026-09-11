// Generates a non-clinical, playful weekly activity suggestion set.
// This is not a therapeutic or treatment plan.

import { CATEGORY_THEME } from '@/constants/categories';
import { getGamesByArea } from '@/data/games';
import { planRationale, tipRationale } from '@/data/copy/guardrailedStrings';
import { PARENT_GUIDES } from '@/data/parentGuides';
import type { AgeGroupId, DevelopmentAreaId } from '@/types/child';
import type { DevelopmentProfile } from '@/types/assessment';
import type { PersonalizedPlan, PlanFocusArea, WeeklyActivity, WeeklyActivityStatus, WeeklyPlan } from '@/types/plan';
import { generateId } from '@/utils/id';
import { isoWeekStart } from '@/utils/date';

const AREA_GOALS: Record<DevelopmentAreaId, string> = {
  social_interaction: 'Build comfort engaging with people and reading social cues.',
  joint_attention: 'Practice sharing attention through pointing and looking together.',
  response_to_name: "Strengthen reliable responses when your child's name is called.",
  communication: 'Grow expressive and receptive communication in everyday moments.',
  play_interests: 'Expand variety and flexibility in play.',
  sensory_regulation: 'Build comfortable responses to everyday sounds, textures, and light.',
  behavior_emotions: 'Support recognizing and managing emotions.',
  daily_living: 'Build independence in everyday routines.',
};

const WEEK_DAYS: WeeklyActivity['day'][] = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

export function generatePersonalizedPlan(
  childAgeGroup: AgeGroupId,
  profile: DevelopmentProfile,
): PersonalizedPlan {
  const focusAreaIds = profile.supportAreas.length > 0 ? profile.supportAreas : profile.areaScores.slice(0, 3).map((a) => a.area);

  const focusAreas: PlanFocusArea[] = focusAreaIds.map((area) => {
    const games = getGamesByArea(area, childAgeGroup);
    return {
      area,
      icon: CATEGORY_THEME[area].icon,
      goal: AREA_GOALS[area],
      activityCount: games.length,
      estimatedDuration: `${Math.max(games.length, 1) * 5} min / week`,
      gameIds: games.map((g) => g.id),
    };
  });

  return {
    id: generateId('plan'),
    childId: profile.childId,
    createdAt: new Date().toISOString(),
    developmentProfileId: profile.id,
    focusAreas,
  };
}

export function generateWeeklyPlan(
  childAgeGroup: AgeGroupId,
  plan: PersonalizedPlan,
  todayIndex: number, // 0=Mon..4=Fri, 5/6 weekend treated as "before this week's plan starts"
): WeeklyPlan {
  const pool = plan.focusAreas.length > 0 ? plan.focusAreas : [];
  const activities: WeeklyActivity[] = WEEK_DAYS.map((day, i) => {
    const focus = pool.length > 0 ? pool[i % pool.length] : undefined;
    const gameId = focus?.gameIds[i % Math.max(focus.gameIds.length, 1)];
    const status: WeeklyActivityStatus = i < todayIndex ? 'completed' : i === todayIndex ? 'today' : 'upcoming';
    return {
      id: generateId('activity'),
      day,
      title: focus ? CATEGORY_THEME[focus.area].label : 'Free Play',
      area: focus?.area ?? 'play_interests',
      gameId: gameId ?? '',
      durationMinutes: 5,
      status,
    };
  });

  return {
    id: generateId('weekplan'),
    childId: plan.childId,
    weekOf: isoWeekStart(),
    personalizedPlanId: plan.id,
    activities,
  };
}

export function planRationaleFor(area: DevelopmentAreaId, gameTitle: string): string {
  return planRationale(CATEGORY_THEME[area].label, gameTitle);
}

export function tipFor(area: DevelopmentAreaId): { guideId: string; text: string } {
  const guide = PARENT_GUIDES.find((g) => g.tips.length > 0);
  return {
    guideId: guide?.id ?? PARENT_GUIDES[0].id,
    text: tipRationale(CATEGORY_THEME[area].label),
  };
}
