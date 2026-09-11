import { useUserStore } from '@/stores/userStore';
import { useChildStore } from '@/stores/childStore';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { useGameStore } from '@/stores/gameStore';
import { usePlanStore } from '@/stores/planStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { DEMO_PARENT, DEMO_CHILD, DEMO_SECTION_RESPONSES, buildDemoGameResults } from '@/data/mockUsers';
import { buildDevelopmentProfile } from '@/services/mockScoringEngine';
import { generatePersonalizedPlan, generateWeeklyPlan } from '@/services/planGenerator';

/**
 * Populates every store with the spec section 50 demo journey (Sarah + Adam)
 * so the full app can be explored immediately via "Try Demo" on Welcome.
 */
export function seedDemoData(): void {
  useUserStore.getState().createAccount(DEMO_PARENT.name, DEMO_PARENT.email, DEMO_PARENT.language);

  const dob = new Date();
  dob.setFullYear(dob.getFullYear() - DEMO_CHILD.ageYears);
  const child = useChildStore.getState().addChild({
    name: DEMO_CHILD.name,
    dob: dob.toISOString(),
    gender: DEMO_CHILD.gender,
    avatarKey: DEMO_CHILD.avatarKey,
    ageGroup: '3-8',
  });

  const gameResults = buildDemoGameResults(child.id);
  const resultIdByArea: Partial<Record<string, string>> = {};
  gameResults.forEach((r) => {
    const id = useGameStore.getState().addResult(r);
    resultIdByArea[r.developmentalArea] = id;
  });

  const session = useAssessmentStore.getState().startSession(child.id);
  DEMO_SECTION_RESPONSES.forEach((section) => {
    Object.entries(section.answers).forEach(([qId, answer]) => {
      useAssessmentStore.getState().answerQuestion(child.id, section.sectionId, qId, answer);
    });
    const resultId = resultIdByArea[section.sectionId];
    if (resultId) {
      useAssessmentStore.getState().attachGameResult(child.id, section.sectionId, resultId);
    }
  });
  useAssessmentStore.getState().completeSession(child.id);

  const finishedSession = useAssessmentStore.getState().getSession(child.id)!;
  const sections = Object.values(finishedSession.sections);
  const gameResultsByArea = Object.fromEntries(
    gameResults.map((r) => [r.developmentalArea, r]),
  );
  const profile = buildDevelopmentProfile(child.id, session.id, sections, gameResultsByArea);
  useAssessmentStore.getState().addProfile(child.id, profile);

  const personalizedPlan = generatePersonalizedPlan('3-8', profile);
  usePlanStore.getState().setPersonalizedPlan(personalizedPlan);
  const todayIndex = Math.min(4, Math.max(0, new Date().getDay() - 1));
  const weeklyPlan = generateWeeklyPlan('3-8', personalizedPlan, todayIndex);
  usePlanStore.getState().setWeeklyPlan(weeklyPlan);

  useSettingsStore.getState().setOnboardingCompleted(true);
}
