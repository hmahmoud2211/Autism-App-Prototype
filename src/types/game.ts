import type { AgeGroupId, DevelopmentAreaId } from './child';

export type EngineId =
  | 'gazeFollow'
  | 'emotionRecognition'
  | 'soundMatch'
  | 'memoryMatch'
  | 'sequenceOrder'
  | 'poseConfirm'
  | 'shapeMatch';

export type GameCategoryId =
  | 'communication'
  | 'social_interaction'
  | 'joint_attention'
  | 'response_to_name'
  | 'emotions'
  | 'cognitive_skills'
  | 'sensory_skills'
  | 'motor_skills'
  | 'daily_living';

export interface GameLevelConfig {
  level: 1 | 2 | 3;
  label: string;
  description: string;
  trials: number;
  unlockThresholdAccuracy: number; // 0-1
}

export interface GameMeta {
  id: string;
  engineId: EngineId;
  /** Which content pack the engine should render (e.g. 'emotions' vs 'communication' for emotionRecognition). */
  contentSetId: string;
  title: string;
  tagline: string;
  ageGroup: AgeGroupId;
  area: DevelopmentAreaId;
  category: GameCategoryId;
  icon: string;
  estMinutes: string; // e.g. "2-3 min"
  /** true when this game is the canonical §9 recommendation-table entry for its (area, ageGroup). */
  isRecommendable: boolean;
  levels: [GameLevelConfig, GameLevelConfig, GameLevelConfig];
}

export interface GameResult {
  gameId: string;
  childId: string;
  completedAt: string;
  score: number; // 0-100 normalized
  correctAnswers?: number;
  totalQuestions?: number;
  responseTime?: number; // avg seconds
  attempts?: number;
  duration?: number; // seconds
  level: 1 | 2 | 3;
  developmentalArea: DevelopmentAreaId;
  success: boolean; // met unlock threshold
}
