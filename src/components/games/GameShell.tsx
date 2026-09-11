import React, { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/common/AppText';
import { ProgressBar } from '@/components/common/ProgressBar';
import { ConfirmationDialog } from '@/components/common/ConfirmationDialog';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface GameShellProps {
  title: string;
  trialIndex: number; // 0-based
  totalTrials: number;
  onExit: () => void;
  children: React.ReactNode;
}

/**
 * Full-screen "Child Mode" chrome shared by all 7 mini-games: minimal text,
 * large exit control with a confirm step so a stray tap doesn't lose progress.
 */
export function GameShell({ title, trialIndex, totalTrials, onExit, children }: GameShellProps) {
  const [confirmExit, setConfirmExit] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable
          onPress={() => setConfirmExit(true)}
          accessibilityRole="button"
          accessibilityLabel="Exit Activity"
          style={styles.exitButton}
        >
          <Ionicons name="close" size={22} color={colors.text} />
        </Pressable>
        <View style={styles.progressWrap}>
          <ProgressBar progress={totalTrials > 0 ? trialIndex / totalTrials : 0} />
        </View>
      </View>
      <AppText variant="h3" center style={styles.title}>
        {title}
      </AppText>
      <View style={styles.content}>{children}</View>

      <ConfirmationDialog
        visible={confirmExit}
        title="Exit Activity?"
        message="Your progress in this activity won't be saved if you leave now."
        confirmLabel="Exit"
        cancelLabel="Keep Playing"
        destructive
        onConfirm={() => {
          setConfirmExit(false);
          onExit();
        }}
        onCancel={() => setConfirmExit(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  exitButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressWrap: { flex: 1, marginLeft: spacing.md },
  title: { marginTop: spacing.lg, marginBottom: spacing.md },
  content: { flex: 1, paddingHorizontal: spacing.lg },
});
