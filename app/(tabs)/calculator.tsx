import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import Display from '@/components/Calculator/Display';
import Keypad from '@/components/Calculator/Keypad';
import { useTheme } from '@/contexts/ThemeContext';
import { useCalculations } from '@/contexts/CalculationsContext';
import { evaluateExpression, formatNumberWithCommas, isValidExpression } from '@/utils/calculatorLogic';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

export default function CalculatorScreen() {
  const { colors } = useTheme();
  const { addCalculation } = useCalculations();
  
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [preview, setPreview] = useState('');
  const [lastOperation, setLastOperation] = useState<string | null>(null);
  

  // Update preview as expression changes
  useEffect(() => {
    if (expression && isValidExpression(expression)) {
      try {
        const calculatedResult = evaluateExpression(expression);
        setPreview(formatNumberWithCommas(calculatedResult));
      } catch (error) {
        setPreview('');
      }
    } else {
      setPreview('');
    }
  }, [expression]);

  const triggerHapticFeedback = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleDigitPress = (digit: string) => {
    triggerHapticFeedback();
    
    // If we have a result and start typing a new number, reset the expression
    if (result && !lastOperation) {
      setExpression(digit);
      setResult('');
    } else {
      setExpression(prev => prev + digit);
    }
    
    setLastOperation(null);
  };

  const handleOperatorPress = (operator: string) => {
    triggerHapticFeedback();
    
    // If we have a result, use it as the start of the new expression
    if (result && !lastOperation) {
      setExpression(result + operator);
      setResult('');
    } 
    // If the last character is an operator, replace it
    else if (/[+\-*/]$/.test(expression)) {
      setExpression(prev => prev.slice(0, -1) + operator);
    } 
    // Otherwise, just add the operator
    else {
      setExpression(prev => prev + operator);
    }
    
    setLastOperation(operator);
  };

  const handleFunctionPress = (func: string) => {
    triggerHapticFeedback();
    
    switch (func) {
      case 'sin':
        setExpression(prev => prev + 'sin(');
        break;
      case 'deg':
        setExpression(prev => prev + 'deg(');
        break;
      case 'e':
        setExpression(prev => prev + 'e');
        break;
      case 'μ':
        setExpression(prev => prev + 'μ');
        break;
      default:
        break;
    }
    
    setLastOperation(null);
  };

  const handleClearPress = () => {
    triggerHapticFeedback();
    setExpression('');
    setResult('');
    setPreview('');
    setLastOperation(null);
  };

  const handleBackspacePress = () => {
    triggerHapticFeedback();
    setExpression(prev => prev.slice(0, -1));
    
    if (result) {
      setResult('');
    }
    
    setLastOperation(null);
  };

  const handleEqualsPress = () => {
    triggerHapticFeedback();
    
    if (!expression) return;
    
    try {
      const calculatedResult = evaluateExpression(expression);
      if (calculatedResult && calculatedResult !== 'Error') {
        setResult(calculatedResult);
        addCalculation(expression, calculatedResult);
        setLastOperation('=');
        setPreview('');
      }
    } catch (error) {
      setResult('Error');
    }
  };

  const handleDecimalPress = () => {
    triggerHapticFeedback();
    
    // If we're starting a new expression after a result
    if (result && !lastOperation) {
      setExpression('0.');
      setResult('');
      return;
    }

    // Find the last number in the expression
    const parts = expression.split(/[+\-*/]/);
    const lastPart = parts[parts.length - 1];
    
    // If the last part already has a decimal, don't add another
    if (lastPart && lastPart.includes('.')) {
      return;
    }
    
    // If the expression is empty or ends with an operator, add '0.'
    if (expression === '' || /[+\-*/]$/.test(expression)) {
      setExpression(prev => prev + '0.');
    } else {
      setExpression(prev => prev + '.');
    }
    
    setLastOperation(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Animated.View
          entering={FadeIn.duration(300)}
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="always"
          >
            <View style={styles.displayContainer}>
              <Display
                expression={expression}
                result={formatNumberWithCommas(result)}
                preview={preview}
              />
            </View>
            
            <Keypad
              onDigitPress={handleDigitPress}
              onOperatorPress={handleOperatorPress}
              onFunctionPress={handleFunctionPress}
              onClearPress={handleClearPress}
              onBackspacePress={handleBackspacePress}
              onEqualsPress={handleEqualsPress}
              onDecimalPress={handleDecimalPress}
              disabled={expression?.length < 1}
              />
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    // marginBottom: 16,
    
  },
});