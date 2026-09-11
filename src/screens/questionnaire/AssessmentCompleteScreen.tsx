import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppText } from '@/components/common/AppText';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { ASSESSMENT_COMPLETE_TITLE, assessmentCompleteBody } from '@/data/copy/guardrailedStrings';
import type { QuestionnaireStackParamList } from '@/navigation/types';
import { useChildStore } from '@/stores/childStore';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { useGameStore } from '@/stores/gameStore';
import { usePlanStore } from '@/stores/planStore';
import { buildDevelopmentProfile } from '@/services/mockScoringEngine';
import { generatePersonalizedPlan, generateWeeklyPlan } from '@/services/planGenerator';

type Props = NativeStackScreenProps<QuestionnaireStackParamList, 'AssessmentComplete'>;

export function AssessmentCompleteScreen({ navigation }: Props) {
  const child = useChildStore((s) => s.activeChild());
  const computed = useRef(false);

  useEffect(() => {
    if (!child || computed.current) return;
    computed.current = true;

    const session = useAssessmentStore.getState().sessionsByChild[child.id];
    if (!session) return;
    const alreadyHasProfile = useAssessmentStore.getState().latestProfile(child.id);
    if (alreadyHasProfile && alreadyHasProfile.sessionId === session.id) return;

    const sections = Object.values(session.sections);
    const gameResultsByArea = Object.fromEntries(
      sections
        .filter((s) => s.gameResultId)
        .map((s) => [s.sectionId, useGameStore.getState().results.find((r) => r.id === s.gameResultId)!])
        .filter(([, result]) => !!result),
    );

    const profile = buildDevelopmentProfile(child.id, session.id, sections, gameResultsByArea);
    useAssessmentStore.getState().addProfile(child.id, profile);

    const personalizedPlan = generatePersonalizedPlan(child.ageGroup, profile);
    usePlanStore.getState().setPersonalizedPlan(personalizedPlan);
    const todayIndex = Math.min(4, Math.max(0, new Date().getDay() - 1));
    const weeklyPlan = generateWeeklyPlan(child.ageGroup, personalizedPlan, todayIndex);
    usePlanStore.getState().setWeeklyPlan(weeklyPlan);
  }, [child]);

  return (
    <ScreenContainer contentStyle={styles.center}>
      <View style={styles.iconWrap}>
        <Ionicons name="checkmark-done-circle" size={56} color={colors.green} />
      </View>
      <AppText variant="h1" center style={styles.title}>
        {ASSESSMENT_COMPLETE_TITLE}
      </AppText>
      <AppText variant="body" color={colors.textSecondary} center style={styles.body}>
        {assessmentCompleteBody(child?.name ?? 'your child')}
      </AppText>

      <PrimaryButton
        label="View Development Profile"
        onPress={() => navigation.navigate('DevelopmentProfile')}
        style={styles.cta}
      />
      <SecondaryButton
        label="View Personalized Plan"
        onPress={() => navigation.navigate('PersonalizedPlan')}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  iconWrap: { marginBottom: spacing.xl },
  title: { marginBottom: spacing.md },
  body: { marginBottom: spacing.xxl },
  cta: { marginBottom: spacing.sm, alignSelf: 'stretch' },
});
