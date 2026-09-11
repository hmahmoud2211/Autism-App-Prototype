import type { DevelopmentAreaId } from './child';

export type Answer = 'yes' | 'no' | 'not_sure';

export interface Question {
  id: string;
  question: string;
  explanation?: string;
  example?: string;
  /** true when "yes" is the developmentally-expected answer; false when "no" is. */
  positiveOrientation: boolean;
}

export interface QuestionnaireSection {
  id: DevelopmentAreaId;
  title: string;
  icon: string;
  description: string;
  questions: Question[]; // exactly 5
}

export interface SectionResponse {
  sectionId: DevelopmentAreaId;
  answers: Record<string, Answer>; // questionId -> answer
  notSureCount: number;
  needsClarification: boolean; // notSureCount >= 2
  gameTriggered: boolean;
  gameSkipped: boolean; // "Do This Later" was chosen
  gameResultId?: string;
  completedAt?: string;
}

export interface QuestionnaireSession {
  id: string;
  childId: string;
  startedAt: string;
  completedAt?: string;
  sections: Record<DevelopmentAreaId, SectionResponse>;
  currentSectionIndex: number;
  currentQuestionIndex: number;
}
