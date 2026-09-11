import type { DevelopmentAreaId } from './child';

export type AreaScoreLabel = 'Developing Well' | 'Continue Practice' | 'May Benefit From Support';

export interface AreaScore {
  area: DevelopmentAreaId;
  score: number; // 0-100
  label: AreaScoreLabel;
  usedGameData: boolean;
}

export interface DevelopmentProfile {
  id: string;
  childId: string;
  createdAt: string;
  sessionId: string;
  areaScores: AreaScore[];
  supportAreas: DevelopmentAreaId[]; // lowest-scoring, in priority order
  strongAreas: DevelopmentAreaId[];
}
