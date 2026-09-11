import type { Answer, SectionResponse } from '@/types/questionnaire';
import type { GameResult } from '@/types/game';
import type { DevelopmentAreaId } from '@/types/child';

/**
 * Default demo journey (spec section 50): parent Sarah, child Adam (5 years,
 * 3-8 age group). Answers are hand-authored so that Social Interaction gets
 * 2 "Not Sure" responses, Joint Attention gets 3, and Sensory Regulation
 * gets 2 — each crossing the >=2 threshold and triggering a recommended
 * clarification game, matching the spec's example scenario. Game scores are
 * intentionally on the lower side for those three areas so the resulting
 * Development Profile highlights them as support areas, same as the spec's
 * illustrative example. Exact numbers are illustrative, not a literal
 * reproduction of the spec's sample percentages (see mockScoringEngine.ts).
 */

export const DEMO_PARENT = {
  name: 'Sarah',
  email: 'sarah@example.com',
  language: 'English',
};

export const DEMO_CHILD = {
  name: 'Adam',
  // ~5 years old relative to "today" - computed at seed time instead of a fixed date.
  ageYears: 5,
  gender: 'boy' as const,
  avatarKey: 'avatar_boy_1',
};

function answers(pairs: [string, Answer][]): Record<string, Answer> {
  return Object.fromEntries(pairs);
}

function countNotSure(a: Record<string, Answer>): number {
  return Object.values(a).filter((v) => v === 'not_sure').length;
}

function section(sectionId: DevelopmentAreaId, pairs: [string, Answer][]): SectionResponse {
  const a = answers(pairs);
  const notSureCount = countNotSure(a);
  return {
    sectionId,
    answers: a,
    notSureCount,
    needsClarification: notSureCount >= 2,
    gameTriggered: notSureCount >= 2,
    gameSkipped: false,
    completedAt: new Date().toISOString(),
  };
}

export const DEMO_SECTION_RESPONSES: SectionResponse[] = [
  section('social_interaction', [
    ['social_1', 'yes'],
    ['social_2', 'not_sure'],
    ['social_3', 'not_sure'],
    ['social_4', 'no'],
    ['social_5', 'yes'],
  ]),
  section('joint_attention', [
    ['joint_1', 'not_sure'],
    ['joint_2', 'not_sure'],
    ['joint_3', 'yes'],
    ['joint_4', 'not_sure'],
    ['joint_5', 'no'],
  ]),
  section('response_to_name', [
    ['name_1', 'not_sure'],
    ['name_2', 'no'],
    ['name_3', 'yes'],
    ['name_4', 'no'],
    ['name_5', 'no'],
  ]),
  section('communication', [
    ['comm_1', 'yes'],
    ['comm_2', 'no'],
    ['comm_3', 'yes'],
    ['comm_4', 'no'],
    ['comm_5', 'yes'],
  ]),
  section('play_interests', [
    ['play_1', 'yes'],
    ['play_2', 'yes'],
    ['play_3', 'no'],
    ['play_4', 'no'],
    ['play_5', 'yes'],
  ]),
  section('sensory_regulation', [
    ['sensory_1', 'no'],
    ['sensory_2', 'not_sure'],
    ['sensory_3', 'not_sure'],
    ['sensory_4', 'no'],
    ['sensory_5', 'yes'],
  ]),
  section('behavior_emotions', [
    ['behavior_1', 'yes'],
    ['behavior_2', 'not_sure'],
    ['behavior_3', 'no'],
    ['behavior_4', 'no'],
    ['behavior_5', 'no'],
  ]),
  section('daily_living', [
    ['daily_1', 'yes'],
    ['daily_2', 'yes'],
    ['daily_3', 'no'],
    ['daily_4', 'no'],
    ['daily_5', 'yes'],
  ]),
];

/** Seed game results for the 3 clarification games triggered above (deliberately low scores). */
export function buildDemoGameResults(childId: string): GameResult[] {
  const now = new Date().toISOString();
  return [
    {
      gameId: 'face-finder_3-8',
      childId,
      completedAt: now,
      score: 15,
      correctAnswers: 1,
      totalQuestions: 5,
      responseTime: 2.6,
      attempts: 5,
      level: 1,
      developmentalArea: 'social_interaction',
      success: false,
    },
    {
      gameId: 'follow-teddy_3-8',
      childId,
      completedAt: now,
      score: 10,
      correctAnswers: 1,
      totalQuestions: 5,
      responseTime: 3.1,
      attempts: 5,
      level: 1,
      developmentalArea: 'joint_attention',
      success: false,
    },
    {
      gameId: 'sound-safari_3-8',
      childId,
      completedAt: now,
      score: 25,
      correctAnswers: 2,
      totalQuestions: 5,
      responseTime: 2.4,
      attempts: 5,
      level: 1,
      developmentalArea: 'sensory_regulation',
      success: false,
    },
  ];
}
