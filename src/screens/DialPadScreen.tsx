import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DialButton from '../components/DialButton';
import { colors, spacing, sizes } from '../theme';
import { makeCall } from '../utils/phoneCall';

const DIAL_KEYS = [
  [
    { label: '1', subLabel: '' },
    { label: '2', subLabel: 'ABC' },
    { label: '3', subLabel: 'DEF' },
  ],
  [
    { label: '4', subLabel: 'GHI' },
    { label: '5', subLabel: 'JKL' },
    { label: '6', subLabel: 'MNO' },
  ],
  [
    { label: '7', subLabel: 'PQRS' },
    { label: '8', subLabel: 'TUV' },
    { label: '9', subLabel: 'WXYZ' },
  ],
  [
    { label: '*', subLabel: '' },
    { label: '0', subLabel: '+' },
    { label: '#', subLabel: '' },
  ],
];

const DialPadScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleKeyPress = (value: string) => {
    setPhoneNumber(prev => prev + value);
  };

  const handleDelete = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const handleLongDelete = () => {
    setPhoneNumber('');
  };

  const handleCall = () => {
    if (phoneNumber.trim()) {
      makeCall(phoneNumber);
    }
  };

  return (
    <View style={styles.container}>
      {/* 号码显示区域 */}
      <View style={styles.displayArea}>
        <Text
          style={[
            styles.phoneNumber,
            phoneNumber.length > 11 && styles.phoneNumberSmall,
          ]}
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          {phoneNumber || '输入号码'}
        </Text>
        {phoneNumber ? (
          <TouchableOpacity
            onPress={handleDelete}
            onLongPress={handleLongDelete}
            style={styles.deleteButton}
            accessibilityLabel="删除"
            accessibilityRole="button"
          >
            <Text style={styles.deleteButtonText}>⌫</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* 拨号盘 */}
      <View style={styles.dialPad}>
        {DIAL_KEYS.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.dialRow}>
            {row.map(key => (
              <DialButton
                key={key.label}
                label={key.label}
                subLabel={key.subLabel || undefined}
                onPress={handleKeyPress}
              />
            ))}
          </View>
        ))}
      </View>

      {/* 拨号按钮 */}
      <View style={styles.callButtonContainer}>
        <TouchableOpacity
          style={[
            styles.callButton,
            !phoneNumber.trim() && styles.callButtonDisabled,
          ]}
          onPress={handleCall}
          disabled={!phoneNumber.trim()}
          activeOpacity={0.7}
          accessibilityLabel="拨打电话"
          accessibilityRole="button"
        >
          <Text style={styles.callButtonIcon}>📞</Text>
          <Text style={styles.callButtonText}>拨打</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  displayArea: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
  },
  phoneNumber: {
    fontSize: 36,
    fontWeight: '500',
    color: colors.text,
    letterSpacing: 3,
    textAlign: 'center',
    flex: 1,
  },
  phoneNumberSmall: {
    fontSize: 28,
  },
  deleteButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  deleteButtonText: {
    fontSize: 28,
    color: colors.textSecondary,
  },
  dialPad: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: spacing.lg,
  },
  dialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  callButtonContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: spacing.xl,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: sizes.borderRadius * 2,
    minWidth: 200,
    minHeight: sizes.buttonHeight + 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  callButtonDisabled: {
    backgroundColor: colors.border,
    elevation: 0,
  },
  callButtonIcon: {
    fontSize: 28,
    marginRight: spacing.sm,
  },
  callButtonText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default DialPadScreen;
