import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const buttonSize = Math.min(width / 4 - 16, 80);

interface CalculatorButtonProps {
  label: string;
  onPress: () => void;
  type?: 'number' | 'operator' | 'function' | 'equal' | 'clear';
  size?: 'normal' | 'double';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  label,
  onPress,
  type = 'number',
  size = 'normal',
  style,
  disabled = false,
}) => {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const getBackgroundColor = () => {
    switch (type) {
      case 'operator':
        return colors.operatorButton;
      case 'function':
        return colors.clearButton;
      case 'equal':
        return colors.equalButton;
      case 'clear':
        return colors.clearButton;
      default:
        return colors.buttonBackground;
    }
  };

  const getTextColor = () => {
    return type === 'number' || type === 'clear' || type === 'function' 
      ? colors.text 
      : '#ffffff';
  };

  const handlePressIn = () => {
    scale.value = withTiming(0.95, {
      duration: 100,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, {
      duration: 150,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const buttonStyles: StyleProp<ViewStyle>[] = [
    styles.button,
    {
      backgroundColor: getBackgroundColor(),
      width: size === 'double' ? buttonSize * 2 + 8 : buttonSize,
      height: buttonSize,
      borderRadius: buttonSize / 2,
    },
    style,
  ];

  const textStyle: StyleProp<TextStyle> = [
    styles.text,
    { color: getTextColor() },
    type === 'function' && styles.smallerText,
  ];

  return (
    <TouchableOpacity
    disabled = {disabled}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}
    >
      <Animated.View style={[buttonStyles, animatedStyle]}>
        <Text style={textStyle}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
  },
  smallerText: {
    fontSize: 20,
  },
});

export default CalculatorButton;