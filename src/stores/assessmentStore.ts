import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { asyncJSONStorage, STORAGE_KEYS } from '@/services/localStorage';
import { QUESTIONNAIRE_SECTIONS } from '@/data/questionnaire';
import type { Answer, QuestionnaireSession, SectionResponse } from '@/types/questionnaire';
import type { DevelopmentAreaId } from '@/types/child';
import type { DevelopmentProfile } from '@/types/assessment';
import { generateId } from '@/utils/id';

function emptySections(): Record<DevelopmentAreaId, SectionResponse> {
  const entries = QUESTIONNAIRE_SECTIONS.map((s) => [
    s.id,
    {
      sectionId: s.id,
      answers: {},
      notSureCount: 0,
      needsClarification: false,
      gameTriggered: false,
      gameSkipped: false,
    } as SectionResponse,
  ]);
  return Object.fromEntries(entries) as Record<DevelopmentAreaId, SectionResponse>;
}

interface AssessmentState {
  sessionsByChild: Record<string, QuestionnaireSession>;
  profilesByChild: Record<string, DevelopmentProfile[]>;

  startSession: (childId: string) => QuestionnaireSession;
  getSession: (childId: string) => QuestionnaireSession | undefined;
  answerQuestion: (childId: string, sectionId: DevelopmentAreaId, questionId: string, answer: Answer) => void;
  setCursor: (childId: string, sectionIndex: number, questionIndex: number) => void;
  markGameSkipped: (childId: string, sectionId: DevelopmentAreaId) => void;
  attachGameResult: (childId: string, sectionId: DevelopmentAreaId, gameResultId: string) => void;
  completeSession: (childId: string) => void;
  addProfile: (childId: string, profile: DevelopmentProfile) => void;
  latestProfile: (childId: string) => DevelopmentProfile | undefined;
  reset: () => void;
}

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      sessionsByChild: {},
      profilesByChild: {},

      startSession: (childId) => {
        const session: QuestionnaireSession = {
          id: generateId('session'),
          childId,
          startedAt: new Date().toISOString(),
          sections: emptySections(),
          currentSectionIndex: 0,
          currentQuestionIndex: 0,
        };
        set((state) => ({ sessionsByChild: { ...state.sessionsByChild, [childId]: session } }));
        return session;
      },

      getSession: (childId) => get().sessionsByChild[childId],

      answerQuestion: (childId, sectionId, questionId, answer) =>
        set((state) => {
          const session = state.sessionsByChild[childId];
          if (!session) return state;
          const section = session.sections[sectionId];
          const nextAnswers = { ...section.answers, [questionId]: answer };
          const notSureCount = Object.values(nextAnswers).filter((a) => a === 'not_sure').length;
          const nextSection: SectionResponse = {
            ...section,
            answers: nextAnswers,
            notSureCount,
            needsClarification: notSureCount >= 2,
          };
          return {
            sessionsByChild: {
              ...state.sessionsByChild,
              [childId]: { ...session, sections: { ...session.sections, [sectionId]: nextSection } },
            },
          };
        }),

      setCursor: (childId, sectionIndex, questionIndex) =>
        set((state) => {
          const session = state.sessionsByChild[childId];
          if (!session) return state;
          return {
            sessionsByChild: {
              ...state.sessionsByChild,
              [childId]: { ...session, currentSectionIndex: sectionIndex, currentQuestionIndex: questionIndex },
            },
          };
        }),

      markGameSkipped: (childId, sectionId) =>
        set((state) => {
          const session = state.sessionsByChild[childId];
          if (!session) return state;
          const section = session.sections[sectionId];
          return {
            sessionsByChild: {
              ...state.sessionsByChild,
              [childId]: {
                ...session,
                sections: { ...session.sections, [sectionId]: { ...section, gameSkipped: true } },
              },
            },
          };
        }),

      attachGameResult: (childId, sectionId, gameResultId) =>
        set((state) => {
          const session = state.sessionsByChild[childId];
          if (!session) return state;
          const section = session.sections[sectionId];
          return {
            sessionsByChild: {
              ...state.sessionsByChild,
              [childId]: {
                ...session,
                sections: {
                  ...session.sections,
                  [sectionId]: {
                    ...section,
                    gameTriggered: true,
                    gameSkipped: false,
                    gameResultId,
                    completedAt: new Date().toISOString(),
                  },
                },
              },
            },
          };
        }),

      completeSession: (childId) =>
        set((state) => {
          const session = state.sessionsByChild[childId];
          if (!session) return state;
          return {
            sessionsByChild: {
              ...state.sessionsByChild,
              [childId]: { ...session, completedAt: new Date().toISOString() },
            },
          };
        }),

      addProfile: (childId, profile) =>
        set((state) => ({
          profilesByChild: {
            ...state.profilesByChild,
            [childId]: [...(state.profilesByChild[childId] ?? []), profile],
          },
        })),

      latestProfile: (childId) => {
        const list = get().profilesByChild[childId];
        return list && list.length > 0 ? list[list.length - 1] : undefined;
      },

      reset: () => set({ sessionsByChild: {}, profilesByChild: {} }),
    }),
    { name: STORAGE_KEYS.assessment, storage: asyncJSONStorage, version: 1 },
  ),
);
