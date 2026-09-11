import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/common/Card';
import { AppText } from '@/components/common/AppText';
import { Badge } from '@/components/common/Badge';
import { CATEGORY_THEME } from '@/constants/categories';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import type { WeeklyActivity } from '@/types/plan';

interface WeeklyActivityCardProps {
  activity: WeeklyActivity;
  onPress?: () => void;
}

const STATUS_CONFIG: Record<WeeklyActivity['status'], { label: string; color: string; icon: keyof typeof Ionicons.glyphMap }> = {
  completed: { label: 'Completed', color: colors.green, icon: 'checkmark-circle' },
  today: { label: 'Today', color: colors.primary, icon: 'flash' },
  upcoming: { label: 'Upcoming', color: colors.textSecondary, icon: 'time-outline' },
};

export function WeeklyActivityCard({ activity, onPress }: WeeklyActivityCardProps) {
  const theme = CATEGORY_THEME[activity.area];
  const status = STATUS_CONFIG[activity.status];

  return (
    <Card onPress={onPress} style={styles.card} accessibilityLabel={`${activity.day}: ${activity.title}, ${status.label}`}>
      <View style={styles.row}>
        <View style={styles.dayCol}>
          <AppText variant="caption" color={colors.textSecondary}>
            {activity.day}
          </AppText>
        </View>
        <View style={[styles.iconWrap, { backgroundColor: theme.pastel }]}>
          <Ionicons name={theme.icon as any} size={20} color={theme.color} />
        </View>
        <View style={styles.info}>
          <AppText variant="bodyMedium">{activity.title}</AppText>
          <AppText variant="caption" color={colors.textSecondary}>
            {activity.durationMinutes} minutes
          </AppText>
        </View>
        <Badge label={status.label} color={status.color} icon={status.icon} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center' },
  dayCol: { width: 40 },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  info: { flex: 1 },
});
