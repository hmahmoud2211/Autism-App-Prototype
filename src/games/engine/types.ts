import type { GameLevelConfig, GameMeta } from '@/types/game';

export interface GameEngineSummary {
  score: number; // 0-100, normalized
  correctAnswers?: number;
  totalQuestions?: number;
  responseTime?: number; // average seconds per trial
  attempts?: number;
  duration?: number; // total seconds
  success: boolean; // met the level's unlock threshold
}

export interface GameEngineProps {
  game: GameMeta;
  level: GameLevelConfig;
  onProgress: (trialIndex: number, totalTrials: number) => void;
  onFinish: (summary: GameEngineSummary) => void;
}
