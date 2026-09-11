import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { spacing, radius } from '@/constants/spacing';
import { shuffle } from '@/games/engine/trialUtils';
import type { GameEngineProps } from '@/games/engine/types';

const ITEM_POOL = [
  { id: 'apple', emoji: '🍎', label: 'Apple' },
  { id: 'banana', emoji: '🍌', label: 'Banana' },
  { id: 'car', emoji: '🚗', label: 'Car' },
  { id: 'ball', emoji: '⚽', label: 'Ball' },
  { id: 'dog', emoji: '🐶', label: 'Dog' },
  { id: 'star', emoji: '⭐', label: 'Star' },
];

interface Card {
  key: string;
  itemId: string;
  emoji: string;
}

export function MemoryMatchGame({ level, onProgress, onFinish }: GameEngineProps) {
  const pairCount = Math.min(ITEM_POOL.length, level.trials);
  const cards = useMemo<Card[]>(() => {
    const chosen = shuffle(ITEM_POOL).slice(0, pairCount);
    const pairs = chosen.flatMap((item) => [
      { key: `${item.id}_a`, itemId: item.id, emoji: item.emoji },
      { key: `${item.id}_b`, itemId: item.id, emoji: item.emoji },
    ]);
    return shuffle(pairs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairCount]);

  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    onProgress(matched.length / 2, pairCount);
    if (matched.length === cards.length && cards.length > 0) {
      const durationSec = Math.round((Date.now() - startedAt.current) / 1000);
      const optimalMoves = pairCount;
      const accuracy = Math.min(1, optimalMoves / Math.max(moves, optimalMoves));
      onFinish({
        score: Math.round(accuracy * 100),
        attempts: moves,
        duration: durationSec,
        success: moves <= pairCount * 2.2,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matched]);

  function handleFlip(card: Card) {
    if (locked || flipped.includes(card.key) || matched.includes(card.itemId)) return;
    const nextFlipped = [...flipped, card.key];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setLocked(true);
      setMoves((m) => m + 1);
      const [firstKey, secondKey] = nextFlipped;
      const first = cards.find((c) => c.key === firstKey)!;
      const second = cards.find((c) => c.key === secondKey)!;
      setTimeout(() => {
        if (first.itemId === second.itemId) {
          setMatched((m) => [...m, first.itemId]);
        }
        setFlipped([]);
        setLocked(false);
      }, 650);
    }
  }

  const columns = cards.length <= 6 ? 3 : 4;

  return (
    <View style={styles.container}>
      <AppText variant="bodyMedium" color={colors.textSecondary} center style={styles.movesText}>
        Moves: {moves}
      </AppText>
      <View style={styles.grid}>
        {cards.map((card) => {
          const isRevealed = flipped.includes(card.key) || matched.includes(card.itemId);
          const isMatched = matched.includes(card.itemId);
          return (
            <View key={card.key} style={{ width: `${100 / columns}%`, padding: spacing.xs }}>
              <Pressable
                onPress={() => handleFlip(card)}
                disabled={isRevealed}
                accessibilityRole="button"
                accessibilityLabel={isRevealed ? card.itemId : 'Hidden card'}
              >
                <Animated.View
                  entering={ZoomIn.duration(150)}
                  style={[styles.card, isMatched && styles.cardMatched, isRevealed && styles.cardRevealed]}
                >
                  <AppText style={styles.cardEmoji}>{isRevealed ? card.emoji : '❓'}</AppText>
                </Animated.View>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  movesText: { marginBottom: spacing.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  card: {
    aspectRatio: 1,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardRevealed: { backgroundColor: colors.card, borderWidth: 2, borderColor: colors.border },
  cardMatched: { backgroundColor: `${colors.green}1F`, borderColor: colors.green },
  cardEmoji: { fontSize: 30 },
});
