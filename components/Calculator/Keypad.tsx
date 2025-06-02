import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalculatorButton from './CalculatorButton';

interface KeypadProps {
  onDigitPress: (digit: string) => void;
  onOperatorPress: (operator: string) => void;
  onFunctionPress: (func: string) => void;
  onClearPress: () => void;
  onBackspacePress: () => void;
  onEqualsPress: () => void;
  onDecimalPress: () => void;
  disabled?: boolean;
}

const Keypad: React.FC<KeypadProps> = ({
  onDigitPress,
  onOperatorPress,
  onFunctionPress,
  onClearPress,
  onBackspacePress,
  onEqualsPress,
  onDecimalPress,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      {/* TODO: Add scientific functions. Later Improvements*/}
      {/* <View style={styles.row}>
        <CalculatorButton
          label="e"
          onPress={() => onFunctionPress('e')}
          type="function"
        />
        <CalculatorButton
          label="μ"
          onPress={() => onFunctionPress('μ')}
          type="function"
        />
        <CalculatorButton
          label="sin"
          onPress={() => onFunctionPress('sin')}
          type="function"
        />
        <CalculatorButton
          label="deg"
          onPress={() => onFunctionPress('deg')}
          type="function"
        />
      </View> */}

      <View style={styles.row}>
        <CalculatorButton
          label="AC"
          onPress={onClearPress}
          type="clear"
        />
        <CalculatorButton
          label="⌫"
          onPress={onBackspacePress}
          type="clear"
        />
        <CalculatorButton
          label="÷"
          onPress={() => onOperatorPress('/')}
          type="operator"
        />
        <CalculatorButton
          label="×"
          onPress={() => onOperatorPress('*')}
          type="operator"
        />
      </View>

      <View style={styles.row}>
        <CalculatorButton
          label="7"
          onPress={() => onDigitPress('7')}
        />
        <CalculatorButton
          label="8"
          onPress={() => onDigitPress('8')}
        />
        <CalculatorButton
          label="9"
          onPress={() => onDigitPress('9')}
        />
        <CalculatorButton
          label="-"
          onPress={() => onOperatorPress('-')}
          type="operator"
        />
      </View>

      <View style={styles.row}>
        <CalculatorButton
          label="4"
          onPress={() => onDigitPress('4')}
        />
        <CalculatorButton
          label="5"
          onPress={() => onDigitPress('5')}
        />
        <CalculatorButton
          label="6"
          onPress={() => onDigitPress('6')}
        />
        <CalculatorButton
          label="+"
          onPress={() => onOperatorPress('+')}
          type="operator"
        />
      </View>

      <View style={styles.row}>
        <CalculatorButton
          label="1"
          onPress={() => onDigitPress('1')}
        />
        <CalculatorButton
          label="2"
          onPress={() => onDigitPress('2')}
        />
        <CalculatorButton
          label="3"
          onPress={() => onDigitPress('3')}
        />
        <CalculatorButton
          label="="
          onPress={onEqualsPress}
          type="equal"
        />
      </View>

      <View style={styles.row}>
        <CalculatorButton
          label="0"
          onPress={() => onDigitPress('0')}
          size="double"
          disabled={disabled}
        />
        <CalculatorButton
          label="."
          onPress={onDecimalPress}
        />
        <View style={styles.spacer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  spacer: {
    flex: 1,
  },
});

export default Keypad;