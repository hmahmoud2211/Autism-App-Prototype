import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/common/AppText';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import type { GameEngineProps } from '@/games/engine/types';
import { buildPoseRounds } from './trials';

export function MoveLikeMeGame({ level, onProgress, onFinish }: GameEngineProps) {
  const rounds = useMemo(() => buildPoseRounds(level.level, level.trials), [level.level, level.trials]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(rounds[0].seconds);
  const completedCount = useRef(0);
  const responseTimes = useRef<number[]>([]);
  const roundStartedAt = useRef(Date.now());
  const settled = useRef(false);

  const round = rounds[roundIndex];

  useEffect(() => {
    onProgress(roundIndex, rounds.length);
    setSecondsLeft(round.seconds);
    roundStartedAt.current = Date.now();
    settled.current = false;

    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          if (!settled.current) advance(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundIndex]);

  function advance(didIt: boolean) {
    if (settled.current) return;
    settled.current = true;
    if (didIt) {
      completedCount.current += 1;
      responseTimes.current.push((Date.now() - roundStartedAt.current) / 1000);
    }
    const nextIndex = roundIndex + 1;
    if (nextIndex < rounds.length) {
      setRoundIndex(nextIndex);
    } else {
      const total = rounds.length;
      const avg = responseTimes.current.length
        ? responseTimes.current.reduce((a, b) => a + b, 0) / responseTimes.current.length
        : 0;
      const accuracy = completedCount.current / total;
      onFinish({
        score: Math.round(accuracy * 100),
        correctAnswers: completedCount.current,
        totalQuestions: total,
        responseTime: Math.round(avg * 10) / 10,
        success: accuracy >= level.unlockThresholdAccuracy,
      });
    }
  }

  return (
    <View style={styles.container}>
      <AppText style={styles.emoji}>{round.pose.emoji}</AppText>
      <AppText variant="h2" center style={styles.label}>
        {round.pose.label}
      </AppText>
      <AppText variant="bodyMedium" color={colors.textSecondary} center style={styles.timer}>
        {secondsLeft}s left
      </AppText>
      <PrimaryButton label="I Did It!" onPress={() => advance(true)} style={styles.cta} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 72, marginBottom: spacing.lg },
  label: { marginBottom: spacing.md },
  timer: { marginBottom: spacing.xxl },
  cta: { paddingHorizontal: spacing.xxl },
});
