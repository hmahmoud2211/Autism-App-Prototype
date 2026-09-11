import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QuestionnaireIntroScreen } from '@/screens/questionnaire/QuestionnaireIntroScreen';
import { QuestionnaireScreen } from '@/screens/questionnaire/QuestionnaireScreen';
import { SectionReviewScreen } from '@/screens/questionnaire/SectionReviewScreen';
import { RecommendedGameScreen } from '@/screens/questionnaire/RecommendedGameScreen';
import { GameInstructionsScreen } from '@/screens/questionnaire/GameInstructionsScreen';
import { AssessmentCompleteScreen } from '@/screens/questionnaire/AssessmentCompleteScreen';
import { GamePlayScreen } from '@/screens/games/GamePlayScreen';
import { GameResultScreen } from '@/screens/games/GameResultScreen';
import { DevelopmentProfileScreen } from '@/screens/insights/DevelopmentProfileScreen';
import { ResultsExplanationScreen } from '@/screens/insights/ResultsExplanationScreen';
import { PersonalizedPlanScreen } from '@/screens/insights/PersonalizedPlanScreen';
import { WeeklyPlanScreen } from '@/screens/insights/WeeklyPlanScreen';
import type { QuestionnaireStackParamList } from './types';

const Stack = createNativeStackNavigator<QuestionnaireStackParamList>();

export function QuestionnaireStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="QuestionnaireIntro" component={QuestionnaireIntroScreen} />
      <Stack.Screen name="QuestionnaireQuestion" component={QuestionnaireScreen} />
      <Stack.Screen name="SectionReview" component={SectionReviewScreen} />
      <Stack.Screen name="RecommendedGame" component={RecommendedGameScreen} />
      <Stack.Screen name="GameInstructions" component={GameInstructionsScreen} />
      <Stack.Screen
        name="GamePlay"
        component={GamePlayScreen as any}
        options={{ presentation: 'fullScreenModal', gestureEnabled: false }}
      />
      <Stack.Screen name="GameResult" component={GameResultScreen as any} />
      <Stack.Screen name="AssessmentComplete" component={AssessmentCompleteScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="DevelopmentProfile" component={DevelopmentProfileScreen as any} />
      <Stack.Screen name="ResultsExplanation" component={ResultsExplanationScreen as any} />
      <Stack.Screen name="PersonalizedPlan" component={PersonalizedPlanScreen as any} />
      <Stack.Screen name="WeeklyPlan" component={WeeklyPlanScreen as any} />
    </Stack.Navigator>
  );
}
