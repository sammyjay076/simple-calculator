import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Animated, { FadeIn } from 'react-native-reanimated';

interface DisplayProps {
  expression: string;
  result: string;
  preview: string;
}

const Display: React.FC<DisplayProps> = ({ expression, result, preview }) => {
  const { colors } = useTheme();

  const formatExpression = (expr: string) => {
    return expr
      .replace(/\*/g, '×')
      .replace(/\//g, '÷')
      .replace(/\+/g, '+')
      .replace(/\-/g, '-');
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      {expression && (
        <Animated.Text
          entering={FadeIn.duration(200)}
          style={[
            styles.expression,
            { color: colors.text + '99' }, // Adding transparency
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {formatExpression(expression)}
        </Animated.Text>
      )}
      
      <Text
        style={[styles.result, { color: colors.text }]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {result || '0'}
      </Text>

      {preview && (
        <Animated.Text
          entering={FadeIn.duration(200)}
          style={[styles.preview, { color: colors.primary }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          ={preview}
        </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    minHeight: 120,
    justifyContent: 'flex-end',
  },
  expression: {
    fontSize: 20,
    textAlign: 'right',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  result: {
    fontSize: 40,
    textAlign: 'right',
    fontFamily: 'Inter-Bold',
    marginBottom: Platform.OS === 'web' ? 8 : 4,
  },
  preview: {
    fontSize: 16,
    textAlign: 'right',
    fontFamily: 'Inter-Medium',
    opacity: 0.8,
  },
});

export default Display;