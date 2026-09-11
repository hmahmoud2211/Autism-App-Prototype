// Prototype scoring only.
// This is not a clinically validated assessment algorithm.
// It exists purely to drive the UI demo (radar chart, support-area lists,
// personalized plan) with numbers that react to real local input.

import { CATEGORY_THEME } from '@/constants/categories';
import { getSectionById } from '@/data/questionnaire';
import type { DevelopmentAreaId } from '@/types/child';
import type { AreaScore, AreaScoreLabel, DevelopmentProfile } from '@/types/assessment';
import type { GameResult } from '@/types/game';
import type { SectionResponse } from '@/types/questionnaire';
import { generateId } from '@/utils/id';

const YES_POINTS = 2;
const NOT_SURE_POINTS = 1;
const NO_POINTS = 0;
const QUESTIONNAIRE_WEIGHT = 0.6;
const GAME_WEIGHT = 0.4;

function labelForScore(score: number): AreaScoreLabel {
  if (score >= 75) return 'Developing Well';
  if (score >= 50) return 'Continue Practice';
  return 'May Benefit From Support';
}

/** Points for one answer, accounting for whether "yes" or "no" is the expected direction. */
function pointsForAnswer(answer: SectionResponse['answers'][string], positiveOrientation: boolean): number {
  if (answer === 'not_sure') return NOT_SURE_POINTS;
  const isExpected = (answer === 'yes' && positiveOrientation) || (answer === 'no' && !positiveOrientation);
  return isExpected ? YES_POINTS : NO_POINTS;
}

export function scoreQuestionnaireOnly(section: SectionResponse): number {
  const meta = getSectionById(section.sectionId);
  if (!meta) return 0;
  let points = 0;
  const max = meta.questions.length * YES_POINTS;
  for (const q of meta.questions) {
    const answer = section.answers[q.id];
    if (answer) points += pointsForAnswer(answer, q.positiveOrientation);
  }
  return Math.round((points / max) * 100);
}

/** Normalizes a raw GameResult.score (already 0-100 by convention) defensively. */
function normalizeGameScore(result: GameResult): number {
  return Math.max(0, Math.min(100, Math.round(result.score)));
}

export function scoreArea(section: SectionResponse, gameResult?: GameResult): AreaScore {
  const questionnairePct = scoreQuestionnaireOnly(section);
  const usedGameData = !!gameResult;
  const score = usedGameData
    ? Math.round(questionnairePct * QUESTIONNAIRE_WEIGHT + normalizeGameScore(gameResult!) * GAME_WEIGHT)
    : questionnairePct;
  return {
    area: section.sectionId,
    score,
    label: labelForScore(score),
    usedGameData,
  };
}

export function buildDevelopmentProfile(
  childId: string,
  sessionId: string,
  sections: SectionResponse[],
  gameResultsBySection: Partial<Record<DevelopmentAreaId, GameResult>>,
): DevelopmentProfile {
  const areaScores = sections.map((s) => scoreArea(s, gameResultsBySection[s.sectionId]));
  const sorted = [...areaScores].sort((a, b) => a.score - b.score);
  const supportAreas = sorted.filter((a) => a.score < 75).slice(0, 4).map((a) => a.area);
  const strongAreas = sorted
    .filter((a) => a.score >= 75)
    .slice(-3)
    .map((a) => a.area)
    .reverse();

  return {
    id: generateId('profile'),
    childId,
    sessionId,
    createdAt: new Date().toISOString(),
    areaScores,
    supportAreas,
    strongAreas,
  };
}

export function areaLabel(area: DevelopmentAreaId): string {
  return CATEGORY_THEME[area].label;
}
