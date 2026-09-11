import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/common/Card';
import { AppText } from '@/components/common/AppText';
import { CATEGORY_THEME } from '@/constants/categories';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import type { GameMeta } from '@/types/game';

interface GameCardProps {
  game: GameMeta;
  unlockedLevel: 1 | 2 | 3;
  onPress: () => void;
}

export function GameCard({ game, unlockedLevel, onPress }: GameCardProps) {
  const theme = CATEGORY_THEME[game.area];
  return (
    <Card onPress={onPress} style={styles.card} accessibilityLabel={`${game.title}, ${game.estMinutes}`}>
      <View style={[styles.iconWrap, { backgroundColor: theme.pastel }]}>
        <Ionicons name={game.icon as any} size={26} color={theme.color} />
      </View>
      <AppText variant="bodyMedium" numberOfLines={1}>
        {game.title}
      </AppText>
      <AppText variant="caption" color={colors.textSecondary}>
        Level {unlockedLevel} · {game.estMinutes}
      </AppText>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { width: 150, marginRight: spacing.md },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
});
