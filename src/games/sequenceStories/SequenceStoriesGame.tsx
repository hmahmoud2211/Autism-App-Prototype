import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { AppText } from '@/components/common/AppText';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { colors } from '@/constants/colors';
import { spacing, radius } from '@/constants/spacing';
import { shuffle } from '@/games/engine/trialUtils';
import type { GameEngineProps } from '@/games/engine/types';
import { buildSequenceRounds, type SequenceCard } from './trials';

export function SequenceStoriesGame({ level, onProgress, onFinish }: GameEngineProps) {
  const rounds = useMemo(() => buildSequenceRounds(level.level, level.trials), [level.level, level.trials]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [available, setAvailable] = useState<SequenceCard[]>(() => shuffle(rounds[0].steps));
  const [chosen, setChosen] = useState<SequenceCard[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const firstTryCorrect = useRef(0);
  const attemptedFirstTryThisRound = useRef(false);

  const round = rounds[roundIndex];

  function handlePickCard(card: SequenceCard) {
    if (feedback) return;
    setChosen((c) => [...c, card]);
    setAvailable((a) => a.filter((c) => c.id !== card.id));
  }

  function handleReset() {
    setChosen([]);
    setAvailable(shuffle(round.steps));
    setFeedback(null);
  }

  function handleCheck() {
    const isCorrect = chosen.every((c, i) => c.id === round.steps[i].id);
    if (!attemptedFirstTryThisRound.current) {
      attemptedFirstTryThisRound.current = true;
      if (isCorrect) firstTryCorrect.current += 1;
    }
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      setTimeout(() => {
        const nextIndex = roundIndex + 1;
        onProgress(nextIndex, rounds.length);
        if (nextIndex < rounds.length) {
          attemptedFirstTryThisRound.current = false;
          setRoundIndex(nextIndex);
          setAvailable(shuffle(rounds[nextIndex].steps));
          setChosen([]);
          setFeedback(null);
        } else {
          const accuracy = firstTryCorrect.current / rounds.length;
          onFinish({
            score: Math.round(accuracy * 100),
            correctAnswers: firstTryCorrect.current,
            totalQuestions: rounds.length,
            success: accuracy >= level.unlockThresholdAccuracy,
          });
        }
      }, 700);
    } else {
      setTimeout(handleReset, 900);
    }
  }

  return (
    <View style={styles.container}>
      <AppText variant="h3" center style={styles.roundTitle}>
        {round.title}
      </AppText>
      <AppText variant="bodySmall" color={colors.textSecondary} center style={styles.instructions}>
        Tap the pictures in the right order, then check your answer.
      </AppText>

      <View style={styles.sequenceRow}>
        {round.steps.map((_, i) => {
          const card = chosen[i];
          return (
            <View key={i} style={[styles.slot, feedback === 'correct' && styles.slotCorrect, feedback === 'incorrect' && styles.slotIncorrect]}>
              {card ? <AppText style={styles.emoji}>{card.emoji}</AppText> : <AppText variant="caption" color={colors.textSecondary}>{i + 1}</AppText>}
            </View>
          );
        })}
      </View>

      {feedback === 'incorrect' ? (
        <AppText variant="bodySmall" color={colors.red} center style={styles.feedbackText}>
          Not quite — let's try again!
        </AppText>
      ) : feedback === 'correct' ? (
        <AppText variant="bodySmall" color={colors.green} center style={styles.feedbackText}>
          Great job!
        </AppText>
      ) : null}

      <View style={styles.availableGrid}>
        {available.map((card) => (
          <Animated.View key={card.id} entering={FadeIn.duration(150)}>
            <Pressable
              onPress={() => handlePickCard(card)}
              accessibilityRole="button"
              accessibilityLabel={card.label}
              style={styles.availableCard}
            >
              <AppText style={styles.emoji}>{card.emoji}</AppText>
              <AppText variant="caption" center>
                {card.label}
              </AppText>
            </Pressable>
          </Animated.View>
        ))}
      </View>

      <View style={styles.actions}>
        {chosen.length > 0 && !feedback ? (
          <Pressable onPress={handleReset} accessibilityRole="button" accessibilityLabel="Start over" style={styles.resetButton}>
            <Ionicons name="refresh" size={18} color={colors.textSecondary} />
          </Pressable>
        ) : null}
        <PrimaryButton
          label="Check"
          onPress={handleCheck}
          disabled={chosen.length !== round.steps.length || !!feedback}
          style={styles.checkButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  roundTitle: { marginBottom: spacing.xs },
  instructions: { marginBottom: spacing.lg },
  sequenceRow: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm, marginBottom: spacing.md },
  slot: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotCorrect: { borderColor: colors.green, borderStyle: 'solid', backgroundColor: `${colors.green}14` },
  slotIncorrect: { borderColor: colors.red, borderStyle: 'solid', backgroundColor: `${colors.red}14` },
  feedbackText: { marginBottom: spacing.md },
  availableGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.md, marginTop: spacing.md },
  availableCard: {
    width: 76,
    height: 76,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 26 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.xl },
  resetButton: { padding: spacing.sm },
  checkButton: { flex: 1 },
});
