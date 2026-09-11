import React, { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { AppText } from '@/components/common/AppText';
import { Card } from '@/components/common/Card';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import type { Question } from '@/types/questionnaire';

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const [showHelp, setShowHelp] = useState(false);
  const hasHelp = !!(question.explanation || question.example);

  return (
    <Animated.View entering={FadeIn.duration(250)}>
      <Card style={styles.card}>
        <AppText variant="h2" style={styles.question}>
          {question.question}
        </AppText>

        {hasHelp && (
          <Pressable
            onPress={() => setShowHelp((v) => !v)}
            accessibilityRole="button"
            accessibilityLabel={showHelp ? 'Hide example' : 'What does this mean?'}
            style={styles.helpToggle}
          >
            <Ionicons name="information-circle-outline" size={18} color={colors.primary} />
            <AppText variant="bodyMedium" color={colors.primary} style={styles.helpToggleLabel}>
              {showHelp ? 'Hide example' : 'What does this mean?'}
            </AppText>
          </Pressable>
        )}

        {showHelp && (
          <View style={styles.helpBox}>
            {question.explanation ? (
              <AppText variant="bodySmall" color={colors.textSecondary} style={styles.helpText}>
                {question.explanation}
              </AppText>
            ) : null}
            {question.example ? (
              <AppText variant="bodySmall" color={colors.textSecondary} style={styles.helpText}>
                {question.example}
              </AppText>
            ) : null}
          </View>
        )}
      </Card>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.xl },
  question: { marginBottom: spacing.sm },
  helpToggle: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
  helpToggleLabel: { marginLeft: spacing.xs },
  helpBox: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.background,
  },
  helpText: { marginBottom: spacing.xs },
});
