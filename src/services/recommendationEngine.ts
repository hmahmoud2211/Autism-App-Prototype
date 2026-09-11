import type { AgeGroupId, DevelopmentAreaId } from '@/types/child';
import type { SectionResponse } from '@/types/questionnaire';
import { recommendedGameFor } from '@/data/gameRecommendationMap';
import { getGameById } from '@/data/games';

/**
 * Spec section 8 rule, applied literally: 2 or more "Not Sure" answers within
 * a section triggers a recommended clarification game — this is a count, not
 * a ratio, and does not depend on how many questions were otherwise answered.
 */
export function needsClarification(section: SectionResponse): boolean {
  return section.notSureCount >= 2;
}

export function recommendedGameForSection(area: DevelopmentAreaId, ageGroup: AgeGroupId) {
  const gameId = recommendedGameFor(area, ageGroup);
  return gameId ? getGameById(gameId) : undefined;
}
