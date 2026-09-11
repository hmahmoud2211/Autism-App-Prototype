import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface WeeklyBarChartProps {
  data: { week: string; value: number }[];
  maxValue?: number;
}

export function WeeklyBarChart({ data, maxValue = 100 }: WeeklyBarChartProps) {
  return (
    <View style={styles.row}>
      {data.map((d) => (
        <View key={d.week} style={styles.col}>
          <AppText variant="caption" color={colors.textSecondary}>
            {d.value}
          </AppText>
          <View style={styles.track}>
            <View
              style={[
                styles.bar,
                { height: `${Math.max(4, Math.min(100, (d.value / maxValue) * 100))}%` },
              ]}
            />
          </View>
          <AppText variant="caption" color={colors.textSecondary}>
            {d.week.replace('Week ', 'W')}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', height: 160, gap: spacing.md },
  col: { flex: 1, alignItems: 'center', height: '100%', justifyContent: 'flex-end' },
  track: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: spacing.xs,
  },
  bar: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 8,
    minHeight: 6,
  },
});
