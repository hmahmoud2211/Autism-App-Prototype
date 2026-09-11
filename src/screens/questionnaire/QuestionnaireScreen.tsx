import React, { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppText } from '@/components/common/AppText';
import { ProgressBar } from '@/components/common/ProgressBar';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { Modal } from '@/components/common/Modal';
import { QuestionCard } from '@/components/questionnaire/QuestionCard';
import { AnswerButton } from '@/components/questionnaire/AnswerButton';
import { SectionProgressList } from '@/components/questionnaire/SectionProgressList';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { QUESTIONNAIRE_SECTIONS } from '@/data/questionnaire';
import type { QuestionnaireStackParamList } from '@/navigation/types';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { useChildStore } from '@/stores/childStore';
import { nextSectionAfter } from '@/services/questionnaireFlow';
import type { Answer } from '@/types/questionnaire';

type Props = NativeStackScreenProps<QuestionnaireStackParamList, 'QuestionnaireQuestion'>;

export function QuestionnaireScreen({ navigation }: Props) {
  const child = useChildStore((s) => s.activeChild());
  const session = useAssessmentStore((s) => (child ? s.sessionsByChild[child.id] : undefined));
  const answerQuestion = useAssessmentStore((s) => s.answerQuestion);
  const setCursor = useAssessmentStore((s) => s.setCursor);
  const completeSession = useAssessmentStore((s) => s.completeSession);
  const [showSections, setShowSections] = useState(false);

  if (!child || !session) {
    return (
      <ScreenContainer>
        <AppText variant="body" center style={styles.emptyPad}>
          No active check-in found. Please go back and start again.
        </AppText>
      </ScreenContainer>
    );
  }

  const section = QUESTIONNAIRE_SECTIONS[session.currentSectionIndex];
  const question = section.questions[session.currentQuestionIndex];
  const sectionResponse = session.sections[section.id];
  const selectedAnswer = sectionResponse.answers[question.id];

  const totalQuestions = QUESTIONNAIRE_SECTIONS.length * 5;
  const answeredSoFar = session.currentSectionIndex * 5 + session.currentQuestionIndex;

  function goToNextSectionOrFinish() {
    const next = nextSectionAfter(section.id);
    if (next) {
      setCursor(child!.id, next.sectionIndex, 0);
    } else {
      completeSession(child!.id);
      navigation.navigate('AssessmentComplete');
    }
  }

  function handleSelect(answer: Answer) {
    answerQuestion(child!.id, section.id, question.id, answer);
  }

  function handleNext() {
    if (!selectedAnswer) return;
    const isLastQuestionInSection = session!.currentQuestionIndex === section.questions.length - 1;
    if (!isLastQuestionInSection) {
      setCursor(child!.id, session!.currentSectionIndex, session!.currentQuestionIndex + 1);
      return;
    }
    // Re-read the freshest section state (answerQuestion already updated notSureCount/needsClarification).
    const freshSection = useAssessmentStore.getState().sessionsByChild[child!.id].sections[section.id];
    if (freshSection.needsClarification && !freshSection.gameResultId && !freshSection.gameSkipped) {
      navigation.navigate('SectionReview', { sectionId: section.id });
      return;
    }
    goToNextSectionOrFinish();
  }

  function handleBack() {
    if (session!.currentQuestionIndex > 0) {
      setCursor(child!.id, session!.currentSectionIndex, session!.currentQuestionIndex - 1);
    } else if (session!.currentSectionIndex > 0) {
      setCursor(child!.id, session!.currentSectionIndex - 1, 4);
    } else {
      navigation.goBack();
    }
  }

  return (
    <ScreenContainer scroll>
      <View style={styles.topRow}>
        <Pressable onPress={handleBack} accessibilityRole="button" accessibilityLabel="Back" hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <AppText variant="bodyMedium" color={colors.textSecondary}>
          Question {session.currentQuestionIndex + 1} of {section.questions.length}
        </AppText>
        <Pressable onPress={() => setShowSections(true)} accessibilityRole="button" accessibilityLabel="View all sections">
          <Ionicons name="list-outline" size={22} color={colors.primary} />
        </Pressable>
      </View>

      <AppText variant="caption" color={colors.textSecondary} style={styles.sectionLabel}>
        SECTION
      </AppText>
      <AppText variant="h2" style={styles.sectionTitle}>
        {section.title}
      </AppText>
      <ProgressBar progress={answeredSoFar / totalQuestions} />

      <View style={styles.spacer} />
      <QuestionCard question={question} />

      <AnswerButton answer="yes" selected={selectedAnswer === 'yes'} onPress={() => handleSelect('yes')} />
      <AnswerButton answer="no" selected={selectedAnswer === 'no'} onPress={() => handleSelect('no')} />
      <AnswerButton answer="not_sure" selected={selectedAnswer === 'not_sure'} onPress={() => handleSelect('not_sure')} />

      <View style={styles.navRow}>
        <SecondaryButton label="Previous" onPress={handleBack} variant="ghost" style={styles.navButton} />
        <PrimaryButton label="Next" onPress={handleNext} disabled={!selectedAnswer} style={styles.navButton} />
      </View>

      <Modal visible={showSections} onClose={() => setShowSections(false)}>
        <AppText variant="h3" style={styles.modalTitle}>
          Questionnaire
        </AppText>
        <SectionProgressList session={session} currentSectionIndex={session.currentSectionIndex} />
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  emptyPad: { padding: spacing.xxl },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  sectionLabel: { letterSpacing: 1 },
  sectionTitle: { marginBottom: spacing.md },
  spacer: { height: spacing.lg },
  navRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm },
  navButton: { flex: 1 },
  modalTitle: { marginBottom: spacing.md },
});
