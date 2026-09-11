import React, { useState } from 'react';
import { StyleSheet, View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { AppText } from '@/components/common/AppText';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { colors } from '@/constants/colors';
import { spacing, radius } from '@/constants/spacing';
import type { OnboardingStackParamList } from '@/navigation/types';
import { useUserStore } from '@/stores/userStore';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'CreateAccount'>;

const LANGUAGES = ['English', 'Arabic', 'Spanish', 'French'];

export function CreateAccountScreen({ navigation }: Props) {
  const createAccount = useUserStore((s) => s.createAccount);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [error, setError] = useState('');

  function handleSignUp() {
    if (!name.trim()) return setError('Please enter your name.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Please enter a valid email.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    setError('');
    createAccount(name.trim(), email.trim(), language);
    navigation.navigate('AddChild');
  }

  return (
    <ScreenContainer scroll>
      <AppHeader title="Create Account" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.field}>
          <AppText variant="bodyMedium" style={styles.label}>
            Name
          </AppText>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            style={styles.input}
            accessibilityLabel="Name"
          />
        </View>
        <View style={styles.field}>
          <AppText variant="bodyMedium" style={styles.label}>
            Email
          </AppText>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            accessibilityLabel="Email"
          />
        </View>
        <View style={styles.field}>
          <AppText variant="bodyMedium" style={styles.label}>
            Password
          </AppText>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="At least 6 characters"
            secureTextEntry
            style={styles.input}
            accessibilityLabel="Password"
          />
        </View>
        <View style={styles.field}>
          <AppText variant="bodyMedium" style={styles.label}>
            Preferred Language
          </AppText>
          <View style={styles.languageRow}>
            {LANGUAGES.map((lang) => (
              <PrimaryButton
                key={lang}
                label={lang}
                onPress={() => setLanguage(lang)}
                fullWidth={false}
                style={[styles.langChip, language !== lang && styles.langChipInactive]}
              />
            ))}
          </View>
        </View>

        {error ? (
          <AppText variant="bodySmall" color={colors.red} style={styles.error}>
            {error}
          </AppText>
        ) : null}

        <PrimaryButton label="Sign Up" onPress={handleSignUp} style={styles.submit} />
      </KeyboardAvoidingView>
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
  languageRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  langChip: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, minHeight: 40 },
  langChipInactive: { backgroundColor: colors.border },
  error: { marginBottom: spacing.md },
  submit: { marginTop: spacing.md },
});
