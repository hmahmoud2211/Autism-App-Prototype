import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { AppText } from '@/components/common/AppText';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { colors } from '@/constants/colors';
import { spacing, radius } from '@/constants/spacing';
import type { OnboardingStackParamList } from '@/navigation/types';
import { useChildStore } from '@/stores/childStore';
import { suggestAgeGroup } from '@/utils/date';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'AddChild'>;

const AVATARS = ['avatar_1', 'avatar_2', 'avatar_3', 'avatar_4'];
const AVATAR_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  avatar_1: 'happy-outline',
  avatar_2: 'star-outline',
  avatar_3: 'rocket-outline',
  avatar_4: 'flower-outline',
};

export function AddChildScreen({ navigation }: Props) {
  const addChild = useChildStore((s) => s.addChild);
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState<'girl' | 'boy' | 'prefer_not_to_say'>('prefer_not_to_say');
  const [avatarKey, setAvatarKey] = useState(AVATARS[0]);
  const [error, setError] = useState('');

  function handleNext() {
    if (!name.trim()) return setError("Please enter your child's name.");
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);
    if (!d || !m || !y || y < 2005 || y > new Date().getFullYear()) {
      return setError('Please enter a valid date of birth.');
    }
    const dob = new Date(y, m - 1, d);
    if (Number.isNaN(dob.getTime())) return setError('Please enter a valid date of birth.');

    setError('');
    const ageGroup = suggestAgeGroup(dob.toISOString());
    addChild({ name: name.trim(), dob: dob.toISOString(), gender, avatarKey, ageGroup });
    navigation.navigate('AgeGroup');
  }

  return (
    <ScreenContainer scroll>
      <AppHeader title="Add Child" onBack={() => navigation.goBack()} />

      <View style={styles.field}>
        <AppText variant="bodyMedium" style={styles.label}>
          Child's Name
        </AppText>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="e.g. Adam"
          style={styles.input}
          accessibilityLabel="Child's name"
        />
      </View>

      <View style={styles.field}>
        <AppText variant="bodyMedium" style={styles.label}>
          Date of Birth
        </AppText>
        <View style={styles.dobRow}>
          <TextInput
            value={day}
            onChangeText={setDay}
            placeholder="DD"
            keyboardType="number-pad"
            maxLength={2}
            style={[styles.input, styles.dobInput]}
            accessibilityLabel="Day of birth"
          />
          <TextInput
            value={month}
            onChangeText={setMonth}
            placeholder="MM"
            keyboardType="number-pad"
            maxLength={2}
            style={[styles.input, styles.dobInput]}
            accessibilityLabel="Month of birth"
          />
          <TextInput
            value={year}
            onChangeText={setYear}
            placeholder="YYYY"
            keyboardType="number-pad"
            maxLength={4}
            style={[styles.input, styles.dobInputYear]}
            accessibilityLabel="Year of birth"
          />
        </View>
      </View>

      <View style={styles.field}>
        <AppText variant="bodyMedium" style={styles.label}>
          Gender (optional)
        </AppText>
        <View style={styles.row}>
          {(['girl', 'boy', 'prefer_not_to_say'] as const).map((g) => (
            <Pressable
              key={g}
              onPress={() => setGender(g)}
              style={[styles.genderChip, gender === g && styles.genderChipActive]}
              accessibilityRole="button"
              accessibilityLabel={g.replace(/_/g, ' ')}
            >
              <AppText variant="bodySmall" color={gender === g ? colors.textInverse : colors.text}>
                {g === 'prefer_not_to_say' ? 'Prefer not to say' : g[0].toUpperCase() + g.slice(1)}
              </AppText>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <AppText variant="bodyMedium" style={styles.label}>
          Avatar (optional)
        </AppText>
        <View style={styles.row}>
          {AVATARS.map((key) => (
            <Pressable
              key={key}
              onPress={() => setAvatarKey(key)}
              style={[styles.avatarCircle, avatarKey === key && styles.avatarCircleActive]}
              accessibilityRole="button"
              accessibilityLabel={`Avatar ${key}`}
            >
              <Ionicons name={AVATAR_ICONS[key]} size={26} color={avatarKey === key ? colors.textInverse : colors.primary} />
            </Pressable>
          ))}
        </View>
      </View>

      {error ? (
        <AppText variant="bodySmall" color={colors.red} style={styles.error}>
          {error}
        </AppText>
      ) : null}

      <PrimaryButton label="Next" onPress={handleNext} style={styles.submit} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: spacing.lg },
  label: { marginBottom: spacing.xs },
  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.card,
    fontSize: 16,
    color: colors.text,
  },
  dobRow: { flexDirection: 'row', gap: spacing.sm },
  // minWidth: 0 overrides the browser's default <input> intrinsic width on
  // web, which otherwise stops flexbox from shrinking these below ~170px
  // each and pushes the year field off-screen in a row this narrow.
  dobInput: { flex: 1, minWidth: 0, textAlign: 'center' },
  dobInputYear: { flex: 1.4, minWidth: 0, textAlign: 'center' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  genderChip: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.card,
  },
  genderChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: `${colors.primary}1A`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircleActive: { backgroundColor: colors.primary },
  error: { marginBottom: spacing.md },
  submit: { marginTop: spacing.md },
});
