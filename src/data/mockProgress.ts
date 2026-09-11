/** Baseline weekly-trend seed used before enough real session history exists (spec section 27 example). */
export const DEMO_WEEKLY_TREND: { week: string; value: number }[] = [
  { week: 'Week 1', value: 55 },
  { week: 'Week 2', value: 63 },
  { week: 'Week 3', value: 71 },
  { week: 'Week 4', value: 80 },
];

export const DEMO_PROGRESS_STATS = {
  accuracyImprovement: '+45%',
  responseTimeBefore: 2.8,
  responseTimeAfter: 1.6,
  activitiesCompleted: 12,
  currentStreakDays: 4,
};
