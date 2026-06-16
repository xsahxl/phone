import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, sizes } from '../theme';

interface DialButtonProps {
  label: string;
  subLabel?: string;       // 小字母（如 ABC）
  onPress: (value: string) => void;
  color?: string;
  textColor?: string;
}

const DialButton: React.FC<DialButtonProps> = ({
  label,
  subLabel,
  onPress,
  color = colors.dialButton,
  textColor = colors.dialButtonText,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={() => onPress(label)}
      activeOpacity={0.5}
      accessibilityLabel={`按键 ${label}`}
      accessibilityRole="button"
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      {subLabel ? (
        <Text style={[styles.subLabel, { color: textColor }]}>{subLabel}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: sizes.dialButtonSize,
    height: sizes.dialButtonSize,
    borderRadius: sizes.dialButtonSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: spacing.sm,
    // 阴影
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  label: {
    fontSize: 36,
    fontWeight: '500',
  },
  subLabel: {
    fontSize: 10,
    fontWeight: '400',
    letterSpacing: 2,
    marginTop: 2,
  },
});

export default DialButton;
