import React, { useMemo } from 'react';
import { ChoiceTrialGame } from '@/games/engine/ChoiceTrialGame';
import type { GameEngineProps } from '@/games/engine/types';
import { buildJointAttentionTrials, buildSocialAttentionTrials } from './trials';

/** Powers both "Follow Teddy" (joint attention) and "Face Finder" (social attention) family games. */
export function FollowTeddyGame({ game, level, onProgress, onFinish }: GameEngineProps) {
  const trials = useMemo(() => {
    const builder = game.contentSetId === 'socialAttention' ? buildSocialAttentionTrials : buildJointAttentionTrials;
    return builder(level.level, level.trials);
  }, [game.contentSetId, level.level, level.trials]);

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
