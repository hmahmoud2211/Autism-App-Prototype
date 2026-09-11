import { QUESTIONNAIRE_SECTIONS } from '@/data/questionnaire';
import type { DevelopmentAreaId } from '@/types/child';

/**
 * Given the just-finished section, figures out where the questionnaire goes
 * next: the following section, or "done" once Daily Living Skills (the last
 * section) is finished. Kept as a pure function so screens don't duplicate
 * this bookkeeping.
 */
export function nextSectionAfter(sectionId: DevelopmentAreaId): { sectionIndex: number; sectionId: DevelopmentAreaId } | null {
  const index = QUESTIONNAIRE_SECTIONS.findIndex((s) => s.id === sectionId);
  const next = QUESTIONNAIRE_SECTIONS[index + 1];
  return next ? { sectionIndex: index + 1, sectionId: next.id } : null;
}

export function isLastSection(sectionId: DevelopmentAreaId): boolean {
  return QUESTIONNAIRE_SECTIONS[QUESTIONNAIRE_SECTIONS.length - 1].id === sectionId;
}
