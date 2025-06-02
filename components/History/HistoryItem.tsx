import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface HistoryItemProps {
  expression: string;
  result: string;
  timestamp: number;
  onPress: () => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  expression,
  result,
  timestamp,
  onPress,
}) => {
  const { colors } = useTheme();

  const formatExpression = (expr: string) => {
    return expr
      .replace(/\*/g, '×')
      .replace(/\//g, '÷')
      .replace(/\+/g, '+')
      .replace(/\-/g, '-');
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
    >
      <Pressable
        disabled={true}
        style={[
          styles.container,
          { 
            backgroundColor: colors.historyItem,
            borderColor: colors.border,
          }
        ]}
        onPress={onPress}
        android_ripple={{ color: colors.primary + '33' }}
      >
        <View style={styles.contentContainer}>
          <Text style={[styles.expression, { color: colors.historyText + 'CC' }]}>
            {formatExpression(expression)}
          </Text>
          <Text style={[styles.result, { color: colors.historyText }]}>
            = {result}
          </Text>
          <Text style={[styles.timestamp, { color: colors.historyText + '99' }]}>
            {formatDate(timestamp)}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contentContainer: {
    flexDirection: 'column',
  },
  expression: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  result: {
    fontSize: 24,
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});

export default HistoryItem;