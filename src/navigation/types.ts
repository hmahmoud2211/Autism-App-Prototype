import type { DevelopmentAreaId } from '@/types/child';

// Every screen reads the active child from childStore rather than receiving a
// childId param — NUMU only ever has one active child at a time, so threading
// an id through every route would be pure duplication.

export type RootStackParamList = {
  Onboarding: undefined;
  Questionnaire: undefined;
  Main: undefined;
  FinalReport: undefined;
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  CreateAccount: undefined;
  AddChild: undefined;
  AgeGroup: undefined;
};

export type QuestionnaireStackParamList = {
  QuestionnaireIntro: undefined;
  QuestionnaireQuestion: undefined;
  SectionReview: { sectionId: DevelopmentAreaId };
  RecommendedGame: { sectionId: DevelopmentAreaId };
  GameInstructions: { sectionId: DevelopmentAreaId; gameId: string };
  GamePlay: { gameId: string; level: 1 | 2 | 3; sectionId?: DevelopmentAreaId };
  GameResult: { gameId: string; level: 1 | 2 | 3; resultId: string; sectionId?: DevelopmentAreaId };
  AssessmentComplete: undefined;
  DevelopmentProfile: undefined;
  ResultsExplanation: undefined;
  PersonalizedPlan: undefined;
  WeeklyPlan: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  GamesTab: undefined;
  ProgressTab: undefined;
  AssistantTab: undefined;
  ProfileTab: undefined;
};

export type GameStackParamList = {
  GameLibrary: undefined;
  GameCategory: { categoryId: string };
  GameDetails: { gameId: string };
  GamePlay: { gameId: string; level: 1 | 2 | 3; sectionId?: DevelopmentAreaId };
  GameResult: { gameId: string; level: 1 | 2 | 3; resultId: string; sectionId?: DevelopmentAreaId };
};

export type AssistantStackParamList = {
  AssistantHome: undefined;
  ParentGuide: undefined;
  ParentGuideDetail: { guideId: string };
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  ChildProfiles: undefined;
  Settings: undefined;
  Reminders: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  DevelopmentProfile: undefined;
  ResultsExplanation: undefined;
  PersonalizedPlan: undefined;
  WeeklyPlan: undefined;
};
