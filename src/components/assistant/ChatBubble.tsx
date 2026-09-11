import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { spacing, radius } from '@/constants/spacing';

interface ChatBubbleProps {
  text: string;
  from: 'user' | 'assistant';
}

export function ChatBubble({ text, from }: ChatBubbleProps) {
  const isUser = from === 'user';
  return (
    <Animated.View
      entering={FadeInUp.duration(200)}
      style={[styles.row, isUser ? styles.rowUser : styles.rowAssistant]}
    >
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
        <AppText variant="body" color={isUser ? colors.textInverse : colors.text}>
          {text}
        </AppText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', marginBottom: spacing.md },
  rowUser: { justifyContent: 'flex-end' },
  rowAssistant: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '82%', borderRadius: radius.lg, padding: spacing.md },
  userBubble: { backgroundColor: colors.primary, borderBottomRightRadius: 4 },
  assistantBubble: { backgroundColor: colors.card, borderBottomLeftRadius: 4 },
});
