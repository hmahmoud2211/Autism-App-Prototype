import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/common/Card';
import { AppText } from '@/components/common/AppText';
import { Badge } from '@/components/common/Badge';
import { CATEGORY_THEME } from '@/constants/categories';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import type { AreaScore } from '@/types/assessment';

interface DevelopmentAreaCardProps {
  areaScore: AreaScore;
  onPress?: () => void;
}

const LABEL_COLOR: Record<AreaScore['label'], string> = {
  'Developing Well': colors.band.developing,
  'Continue Practice': colors.band.practice,
  'May Benefit From Support': colors.band.support,
};

export function DevelopmentAreaCard({ areaScore, onPress }: DevelopmentAreaCardProps) {
  const theme = CATEGORY_THEME[areaScore.area];
  const labelColor = LABEL_COLOR[areaScore.label];

  return (
    <Card onPress={onPress} style={styles.card} accessibilityLabel={`${theme.label}: ${areaScore.label}`}>
      <View style={styles.row}>
        <View style={[styles.iconWrap, { backgroundColor: theme.pastel }]}>
          <Ionicons name={theme.icon as any} size={22} color={theme.color} />
        </View>
        <View style={styles.info}>
          <AppText variant="bodyMedium">{theme.label}</AppText>
          <Badge label={areaScore.label} color={labelColor} />
        </View>
        <AppText variant="h3" color={labelColor}>
          {areaScore.score}
        </AppText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: { flex: 1, gap: spacing.xs },
});
