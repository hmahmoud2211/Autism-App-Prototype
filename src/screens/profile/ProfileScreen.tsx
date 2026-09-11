import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppText } from '@/components/common/AppText';
import { Card } from '@/components/common/Card';
import { Modal } from '@/components/common/Modal';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { ConfirmationDialog } from '@/components/common/ConfirmationDialog';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useUserStore } from '@/stores/userStore';
import { resetAllAppData } from '@/services/resetApp';
import { resetToOnboarding } from '@/navigation/navigationRef';
import type { ProfileStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileHome'>;

interface InfoModalContent {
  title: string;
  body: string;
}

const INFO_MODALS: Record<string, InfoModalContent> = {
  privacy: {
    title: 'Privacy',
    body: 'NUMU is a frontend-only prototype. All data stays on this device using local storage — nothing is sent to a server.',
  },
  about: {
    title: 'About NUMU',
    body: 'NUMU (Neurodevelopment Understanding & Monitoring Unit) helps parents observe development through play, and turns those observations into a personalized activity plan. NUMU is educational and does not provide medical diagnoses.',
  },
  help: {
    title: 'Help & Support',
    body: 'For questions about using NUMU, explore the Parent Guide from the Assistant tab, or ask the NUMU Assistant directly.',
  },
};

export function ProfileScreen({ navigation }: Props) {
  const user = useUserStore((s) => s.user);
  const [infoKey, setInfoKey] = useState<string | null>(null);
  const [confirmSignOut, setConfirmSignOut] = useState(false);

  const rows: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }[] = [
    { icon: 'person-circle-outline', label: 'Parent Profile', onPress: () => setInfoKey('parent') },
    { icon: 'people-outline', label: 'Child Profiles', onPress: () => navigation.navigate('ChildProfiles') },
    { icon: 'notifications-outline', label: 'Notifications', onPress: () => navigation.navigate('Reminders') },
    { icon: 'language-outline', label: 'Language', onPress: () => navigation.navigate('Settings') },
    { icon: 'accessibility-outline', label: 'Accessibility', onPress: () => navigation.navigate('Settings') },
    { icon: 'shield-checkmark-outline', label: 'Privacy', onPress: () => setInfoKey('privacy') },
    { icon: 'information-circle-outline', label: 'About NUMU', onPress: () => setInfoKey('about') },
    { icon: 'help-buoy-outline', label: 'Help & Support', onPress: () => setInfoKey('help') },
  ];

  return (
    <ScreenContainer scroll>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={28} color={colors.primary} />
        </View>
        <View>
          <AppText variant="h2">{user?.name ?? 'Parent'}</AppText>
          <AppText variant="bodySmall" color={colors.textSecondary}>
            {user?.email ?? ''}
          </AppText>
        </View>
      </View>

      {rows.map((row) => (
        <Card key={row.label} onPress={row.onPress} style={styles.row} accessibilityLabel={row.label}>
          <View style={styles.rowInner}>
            <Ionicons name={row.icon} size={20} color={colors.primary} style={styles.rowIcon} />
            <AppText variant="bodyMedium" style={styles.rowLabel}>
              {row.label}
            </AppText>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </View>
        </Card>
      ))}

      <Card onPress={() => setConfirmSignOut(true)} style={styles.row} accessibilityLabel="Sign Out">
        <View style={styles.rowInner}>
          <Ionicons name="log-out-outline" size={20} color={colors.red} style={styles.rowIcon} />
          <AppText variant="bodyMedium" color={colors.red} style={styles.rowLabel}>
            Sign Out
          </AppText>
        </View>
      </Card>

      <Modal visible={!!infoKey} onClose={() => setInfoKey(null)}>
        {infoKey === 'parent' ? (
          <>
            <AppText variant="h3" style={styles.modalTitle}>
              Parent Profile
            </AppText>
            <AppText variant="body" color={colors.textSecondary}>
              {user?.name ?? 'Parent'} · {user?.email ?? ''}
            </AppText>
            <AppText variant="bodySmall" color={colors.textSecondary} style={styles.modalMeta}>
              Language: {user?.language ?? 'English'}
            </AppText>
          </>
        ) : infoKey ? (
          <>
            <AppText variant="h3" style={styles.modalTitle}>
              {INFO_MODALS[infoKey].title}
            </AppText>
            <AppText variant="body" color={colors.textSecondary}>
              {INFO_MODALS[infoKey].body}
            </AppText>
          </>
        ) : null}
        <PrimaryButton label="Close" onPress={() => setInfoKey(null)} style={styles.modalButton} />
      </Modal>

      <ConfirmationDialog
        visible={confirmSignOut}
        title="Sign Out?"
        message="This will reset your mock session. Your local data stays saved unless you also reset demo data in Settings."
        confirmLabel="Sign Out"
        destructive
        onConfirm={async () => {
          setConfirmSignOut(false);
          await resetAllAppData();
          resetToOnboarding();
        }}
        onCancel={() => setConfirmSignOut(false)}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${colors.primary}1A`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  row: { marginBottom: spacing.sm },
  rowInner: { flexDirection: 'row', alignItems: 'center' },
  rowIcon: { marginRight: spacing.md },
  rowLabel: { flex: 1 },
  modalTitle: { marginBottom: spacing.sm },
  modalMeta: { marginTop: spacing.xs },
  modalButton: { marginTop: spacing.lg },
});
