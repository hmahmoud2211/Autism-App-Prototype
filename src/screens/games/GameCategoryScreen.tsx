import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { AppText } from '@/components/common/AppText';
import { Card } from '@/components/common/Card';
import { EmptyState } from '@/components/common/EmptyState';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { CATEGORY_THEME } from '@/constants/categories';
import { GAME_LIBRARY_CATEGORIES, getGamesByCategory } from '@/data/games';
import { useChildStore } from '@/stores/childStore';
import { useGameStore } from '@/stores/gameStore';
import type { GameStackParamList } from '@/navigation/types';
import type { GameCategoryId } from '@/types/game';

type Props = NativeStackScreenProps<GameStackParamList, 'GameCategory'>;

export function GameCategoryScreen({ navigation, route }: Props) {
  const categoryId = route.params.categoryId as GameCategoryId;
  const category = GAME_LIBRARY_CATEGORIES.find((c) => c.id === categoryId);
  const child = useChildStore((s) => s.activeChild());
  const getUnlockedLevel = useGameStore((s) => s.getUnlockedLevel);
  const games = getGamesByCategory(categoryId, child?.ageGroup);

  return (
    <ScreenContainer scroll>
      <AppHeader title={category?.label ?? 'Games'} onBack={() => navigation.goBack()} />
      {games.length === 0 ? (
        <EmptyState
          icon="game-controller-outline"
          title="No games yet for this age group"
          message="Try browsing all ages from the Game Library filter."
        />
      ) : (
        games.map((game) => {
          const theme = CATEGORY_THEME[game.area];
          const unlockedLevel = child ? getUnlockedLevel(child.id, game.id) : 1;
          return (
            <Card
              key={game.id}
              onPress={() => navigation.navigate('GameDetails', { gameId: game.id })}
              style={styles.card}
              accessibilityLabel={`${game.title}, level ${unlockedLevel}, ${game.estMinutes}`}
            >
              <View style={styles.row}>
                <View style={[styles.iconWrap, { backgroundColor: theme.pastel }]}>
                  <Ionicons name={game.icon as any} size={24} color={theme.color} />
                </View>
                <View style={styles.info}>
                  <AppText variant="bodyMedium">{game.title}</AppText>
                  <AppText variant="caption" color={colors.textSecondary}>
                    Level {unlockedLevel} · {game.estMinutes}
                  </AppText>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </Card>
          );
        })
      )}
    </ScreenContainer>
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
  info: { flex: 1 },
});
