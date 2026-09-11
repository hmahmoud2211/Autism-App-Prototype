import React, { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppText } from '@/components/common/AppText';
import { Card } from '@/components/common/Card';
import { SectionHeader } from '@/components/common/SectionHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { InsightCard } from '@/components/dashboard/InsightCard';
import { WeeklyBarChart } from '@/components/charts/WeeklyBarChart';
import { DevelopmentAreaCard } from '@/components/dashboard/DevelopmentAreaCard';
import { colors } from '@/constants/colors';
import { spacing, radius } from '@/constants/spacing';
import { useChildStore } from '@/stores/childStore';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { getWeeklyTrend, getProgressStats } from '@/stores/progressStore';

const FILTERS = ['Last 4 Weeks', 'Last 3 Months', 'All Time'] as const;

export function ProgressScreen() {
  const child = useChildStore((s) => s.activeChild());
  const profile = useAssessmentStore((s) => (child ? s.latestProfile(child.id) : undefined));
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>(FILTERS[0]);

  if (!child) {
    return (
      <ScreenContainer>
        <EmptyState icon="bar-chart-outline" title="No child selected" />
      </ScreenContainer>
    );
  }

  const trend = getWeeklyTrend(child.id);
  const stats = getProgressStats(child.id);

  return (
    <ScreenContainer scroll>
      <AppText variant="h1" style={styles.title}>
        Your Progress
      </AppText>
      <AppText variant="bodySmall" color={colors.textSecondary} style={styles.subtitle}>
        {child.name}'s activity over time
      </AppText>

      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            accessibilityRole="button"
            accessibilityLabel={f}
          >
            <AppText variant="bodySmall" color={filter === f ? colors.textInverse : colors.text}>
              {f}
            </AppText>
          </Pressable>
        ))}
      </View>

      <Card style={styles.chartCard}>
        <WeeklyBarChart data={trend} />
      </Card>

      <View style={styles.statsGrid}>
        <InsightCard icon="trending-up" title="Improvement in accuracy" value={stats.accuracyImprovement} color={colors.green} />
        <InsightCard
          icon="timer-outline"
          title="Faster response time"
          value={`${stats.responseTimeBefore} → ${stats.responseTimeAfter}s`}
          color={colors.primary}
        />
      </View>
      <View style={styles.statsGrid}>
        <InsightCard icon="checkmark-done-outline" title="Activities Completed" value={`${stats.activitiesCompleted}`} color={colors.teal} />
        <InsightCard icon="flame" title="Current Streak" value={`${stats.currentStreakDays} days`} color={colors.orange} />
      </View>

      <SectionHeader title="Progress by Area" />
      {profile ? (
        profile.areaScores.map((areaScore) => <DevelopmentAreaCard key={areaScore.area} areaScore={areaScore} />)
      ) : (
        <EmptyState
          icon="analytics-outline"
          title="No assessment yet"
          message="Complete a developmental check-in to see progress by area."
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { marginBottom: spacing.xs },
  subtitle: { marginBottom: spacing.lg },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chartCard: { marginBottom: spacing.lg },
  statsGrid: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
});
