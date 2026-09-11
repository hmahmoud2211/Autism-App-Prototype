import { createNavigationContainerRef } from '@react-navigation/native';

/**
 * A handful of screens (e.g. Weekly Plan's "Start Today's Activity") need to
 * jump straight into a Game Library screen regardless of whether they're
 * currently rendered inside the onboarding QuestionnaireStack or inside
 * MainTabs — two completely separate branches of the navigation tree. Rather
 * than threading getParent() chains that only work from one of those places,
 * screens call these helpers directly against the root navigation ref.
 *
 * The nested-navigator param shape below isn't expressible in RootStackParamList
 * (which only knows "Main" takes no params), so the ref's own `navigate` is
 * called loosely rather than fighting its overload resolution.
 */
export const navigationRef = createNavigationContainerRef();

function rootNavigate(name: string, params?: object): void {
  if (!navigationRef.isReady()) return;
  (navigationRef.navigate as (n: string, p?: object) => void)(name, params);
}

export function navigateToGameDetails(gameId: string): void {
  rootNavigate('Main', { screen: 'GamesTab', params: { screen: 'GameDetails', params: { gameId } } });
}

export function navigateToWeeklyPlan(): void {
  rootNavigate('Main', { screen: 'HomeTab', params: { screen: 'WeeklyPlan' } });
}

export function navigateToHome(): void {
  rootNavigate('Main');
}

/** Used after Sign Out / Reset Demo Data — stores are already cleared, this discards the Main stack too. */
export function resetToOnboarding(): void {
  if (!navigationRef.isReady()) return;
  navigationRef.reset({ index: 0, routes: [{ name: 'Onboarding' as never }] });
}
