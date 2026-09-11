import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/common/Card';
import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface InsightCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string;
  caption?: string;
  color?: string;
}

export function InsightCard({ icon, title, value, caption, color = colors.primary }: InsightCardProps) {
  return (
    <Card style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: `${color}1A` }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <AppText variant="h2" color={color}>
        {value}
      </AppText>
      <AppText variant="bodySmall" color={colors.textSecondary}>
        {title}
      </AppText>
      {caption ? (
        <AppText variant="caption" color={colors.textSecondary} style={styles.caption}>
          {caption}
        </AppText>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 140 },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  caption: { marginTop: spacing.xs },
});
