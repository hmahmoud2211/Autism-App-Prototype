import React from 'react';
import { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { AppText } from '@/components/common/AppText';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { EmptyState } from '@/components/common/EmptyState';
import { WeeklyActivityCard } from '@/components/dashboard/WeeklyActivityCard';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useChildStore } from '@/stores/childStore';
import { usePlanStore } from '@/stores/planStore';
import { navigateToGameDetails, navigateToHome } from '@/navigation/navigationRef';

interface Props {
  navigation: NativeStackScreenProps<any>['navigation'];
}

export function WeeklyPlanScreen({ navigation }: Props) {
  const child = useChildStore((s) => s.activeChild());
  const weeklyPlan = usePlanStore((s) => (child ? s.weeklyPlanByChild[child.id] : undefined));

  if (!child || !weeklyPlan) {
    return (
      <ScreenContainer>
        <AppHeader title="This Week" onBack={() => navigation.goBack()} />
        <EmptyState icon="calendar-outline" title="No weekly plan yet" message="Complete a check-in to build a weekly plan." />
      </ScreenContainer>
    );
  }

  const todayActivity = weeklyPlan.activities.find((a) => a.status === 'today');

  return (
    <ScreenContainer scroll>
      <AppHeader title="This Week" subtitle={child.name} onBack={() => navigation.goBack()} />
      {weeklyPlan.activities.map((activity) => (
        <WeeklyActivityCard key={activity.id} activity={activity} />
      ))}

      {todayActivity ? (
        <PrimaryButton
          label="Start Today's Activity"
          onPress={() => navigateToGameDetails(todayActivity.gameId)}
          style={styles.cta}
        />
      ) : (
        <AppText variant="bodySmall" color={colors.textSecondary} center style={styles.doneText}>
          All of today's activities are complete — nice work!
        </AppText>
      )}
      <SecondaryButton label="Go to Home Dashboard" variant="ghost" onPress={navigateToHome} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  cta: { marginTop: spacing.lg, marginBottom: spacing.lg },
  doneText: { marginTop: spacing.lg, marginBottom: spacing.lg },
});
