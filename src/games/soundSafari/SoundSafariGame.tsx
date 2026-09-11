import React, { useMemo } from 'react';
import { ChoiceTrialGame } from '@/games/engine/ChoiceTrialGame';
import type { GameEngineProps } from '@/games/engine/types';
import { useChildStore } from '@/stores/childStore';
import { buildSoundSafariTrials, buildNameResponseTrials } from './trials';

/** Powers "Sound Safari" (sensory regulation) and "Name Game" (response to name) family games. */
export function SoundSafariGame({ game, level, onProgress, onFinish }: GameEngineProps) {
  const childName = useChildStore((s) => s.activeChild()?.name ?? 'your child');

  const trials = useMemo(() => {
    if (game.contentSetId === 'nameResponse') return buildNameResponseTrials(level.level, level.trials, childName);
    return buildSoundSafariTrials(level.level, level.trials);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.contentSetId, level.level, level.trials, childName]);

  return (
    <ChoiceTrialGame
      trials={trials}
      onProgress={onProgress}
      onFinish={({ correct, total, avgResponseTime, attempts }) => {
        const accuracy = correct / total;
        onFinish({
          score: Math.round(accuracy * 100),
          correctAnswers: correct,
          totalQuestions: total,
          responseTime: avgResponseTime,
          attempts,
          success: accuracy >= level.unlockThresholdAccuracy,
        });
      }}
    />
  );
}
