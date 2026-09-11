import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from '@/components/common/Card';
import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface GameResultCardProps {
  label: string;
  value: string;
}

export function GameResultCard({ label, value }: GameResultCardProps) {
  return (
    <Card style={styles.card}>
      <AppText variant="h2" color={colors.primary}>
        {value}
      </AppText>
      <AppText variant="bodySmall" color={colors.textSecondary}>
        {label}
      </AppText>
    </Card>
  );
}

export function GameResultRow({ children }: { children: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { flex: 1, alignItems: 'center' },
  row: { flexDirection: 'row', gap: spacing.md },
});
