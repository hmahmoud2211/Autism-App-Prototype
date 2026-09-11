import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from './AppText';
import { spacing, radius } from '@/constants/spacing';
import { colors } from '@/constants/colors';

interface BadgeProps {
  label: string;
  color?: string;
  background?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

/** Never rely on color alone: always paired with a label (and optional icon). */
export function Badge({ label, color = colors.primary, background, icon }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: background ?? `${color}1F` }]}>
      {icon ? <Ionicons name={icon} size={13} color={color} style={styles.icon} /> : null}
      <AppText variant="caption" color={color}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  icon: { marginRight: 4 },
});
