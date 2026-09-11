import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { typography } from '@/constants/typography';
import { colors } from '@/constants/colors';

type Variant = keyof typeof typography;

interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: string;
  center?: boolean;
}

/** Typography-token-driven text component — screens should use this instead of raw <Text>. */
export function AppText({ variant = 'body', color = colors.text, center, style, ...rest }: AppTextProps) {
  return (
    <Text
      style={[styles.base, typography[variant], { color }, center && styles.center, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {},
  center: { textAlign: 'center' },
});
