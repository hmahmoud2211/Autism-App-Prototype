import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { AppText } from '@/components/common/AppText';
import { Card } from '@/components/common/Card';
import { ChildProfileCard } from '@/components/dashboard/ChildProfileCard';
import { AgeGroupCard } from '@/components/dashboard/AgeGroupCard';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { Modal } from '@/components/common/Modal';
import { colors } from '@/constants/colors';
import { spacing, radius } from '@/constants/spacing';
import { AGE_GROUPS } from '@/data/ageGroups';
import { useChildStore } from '@/stores/childStore';
import { suggestAgeGroup } from '@/utils/date';
import type { ProfileStackParamList } from '@/navigation/types';
import type { AgeGroupId } from '@/types/child';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ChildProfiles'>;

export function ChildProfilesScreen({ navigation }: Props) {
  const children = useChildStore((s) => s.children);
  const activeChildId = useChildStore((s) => s.activeChildId);
  const setActiveChild = useChildStore((s) => s.setActiveChild);
  const addChild = useChildStore((s) => s.addChild);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [ageGroupOverride, setAgeGroupOverride] = useState<AgeGroupId | null>(null);

  const editingChild = children.find((c) => c.id === editingId);

  function resetAddForm() {
    setName('');
    setDay('');
    setMonth('');
    setYear('');
    setAgeGroupOverride(null);
  }

  function handleAddChild() {
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);
    if (!name.trim() || !d || !m || !y) return;
    const dob = new Date(y, m - 1, d).toISOString();
    addChild({
      name: name.trim(),
      dob,
      avatarKey: 'avatar_1',
      ageGroup: ageGroupOverride ?? suggestAgeGroup(dob),
    });
    setShowAdd(false);
    resetAddForm();
  }

  return (
    <ScreenContainer scroll>
      <AppHeader title="Child Profiles" onBack={() => navigation.goBack()} />
      {children.map((child) => (
        <View key={child.id} style={styles.childBlock}>
          <ChildProfileCard child={child} selected={child.id === activeChildId} onPress={() => setActiveChild(child.id)} />
          <View style={styles.actionsRow}>
            <SecondaryButton label="Switch to This Child" onPress={() => setActiveChild(child.id)} style={styles.actionBtn} />
            <SecondaryButton label="Edit Profile" variant="ghost" onPress={() => setEditingId(child.id)} style={styles.actionBtn} />
          </View>
        </View>
      ))}

      <PrimaryButton label="Add Child" onPress={() => setShowAdd(true)} style={styles.addButton} />

      <Modal visible={!!editingChild} onClose={() => setEditingId(null)}>
        {editingChild ? (
          <>
            <AppText variant="h3" style={styles.modalTitle}>
              Edit {editingChild.name}
            </AppText>
            <AppText variant="bodySmall" color={colors.textSecondary} style={styles.modalMeta}>
              Age group
            </AppText>
            {AGE_GROUPS.map((g) => (
              <AgeGroupCard
                key={g.id}
                ageGroup={g}
                selected={editingChild.ageGroup === g.id}
                onPress={() => useChildStore.getState().updateChild(editingChild.id, { ageGroup: g.id })}
              />
            ))}
            <PrimaryButton label="Done" onPress={() => setEditingId(null)} style={styles.modalButton} />
          </>
        ) : null}
      </Modal>

      <Modal visible={showAdd} onClose={() => setShowAdd(false)}>
        <AppText variant="h3" style={styles.modalTitle}>
          Add Child
        </AppText>
        <TextInput value={name} onChangeText={setName} placeholder="Child's name" style={styles.input} accessibilityLabel="Child's name" />
        <View style={styles.dobRow}>
          <TextInput value={day} onChangeText={setDay} placeholder="DD" keyboardType="number-pad" maxLength={2} style={[styles.input, styles.dobInput]} />
          <TextInput value={month} onChangeText={setMonth} placeholder="MM" keyboardType="number-pad" maxLength={2} style={[styles.input, styles.dobInput]} />
          <TextInput value={year} onChangeText={setYear} placeholder="YYYY" keyboardType="number-pad" maxLength={4} style={[styles.input, styles.dobInputYear]} />
        </View>
        <PrimaryButton label="Add Child" onPress={handleAddChild} style={styles.modalButton} />
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  childBlock: { marginBottom: spacing.lg },
  actionsRow: { flexDirection: 'row', gap: spacing.sm, marginTop: -spacing.sm },
  actionBtn: { flex: 1 },
  addButton: { marginTop: spacing.md, marginBottom: spacing.lg },
  modalTitle: { marginBottom: spacing.md },
  modalMeta: { marginBottom: spacing.sm },
  modalButton: { marginTop: spacing.md },
  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.card,
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.md,
  },
  dobRow: { flexDirection: 'row', gap: spacing.sm },
  dobInput: { flex: 1, textAlign: 'center' },
  dobInputYear: { flex: 1.4, textAlign: 'center' },
});
