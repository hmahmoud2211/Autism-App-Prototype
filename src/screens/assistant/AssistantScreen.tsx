import React, { useState } from 'react';
import { StyleSheet, View, TextInput, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppText } from '@/components/common/AppText';
import { Card } from '@/components/common/Card';
import { ChatBubble } from '@/components/assistant/ChatBubble';
import { SuggestedQuestionChip } from '@/components/assistant/SuggestedQuestionChip';
import { colors } from '@/constants/colors';
import { spacing, radius } from '@/constants/spacing';
import { ASSISTANT_DISCLAIMER } from '@/data/copy/guardrailedStrings';
import { SUGGESTED_QUESTIONS, matchAssistantResponse } from '@/data/assistantResponses';
import type { AssistantStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AssistantStackParamList, 'AssistantHome'>;

interface Message {
  id: string;
  from: 'user' | 'assistant';
  text: string;
}

export function AssistantScreen({ navigation }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMessage: Message = { id: `${Date.now()}_u`, from: 'user', text: text.trim() };
    const response = matchAssistantResponse(text);
    const assistantMessage: Message = { id: `${Date.now()}_a`, from: 'assistant', text: response };
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput('');
  }

  return (
    <ScreenContainer edges={['top', 'bottom']}>
      <View style={styles.header}>
        <AppText variant="h1">NUMU Assistant</AppText>
        <AppText variant="bodySmall" color={colors.textSecondary}>
          Here to support you
        </AppText>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {messages.length === 0 ? (
          <>
            <AppText variant="bodyMedium" style={styles.suggestedLabel}>
              Try asking:
            </AppText>
            <View style={styles.chipsWrap}>
              {SUGGESTED_QUESTIONS.map((q) => (
                <SuggestedQuestionChip key={q} text={q} onPress={() => sendMessage(q)} />
              ))}
            </View>

            <AppText variant="bodyMedium" style={styles.actionsLabel}>
              Explore
            </AppText>
            <Card onPress={() => {}} style={styles.actionCard}>
              <Ionicons name="bulb-outline" size={20} color={colors.orange} />
              <AppText variant="bodyMedium" style={styles.actionText}>
                Suggested Activities
              </AppText>
            </Card>
            <Card onPress={() => {}} style={styles.actionCard}>
              <Ionicons name="heart-outline" size={20} color={colors.red} />
              <AppText variant="bodyMedium" style={styles.actionText}>
                Tips for Daily Life
              </AppText>
            </Card>
            <Card onPress={() => navigation.navigate('ParentGuide')} style={styles.actionCard}>
              <Ionicons name="book-outline" size={20} color={colors.primary} />
              <AppText variant="bodyMedium" style={styles.actionText}>
                Open Parent Guide
              </AppText>
            </Card>
            <Card onPress={() => {}} style={styles.actionCard}>
              <Ionicons name="download-outline" size={20} color={colors.teal} />
              <AppText variant="bodyMedium" style={styles.actionText}>
                Download Guide
              </AppText>
            </Card>
            <Card onPress={() => {}} style={styles.actionCard}>
              <Ionicons name="medkit-outline" size={20} color={colors.purple} />
              <AppText variant="bodyMedium" style={styles.actionText}>
                Find a Specialist
              </AppText>
            </Card>
          </>
        ) : (
          messages.map((m) => <ChatBubble key={m.id} text={m.text} from={m.from} />)
        )}
      </ScrollView>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask a question..."
            style={styles.input}
            accessibilityLabel="Message NUMU Assistant"
            onSubmitEditing={() => sendMessage(input)}
          />
          <Pressable
            onPress={() => sendMessage(input)}
            accessibilityRole="button"
            accessibilityLabel="Send message"
            style={styles.sendIcon}
            hitSlop={8}
          >
            <Ionicons name="send" size={22} color={colors.primary} />
          </Pressable>
        </View>
        <AppText variant="caption" color={colors.textSecondary} style={styles.disclaimer}>
          {ASSISTANT_DISCLAIMER}
        </AppText>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, marginBottom: spacing.md },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
  suggestedLabel: { marginBottom: spacing.sm },
  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.lg },
  actionsLabel: { marginBottom: spacing.sm },
  actionCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  actionText: { flex: 1 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.card,
    fontSize: 16,
    color: colors.text,
  },
  sendIcon: { padding: spacing.xs },
  disclaimer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
});
