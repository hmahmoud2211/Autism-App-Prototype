import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { spacing, radius } from '@/constants/spacing';

interface SuggestedQuestionChipProps {
  text: string;
  onPress: () => void;
}

export function SuggestedQuestionChip({ text, onPress }: SuggestedQuestionChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={text}
      style={({ pressed }) => [styles.chip, pressed && styles.pressed]}
    >
      <AppText variant="bodySmall" color={colors.primary}>
        {text}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.card,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  pressed: { opacity: 0.7 },
});
