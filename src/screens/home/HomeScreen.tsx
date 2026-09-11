import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppText } from '@/components/common/AppText';
import { Card } from '@/components/common/Card';
import { SectionHeader } from '@/components/common/SectionHeader';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { EmptyState } from '@/components/common/EmptyState';
import { Modal } from '@/components/common/Modal';
import { GameCard } from '@/components/dashboard/GameCard';
import { WeeklyActivityCard } from '@/components/dashboard/WeeklyActivityCard';
import { InsightCard } from '@/components/dashboard/InsightCard';
import { ParentTipCard } from '@/components/dashboard/ParentTipCard';
import { ChildProfileCard } from '@/components/dashboard/ChildProfileCard';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { getGameById } from '@/data/games';
import { PARENT_GUIDES } from '@/data/parentGuides';
import { useChildStore } from '@/stores/childStore';
import { usePlanStore } from '@/stores/planStore';
import { useGameStore } from '@/stores/gameStore';
import { getProgressStats } from '@/stores/progressStore';
import type { HomeStackParamList } from '@/navigation/types';
import { navigateToGameDetails } from '@/navigation/navigationRef';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

export function HomeScreen({ navigation }: Props) {
  const children = useChildStore((s) => s.children);
  const child = useChildStore((s) => s.activeChild());
  const setActiveChild = useChildStore((s) => s.setActiveChild);
  const weeklyPlan = usePlanStore((s) => (child ? s.weeklyPlanByChild[child.id] : undefined));
  const personalizedPlan = usePlanStore((s) => (child ? s.personalizedPlanByChild[child.id] : undefined));
  const getUnlockedLevel = useGameStore((s) => s.getUnlockedLevel);
  const [showChildSwitcher, setShowChildSwitcher] = useState(false);

  if (!child) {
    return (
      <ScreenContainer>
        <EmptyState icon="person-add-outline" title="No child profile yet" message="Add a child to get started with NUMU." />
      </ScreenContainer>
    );
  }

  const todayActivity = weeklyPlan?.activities.find((a) => a.status === 'today');
  const todayGame = todayActivity ? getGameById(todayActivity.gameId) : undefined;
  const recommendedGameIds = personalizedPlan?.focusAreas.flatMap((f) => f.gameIds).slice(0, 6) ?? [];
  const stats = getProgressStats(child.id);
  const tip = PARENT_GUIDES[Math.floor(Math.random() * PARENT_GUIDES.length) % PARENT_GUIDES.length];

  return (
    <ScreenContainer scroll>
      <View style={styles.header}>
        <View>
          <AppText variant="bodyMedium" color={colors.textSecondary}>
            Hello!
          </AppText>
          <Pressable onPress={() => setShowChildSwitcher(true)} accessibilityRole="button" accessibilityLabel="Switch child">
            <View style={styles.childRow}>
              <AppText variant="h1">{child.name}</AppText>
              <Ionicons name="chevron-down" size={20} color={colors.textSecondary} style={styles.chevron} />
            </View>
          </Pressable>
        </View>
      </View>

      {!personalizedPlan ? (
        <Card style={styles.ctaCard}>
          <AppText variant="h3" style={styles.ctaTitle}>
            Start {child.name}'s Developmental Check-in
          </AppText>
          <AppText variant="bodySmall" color={colors.textSecondary} style={styles.ctaBody}>
            A short questionnaire helps NUMU build a personalized plan.
          </AppText>
          <PrimaryButton
            label="Begin Assessment"
            onPress={() => navigation.getParent()?.getParent()?.navigate('Questionnaire' as never)}
            fullWidth={false}
          />
        </Card>
      ) : (
        <>
          {todayGame ? (
            <Card style={styles.heroCard}>
              <AppText variant="caption" color={colors.textInverse} style={styles.heroLabel}>
                TODAY'S ACTIVITY
              </AppText>
              <AppText variant="h1" color={colors.textInverse}>
                {todayGame.title}
              </AppText>
              <AppText variant="body" color={colors.textInverse} style={styles.heroTagline}>
                Play, learn and grow
              </AppText>
              <PrimaryButton
                label="Start"
                onPress={() => navigateToGameDetails(todayGame.id)}
                fullWidth={false}
                style={styles.heroButton}
                labelColor={colors.primary}
              />
            </Card>
          ) : null}

          {weeklyPlan ? (
            <View style={styles.section}>
              <SectionHeader title="Today's Plan" actionLabel="See All" onAction={() => navigation.navigate('WeeklyPlan')} />
              {weeklyPlan.activities.slice(0, 3).map((a) => (
                <WeeklyActivityCard key={a.id} activity={a} />
              ))}
            </View>
          ) : null}

          {recommendedGameIds.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Recommended Games" />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {recommendedGameIds.map((gameId) => {
                  const game = getGameById(gameId);
                  if (!game) return null;
                  return (
                    <GameCard
                      key={gameId}
                      game={game}
                      unlockedLevel={getUnlockedLevel(child.id, gameId)}
                      onPress={() => navigateToGameDetails(gameId)}
                    />
                  );
                })}
              </ScrollView>
            </View>
          ) : null}

          <View style={styles.section}>
            <SectionHeader title="Progress This Week" actionLabel="View Progress" onAction={() => navigation.getParent()?.navigate('ProgressTab' as never)} />
            <View style={styles.statsRow}>
              <InsightCard icon="trending-up" title="Accuracy Improvement" value={stats.accuracyImprovement} color={colors.green} />
              <InsightCard icon="flame" title="Current Streak" value={`${stats.currentStreakDays}d`} color={colors.orange} />
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Parent Tip" />
            <ParentTipCard title={tip.title} tip={tip.tips[0]} onPress={() => navigation.getParent()?.navigate('AssistantTab' as never)} />
          </View>

          <View style={styles.section}>
            <SectionHeader title="Upcoming Reminder" />
            <Card>
              <View style={styles.reminderRow}>
                <Ionicons name="notifications-outline" size={20} color={colors.primary} />
                <AppText variant="bodyMedium" style={styles.reminderText}>
                  Today's Activity · 5:00 PM
                </AppText>
              </View>
            </Card>
          </View>

          <View style={styles.section}>
            <Card onPress={() => navigation.getParent()?.navigate('AssistantTab' as never)} style={styles.assistantCard}>
              <Ionicons name="sparkles" size={22} color={colors.primary} />
              <AppText variant="bodyMedium" style={styles.assistantText}>
                Ask NUMU Assistant a question
              </AppText>
              <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            </Card>
          </View>
        </>
      )}

      <Modal visible={showChildSwitcher} onClose={() => setShowChildSwitcher(false)}>
        <AppText variant="h3" style={styles.modalTitle}>
          Switch Child
        </AppText>
        {children.map((c) => (
          <ChildProfileCard
            key={c.id}
            child={c}
            selected={c.id === child.id}
            onPress={() => {
              setActiveChild(c.id);
              setShowChildSwitcher(false);
            }}
          />
        ))}
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: spacing.lg },
  childRow: { flexDirection: 'row', alignItems: 'center' },
  chevron: { marginLeft: spacing.xs },
  ctaCard: { backgroundColor: colors.navy, marginBottom: spacing.lg },
  ctaTitle: { color: colors.textInverse, marginBottom: spacing.xs },
  ctaBody: { color: 'rgba(255,255,255,0.8)', marginBottom: spacing.md },
  heroCard: { backgroundColor: colors.primary, marginBottom: spacing.lg },
  heroLabel: { opacity: 0.85, marginBottom: spacing.xs, letterSpacing: 1 },
  heroTagline: { opacity: 0.9, marginTop: spacing.xs, marginBottom: spacing.md },
  heroButton: { backgroundColor: colors.textInverse, paddingHorizontal: spacing.xl },
  section: { marginBottom: spacing.xl },
  statsRow: { flexDirection: 'row', gap: spacing.md },
  reminderRow: { flexDirection: 'row', alignItems: 'center' },
  reminderText: { marginLeft: spacing.sm },
  assistantCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  assistantText: { flex: 1 },
  modalTitle: { marginBottom: spacing.md },
});
