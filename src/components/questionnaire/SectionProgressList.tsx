import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { QUESTIONNAIRE_SECTIONS } from '@/data/questionnaire';
import type { QuestionnaireSession } from '@/types/questionnaire';

interface SectionProgressListProps {
  session: QuestionnaireSession;
  currentSectionIndex: number;
}

export function SectionProgressList({ session, currentSectionIndex }: SectionProgressListProps) {
  return (
    <View>
      {QUESTIONNAIRE_SECTIONS.map((section, index) => {
        const response = session.sections[section.id];
        const answeredCount = Object.keys(response?.answers ?? {}).length;
        const isDone = answeredCount === section.questions.length && (!response.needsClarification || response.gameResultId || response.gameSkipped);
        const isCurrent = index === currentSectionIndex;

        return (
          <View key={section.id} style={styles.row}>
            <AppText variant={isCurrent ? 'bodyMedium' : 'body'} color={isCurrent ? colors.text : colors.textSecondary}>
              {section.title}
            </AppText>
            {isDone ? (
              <Ionicons name="checkmark-circle" size={18} color={colors.green} />
            ) : answeredCount > 0 ? (
              <AppText variant="bodySmall" color={colors.primary}>
                {answeredCount}/{section.questions.length}
              </AppText>
            ) : (
              <AppText variant="bodySmall" color={colors.textSecondary}>
                —
              </AppText>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
});
