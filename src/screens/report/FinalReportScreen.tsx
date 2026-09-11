import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { AppText } from '@/components/common/AppText';
import { Card } from '@/components/common/Card';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { EmptyState } from '@/components/common/EmptyState';
import { Modal } from '@/components/common/Modal';
import { RadarChart } from '@/components/charts/RadarChart';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { CATEGORY_THEME } from '@/constants/categories';
import { DISCLAIMER, PROFESSIONAL_NUDGE, REPORT_EXPORT_MESSAGE } from '@/data/copy/guardrailedStrings';
import { PARENT_GUIDES } from '@/data/parentGuides';
import { useChildStore } from '@/stores/childStore';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { useGameStore } from '@/stores/gameStore';
import { ageFromDob, formatFriendlyDate } from '@/utils/date';
import { navigateToWeeklyPlan } from '@/navigation/navigationRef';
import type { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FinalReport'>;

const RADAR_AREAS: (keyof typeof CATEGORY_THEME)[] = [
  'social_interaction',
  'joint_attention',
  'communication',
  'sensory_regulation',
  'behavior_emotions',
  'daily_living',
];

export function FinalReportScreen({ navigation }: Props) {
  const child = useChildStore((s) => s.activeChild());
  const profile = useAssessmentStore((s) => (child ? s.latestProfile(child.id) : undefined));
  const gamesCompleted = useGameStore((s) => (child ? s.resultsForChild(child.id).length : 0));
  const [showExportModal, setShowExportModal] = useState(false);

  if (!child || !profile) {
    return (
      <ScreenContainer>
        <AppHeader title="Final Report" onBack={() => navigation.goBack()} />
        <EmptyState icon="document-text-outline" title="No report available" message="Complete a check-in first." />
      </ScreenContainer>
    );
  }

  const radarData = RADAR_AREAS.map((area) => {
    const score = profile.areaScores.find((a) => a.area === area);
    return { label: CATEGORY_THEME[area].shortLabel, value: score?.score ?? 0, color: CATEGORY_THEME[area].color };
  });

  return (
    <ScreenContainer scroll>
      <AppHeader title="Development Report" onBack={() => navigation.goBack()} />

      <Card style={styles.card}>
        <AppText variant="h2">{child.name}</AppText>
        <AppText variant="bodySmall" color={colors.textSecondary}>
          Age {ageFromDob(child.dob)} · Assessed {formatFriendlyDate(profile.createdAt)}
        </AppText>
      </Card>

      <Card style={[styles.card, styles.chartCard]}>
        <AppText variant="h3" style={styles.heading}>
          Development Overview
        </AppText>
        <RadarChart data={radarData} size={230} />
      </Card>

      <Card style={styles.card}>
        <AppText variant="h3" style={styles.heading}>
          Area Scores
        </AppText>
        {profile.areaScores.map((a) => (
          <View key={a.area} style={styles.scoreRow}>
            <AppText variant="body">{CATEGORY_THEME[a.area].label}</AppText>
            <AppText variant="bodyMedium" color={colors.primary}>
              {a.score}
            </AppText>
          </View>
        ))}
      </Card>

      <Card style={styles.card}>
        <AppText variant="h3" style={styles.heading}>
          Activities Completed
        </AppText>
        <AppText variant="body" color={colors.textSecondary}>
          {gamesCompleted} activities completed so far.
        </AppText>
      </Card>

      <Card style={styles.card}>
        <AppText variant="h3" style={styles.heading}>
          Recommended Support Areas
        </AppText>
        {profile.supportAreas.map((area, i) => (
          <AppText key={area} variant="body" style={styles.listItem}>
            {i + 1}. {CATEGORY_THEME[area].label}
          </AppText>
        ))}
      </Card>

      <Card style={styles.card}>
        <AppText variant="h3" style={styles.heading}>
          Parent Guidance
        </AppText>
        <AppText variant="body" color={colors.textSecondary}>
          {PROFESSIONAL_NUDGE}
        </AppText>
        <AppText variant="bodySmall" color={colors.primary} style={styles.guideLink}>
          See "{PARENT_GUIDES[0].title}" in the Parent Guide for more.
        </AppText>
      </Card>

      <AppText variant="caption" color={colors.textSecondary} style={styles.disclaimer}>
        {DISCLAIMER}
      </AppText>

      <PrimaryButton label="View Weekly Plan" onPress={navigateToWeeklyPlan} style={styles.button} />
      <SecondaryButton label="Export Report" onPress={() => setShowExportModal(true)} style={styles.button} />
      <SecondaryButton label="Return Home" variant="ghost" onPress={() => navigation.navigate('Main')} />

      <Modal visible={showExportModal} onClose={() => setShowExportModal(false)}>
        <AppText variant="h3" style={styles.heading}>
          Export Report
        </AppText>
        <AppText variant="body" color={colors.textSecondary}>
          {REPORT_EXPORT_MESSAGE}
        </AppText>
        <PrimaryButton label="Got it" onPress={() => setShowExportModal(false)} style={styles.modalButton} />
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md },
  chartCard: { alignItems: 'center' },
  heading: { marginBottom: spacing.sm },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.xs },
  listItem: { marginBottom: spacing.xs },
  guideLink: { marginTop: spacing.sm },
  disclaimer: { marginVertical: spacing.md },
  button: { marginBottom: spacing.sm },
  modalButton: { marginTop: spacing.lg },
});
