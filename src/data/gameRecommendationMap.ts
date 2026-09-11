import type { AgeGroupId, DevelopmentAreaId } from '@/types/child';
import { GAME_CATALOG } from './games';

/**
 * Literal (area, ageGroup) -> gameId lookup, matching spec section 9's table
 * exactly (one canonical recommended game per domain per age group).
 */
export function recommendedGameFor(area: DevelopmentAreaId, ageGroup: AgeGroupId): string | undefined {
  return GAME_CATALOG.find((g) => g.area === area && g.ageGroup === ageGroup && g.isRecommendable)?.id;
}
