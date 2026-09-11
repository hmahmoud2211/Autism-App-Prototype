import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { AppText } from '@/components/common/AppText';
import { LevelCard } from '@/components/games/LevelCard';
import { CATEGORY_THEME } from '@/constants/categories';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { getGameById } from '@/data/games';
import { useChildStore } from '@/stores/childStore';
import { useGameStore } from '@/stores/gameStore';
import type { GameStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<GameStackParamList, 'GameDetails'>;

export function GameDetailsScreen({ navigation, route }: Props) {
  const game = getGameById(route.params.gameId)!;
  const theme = CATEGORY_THEME[game.area];
  const child = useChildStore((s) => s.activeChild());
  const getUnlockedLevel = useGameStore((s) => s.getUnlockedLevel);
  const unlockedLevel = child ? getUnlockedLevel(child.id, game.id) : 1;

  return (
    <ScreenContainer scroll>
      <AppHeader title={game.title} onBack={() => navigation.goBack()} />

      <View style={[styles.hero, { backgroundColor: theme.pastel }]}>
        <Ionicons name={game.icon as any} size={40} color={theme.color} />
      </View>
      <AppText variant="body" color={colors.textSecondary} style={styles.tagline}>
        {game.tagline}
      </AppText>

      <AppText variant="h3" style={styles.sectionHeading}>
        Levels
      </AppText>
      {game.levels.map((level) => (
        <LevelCard
          key={level.level}
          level={level}
          locked={level.level > unlockedLevel}
          onPress={() => navigation.navigate('GamePlay', { gameId: game.id, level: level.level })}
        />
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 120,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  tagline: { marginBottom: spacing.xl },
  sectionHeading: { marginBottom: spacing.sm },
});
