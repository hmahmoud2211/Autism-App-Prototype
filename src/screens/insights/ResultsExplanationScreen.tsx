import React from 'react';
import { StyleSheet } from 'react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { AppText } from '@/components/common/AppText';
import { Card } from '@/components/common/Card';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { EmptyState } from '@/components/common/EmptyState';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { CATEGORY_THEME } from '@/constants/categories';
import { RESULTS_INTRO } from '@/data/copy/guardrailedStrings';
import { useChildStore } from '@/stores/childStore';
import { useAssessmentStore } from '@/stores/assessmentStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

interface Props {
  navigation: NativeStackScreenProps<any>['navigation'];
}

export function ResultsExplanationScreen({ navigation }: Props) {
  const child = useChildStore((s) => s.activeChild());
  const profile = useAssessmentStore((s) => (child ? s.latestProfile(child.id) : undefined));

  if (!child || !profile) {
    return (
      <ScreenContainer>
        <AppHeader title="Understanding the Results" onBack={() => navigation.goBack()} />
        <EmptyState icon="help-circle-outline" title="No results yet" message="Complete a check-in first." />
      </ScreenContainer>
    );
  }

  const priorityAreas = profile.supportAreas;

  return (
    <ScreenContainer scroll>
      <AppHeader title="Understanding the Results" onBack={() => navigation.goBack()} />
      <Card style={styles.card}>
        <AppText variant="body" color={colors.textSecondary}>
          {RESULTS_INTRO}
        </AppText>
      </Card>

      <AppText variant="h3" style={styles.heading}>
        Highest-Priority Areas
      </AppText>
      {priorityAreas.length === 0 ? (
        <AppText variant="body" color={colors.textSecondary}>
          No specific priority areas were identified this time.
        </AppText>
      ) : (
        priorityAreas.map((area, i) => (
          <AppText key={area} variant="body" style={styles.item}>
            {i + 1}. {CATEGORY_THEME[area].label}
          </AppText>
        ))
      )}

      <PrimaryButton label="How can I help?" onPress={() => navigation.navigate('PersonalizedPlan')} style={styles.cta} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.lg },
  heading: { marginBottom: spacing.sm },
  item: { marginBottom: spacing.xs },
  cta: { marginTop: spacing.xl, marginBottom: spacing.lg },
});
