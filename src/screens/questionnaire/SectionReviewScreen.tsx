import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppText } from '@/components/common/AppText';
import { Card } from '@/components/common/Card';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { NOT_SURE_PROMPT_TITLE, notSureExplanation } from '@/data/copy/guardrailedStrings';
import { getSectionById } from '@/data/questionnaire';
import type { QuestionnaireStackParamList } from '@/navigation/types';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { useChildStore } from '@/stores/childStore';
import { nextSectionAfter } from '@/services/questionnaireFlow';

type Props = NativeStackScreenProps<QuestionnaireStackParamList, 'SectionReview'>;

export function SectionReviewScreen({ navigation, route }: Props) {
  const { sectionId } = route.params;
  const section = getSectionById(sectionId)!;
  const child = useChildStore((s) => s.activeChild());
  const markGameSkipped = useAssessmentStore((s) => s.markGameSkipped);
  const completeSession = useAssessmentStore((s) => s.completeSession);
  const setCursor = useAssessmentStore((s) => s.setCursor);
  const notSureCount = useAssessmentStore(
    (s) => (child ? s.sessionsByChild[child.id]?.sections[sectionId]?.notSureCount : 0) ?? 0,
  );

  function goToNextSectionOrFinish() {
    if (!child) return;
    const next = nextSectionAfter(sectionId);
    if (next) {
      setCursor(child.id, next.sectionIndex, 0);
      navigation.navigate('QuestionnaireQuestion');
    } else {
      completeSession(child.id);
      navigation.navigate('AssessmentComplete');
    }
  }

  return (
    <ScreenContainer scroll contentStyle={styles.center}>
      <View style={styles.iconWrap}>
        <Ionicons name="sparkles-outline" size={36} color={colors.primary} />
      </View>
      <AppText variant="h1" center style={styles.title}>
        {NOT_SURE_PROMPT_TITLE}
      </AppText>
      <AppText variant="body" color={colors.textSecondary} center style={styles.body}>
        {notSureExplanation(section.title)}
      </AppText>

      <Card style={styles.summaryCard}>
        <AppText variant="bodyMedium">{section.title}</AppText>
        <AppText variant="bodySmall" color={colors.textSecondary}>
          {notSureCount} of 5 answers were "Not Sure"
        </AppText>
      </Card>

      <PrimaryButton
        label="Play Recommended Activity"
        onPress={() => navigation.navigate('RecommendedGame', { sectionId })}
        style={styles.cta}
      />
      <SecondaryButton
        label="Do This Later"
        variant="ghost"
        onPress={() => {
          if (!child) return;
          markGameSkipped(child.id, sectionId);
          goToNextSectionOrFinish();
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', paddingTop: spacing.xxl },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: `${colors.primary}1A`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: { marginBottom: spacing.md },
  body: { marginBottom: spacing.xl },
  summaryCard: { alignSelf: 'stretch', marginBottom: spacing.xl },
  cta: { marginBottom: spacing.sm },
});
