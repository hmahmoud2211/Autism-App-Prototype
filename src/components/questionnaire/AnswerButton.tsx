import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { spacing, radius } from '@/constants/spacing';
import type { Answer } from '@/types/questionnaire';

const CONFIG: Record<Answer, { label: string; icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  yes: { label: 'Yes', icon: 'checkmark-circle', color: colors.green },
  no: { label: 'No', icon: 'close-circle', color: colors.red },
  not_sure: { label: 'Not Sure', icon: 'help-circle', color: colors.orange },
};

interface AnswerButtonProps {
  answer: Answer;
  selected: boolean;
  onPress: () => void;
}

export function AnswerButton({ answer, selected, onPress }: AnswerButtonProps) {
  const config = CONFIG[answer];
  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress();
      }}
      accessibilityRole="button"
      accessibilityLabel={config.label}
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.base,
        { borderColor: selected ? config.color : colors.border },
        selected && { backgroundColor: `${config.color}14` },
        pressed && styles.pressed,
      ]}
    >
      <Ionicons name={config.icon} size={26} color={selected ? config.color : colors.textSecondary} />
      <AppText variant="h3" color={selected ? config.color : colors.text} style={styles.label}>
        {config.label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.card,
    marginBottom: spacing.md,
    minHeight: 64,
  },
  pressed: { opacity: 0.85 },
  label: { marginLeft: spacing.md },
});
