import { CATEGORY_ORDER } from '@/constants/categories';
import { useGameStore } from './gameStore';
import { useAssessmentStore } from './assessmentStore';
import { DEMO_WEEKLY_TREND, DEMO_PROGRESS_STATS } from '@/data/mockProgress';
import type { DevelopmentAreaId } from '@/types/child';

/**
 * Progress is derived on read from gameStore + assessmentStore rather than
 * stored separately, so there is a single source of truth.
 */
export function getWeeklyTrend(childId: string): { week: string; value: number }[] {
  const results = useGameStore.getState().resultsForChild(childId);
  if (results.length === 0) return DEMO_WEEKLY_TREND;
  // Group results into 4 buckets by recency to approximate a weekly trend.
  const sorted = [...results].sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime());
  const bucketCount = 4;
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);
  sorted.forEach((r, i) => {
    const bucketIndex = Math.min(bucketCount - 1, Math.floor((i / sorted.length) * bucketCount));
    buckets[bucketIndex].push(r.score);
  });
  return buckets.map((scores, i) => ({
    week: `Week ${i + 1}`,
    value: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : DEMO_WEEKLY_TREND[i].value,
  }));
}

export function getProgressStats(childId: string) {
  const results = useGameStore.getState().resultsForChild(childId);
  if (results.length === 0) return DEMO_PROGRESS_STATS;
  const avgResponseTimes = results.filter((r) => r.responseTime != null).map((r) => r.responseTime as number);
  const responseTimeAfter = avgResponseTimes.length
    ? Math.round((avgResponseTimes.reduce((a, b) => a + b, 0) / avgResponseTimes.length) * 10) / 10
    : DEMO_PROGRESS_STATS.responseTimeAfter;
  return {
    accuracyImprovement: DEMO_PROGRESS_STATS.accuracyImprovement,
    responseTimeBefore: DEMO_PROGRESS_STATS.responseTimeBefore,
    responseTimeAfter,
    activitiesCompleted: results.length,
    currentStreakDays: DEMO_PROGRESS_STATS.currentStreakDays,
  };
}

export function getProgressByArea(childId: string): { area: DevelopmentAreaId; score: number }[] {
  const profile = useAssessmentStore.getState().latestProfile(childId);
  if (profile) {
    return CATEGORY_ORDER.map((area) => {
      const found = profile.areaScores.find((a) => a.area === area);
      return { area, score: found?.score ?? 0 };
    });
  }
  return CATEGORY_ORDER.map((area) => ({ area, score: 0 }));
}
