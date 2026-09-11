import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { AppText } from '@/components/common/AppText';
import { Card } from '@/components/common/Card';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import type { QuestionnaireStackParamList } from '@/navigation/types';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { useChildStore } from '@/stores/childStore';

type Props = NativeStackScreenProps<QuestionnaireStackParamList, 'QuestionnaireIntro'>;

const STEPS = [
  'Each question asks about behaviors you may observe.',
  'Read carefully and choose the answer that best matches your child.',
  'There are no right or wrong answers.',
  'If you\'re unsure, choose "Not Sure."',
  'NUMU may suggest a short game when additional observation could be helpful.',
];

export function QuestionnaireIntroScreen({ navigation }: Props) {
  const child = useChildStore((s) => s.activeChild());
  const startSession = useAssessmentStore((s) => s.startSession);
  const getSession = useAssessmentStore((s) => s.getSession);

  function handleBegin() {
    if (!child) return;
    const existing = getSession(child.id);
    if (!existing || existing.completedAt) startSession(child.id);
    navigation.navigate('QuestionnaireQuestion');
  }

  return (
    <ScreenContainer scroll>
      <AppHeader title="How to Answer" subtitle={child ? `${child.name}'s check-in` : undefined} onBack={() => navigation.goBack()} />
      {STEPS.map((step, i) => (
        <Card key={step} style={styles.stepCard}>
          <View style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <AppText variant="bodyMedium" color={colors.primary}>
                {i + 1}
              </AppText>
            </View>
            <AppText variant="body" style={styles.stepText}>
              {step}
            </AppText>
          </View>
        </Card>
      ))}
      <Card style={styles.noteCard}>
        <View style={styles.stepRow}>
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.teal} />
          <AppText variant="bodySmall" color={colors.textSecondary} style={styles.stepText}>
            This is not a diagnostic tool. It helps identify areas that may benefit from a closer look.
          </AppText>
        </View>
      </Card>
      <PrimaryButton label="Begin Assessment" onPress={handleBegin} style={styles.cta} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  stepCard: { marginBottom: spacing.sm },
  stepRow: { flexDirection: 'row', alignItems: 'center' },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: `${colors.primary}1A`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stepText: { flex: 1, marginLeft: spacing.sm },
  noteCard: { marginTop: spacing.sm, backgroundColor: '#E8F8F5', marginBottom: spacing.lg },
  cta: { marginTop: spacing.sm },
});
