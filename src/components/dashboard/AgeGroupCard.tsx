import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/common/Card';
import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import type { AgeGroupMeta } from '@/data/ageGroups';

interface AgeGroupCardProps {
  ageGroup: AgeGroupMeta;
  selected: boolean;
  onPress: () => void;
  suggested?: boolean;
}

export function AgeGroupCard({ ageGroup, selected, onPress, suggested }: AgeGroupCardProps) {
  return (
    <Card
      onPress={onPress}
      style={[styles.card, selected && styles.selected]}
      accessibilityLabel={`${ageGroup.label}, ${ageGroup.name}`}
    >
      <View style={styles.row}>
        <View style={[styles.iconWrap, selected && styles.iconWrapSelected]}>
          <Ionicons name={ageGroup.icon as any} size={26} color={selected ? colors.textInverse : colors.primary} />
        </View>
        <View style={styles.info}>
          <View style={styles.titleRow}>
            <AppText variant="h3">{ageGroup.label}</AppText>
            {suggested ? (
              <View style={styles.suggestedPill}>
                <AppText variant="caption" color={colors.primary}>
                  Suggested
                </AppText>
              </View>
            ) : null}
          </View>
          <AppText variant="bodyMedium" color={colors.textSecondary}>
            {ageGroup.name}
          </AppText>
          <AppText variant="bodySmall" color={colors.textSecondary} style={styles.desc}>
            {ageGroup.description}
          </AppText>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md },
  selected: { borderWidth: 2, borderColor: colors.primary },
  row: { flexDirection: 'row' },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: `${colors.primary}1A`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconWrapSelected: { backgroundColor: colors.primary },
  info: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  suggestedPill: {
    backgroundColor: `${colors.primary}1A`,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 999,
  },
  desc: { marginTop: spacing.xs },
});
