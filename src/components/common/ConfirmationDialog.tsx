import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal } from './Modal';
import { AppText } from './AppText';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import { spacing } from '@/constants/spacing';
import { colors } from '@/constants/colors';

interface ConfirmationDialogProps {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationDialog({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  return (
    <Modal visible={visible} onClose={onCancel}>
      <AppText variant="h3">{title}</AppText>
      {message ? (
        <AppText variant="body" color={colors.textSecondary} style={styles.message}>
          {message}
        </AppText>
      ) : null}
      <View style={styles.actions}>
        <SecondaryButton label={cancelLabel} onPress={onCancel} style={styles.actionSpacing} />
        <PrimaryButton
          label={confirmLabel}
          onPress={onConfirm}
          style={destructive ? styles.destructive : undefined}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  message: { marginTop: spacing.sm },
  actions: { marginTop: spacing.lg, gap: spacing.sm },
  actionSpacing: { marginBottom: 0 },
  destructive: { backgroundColor: colors.red },
});
