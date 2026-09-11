import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/common/Card';
import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import type { GameLevelConfig } from '@/types/game';

interface LevelCardProps {
  level: GameLevelConfig;
  locked: boolean;
  onPress: () => void;
}

export function LevelCard({ level, locked, onPress }: LevelCardProps) {
  return (
    <Card
      onPress={locked ? undefined : onPress}
      style={[styles.card, locked && styles.locked]}
      accessibilityLabel={locked ? `${level.label}, locked` : level.label}
    >
      <View style={styles.row}>
        <View style={styles.info}>
          <AppText variant="h3">{level.label}</AppText>
          <AppText variant="bodySmall" color={colors.textSecondary}>
            {level.description}
          </AppText>
          {locked ? (
            <AppText variant="caption" color={colors.textSecondary} style={styles.lockedText}>
              Complete Level {level.level - 1} to unlock
            </AppText>
          ) : null}
        </View>
        <Ionicons
          name={locked ? 'lock-closed' : 'play-circle'}
          size={28}
          color={locked ? colors.textSecondary : colors.primary}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md },
  locked: { opacity: 0.6 },
  row: { flexDirection: 'row', alignItems: 'center' },
  info: { flex: 1 },
  lockedText: { marginTop: spacing.xs },
});
