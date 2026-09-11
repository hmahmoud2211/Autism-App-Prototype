import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { AppText } from '@/components/common/AppText';
import { Card } from '@/components/common/Card';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { EmptyState } from '@/components/common/EmptyState';
import { DevelopmentAreaCard } from '@/components/dashboard/DevelopmentAreaCard';
import { RadarChart } from '@/components/charts/RadarChart';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { CATEGORY_THEME } from '@/constants/categories';
import { SUPPORT_AREAS_LEAD, PROFESSIONAL_NUDGE, DISCLAIMER } from '@/data/copy/guardrailedStrings';
import { useChildStore } from '@/stores/childStore';
import { useAssessmentStore } from '@/stores/assessmentStore';
import type { DevelopmentAreaId } from '@/types/child';

// The 6 categories shown on the radar chart, matching spec section 10.
const RADAR_AREAS: DevelopmentAreaId[] = [
  'social_interaction',
  'joint_attention',
  'communication',
  'sensory_regulation',
  'behavior_emotions',
  'daily_living',
];

interface Props {
  navigation: NativeStackScreenProps<any>['navigation'];
}

export function DevelopmentProfileScreen({ navigation }: Props) {
  const child = useChildStore((s) => s.activeChild());
  const profile = useAssessmentStore((s) => (child ? s.latestProfile(child.id) : undefined));

  if (!child || !profile) {
    return (
      <ScreenContainer>
        <AppHeader title="Development Profile" onBack={() => navigation.goBack()} />
        <EmptyState
          icon="analytics-outline"
          title="No assessment completed yet"
          message="Complete a developmental check-in to see a profile here."
        />
      </ScreenContainer>
    );
  }

  const radarData = RADAR_AREAS.map((area) => {
    const score = profile.areaScores.find((a) => a.area === area);
    return {
      label: CATEGORY_THEME[area].shortLabel,
      value: score?.score ?? 0,
      color: CATEGORY_THEME[area].color,
    };
  });

  return (
    <ScreenContainer scroll>
      <AppHeader title="Development Profile" subtitle={child.name} onBack={() => navigation.goBack()} />

      <Card style={styles.chartCard}>
        <RadarChart data={radarData} />
      </Card>

      <AppText variant="h3" style={styles.sectionHeading}>
        {SUPPORT_AREAS_LEAD}
      </AppText>
      {profile.supportAreas.length === 0 ? (
        <AppText variant="body" color={colors.textSecondary} style={styles.noneText}>
          Nothing stands out right now — great progress across the board!
        </AppText>
      ) : (
        profile.supportAreas.map((area, i) => (
          <AppText key={area} variant="body" style={styles.supportItem}>
            {i + 1}. {CATEGORY_THEME[area].label}
          </AppText>
        ))
      )}

      <AppText variant="bodySmall" color={colors.textSecondary} style={styles.nudge}>
        {PROFESSIONAL_NUDGE}
      </AppText>

      <AppText variant="h3" style={styles.sectionHeading}>
        All Areas
      </AppText>
      {profile.areaScores.map((areaScore) => (
        <DevelopmentAreaCard key={areaScore.area} areaScore={areaScore} />
      ))}

      <View style={styles.disclaimerBox}>
        <AppText variant="caption" color={colors.textSecondary}>
          {DISCLAIMER}
        </AppText>
      </View>

      <PrimaryButton
        label="View Personalized Plan"
        onPress={() => navigation.navigate('PersonalizedPlan')}
        style={styles.cta}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  chartCard: { alignItems: 'center', paddingVertical: spacing.xl, marginBottom: spacing.lg },
  sectionHeading: { marginTop: spacing.md, marginBottom: spacing.sm },
  noneText: { marginBottom: spacing.md },
  supportItem: { marginBottom: spacing.xs },
  nudge: { marginTop: spacing.md, marginBottom: spacing.lg },
  disclaimerBox: { marginTop: spacing.lg, marginBottom: spacing.lg },
  cta: { marginBottom: spacing.lg },
});
