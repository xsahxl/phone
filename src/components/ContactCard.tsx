import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { Contact } from '../types';
import { colors, spacing, sizes } from '../theme';
import { useFontSize } from '../context/FontSizeContext';

interface ContactCardProps {
  contact: Contact;
  onPress: (contact: Contact) => void;
  onLongPress?: (contact: Contact) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onPress, onLongPress }) => {
  const { fontScale } = useFontSize();

  const handleLongPress = () => {
    Alert.alert(
      contact.name || '联系人',
      '请选择操作',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '拨打电话',
          style: 'default',
          onPress: () => onPress(contact),
        },
        {
          text: '删除联系人',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              '确认删除',
              `确定要删除「${contact.name || '此联系人'}」吗？`,
              [
                { text: '取消', style: 'cancel' },
                {
                  text: '删除',
                  style: 'destructive',
                  onPress: () => onLongPress?.(contact),
                },
              ],
            );
          },
        },
      ],
    );
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(contact)}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
      accessibilityLabel={`${contact.name}，点击拨打电话，长按更多选项`}
      accessibilityRole="button"
    >
      <View style={styles.avatarContainer}>
        {contact.photoUri ? (
          <Image
            source={{ uri: contact.photoUri }}
            style={styles.avatar}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitial}>
              {contact.name ? contact.name.charAt(0) : '?'}
            </Text>
          </View>
        )}
      </View>
      <Text
        style={[styles.name, { fontSize: 22 * (fontScale === 'xlarge' ? 1.3 : fontScale === 'large' ? 1.15 : 1) }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {contact.name || '未命名'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: sizes.borderRadius,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    margin: spacing.sm,
    // 阴影
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: sizes.avatarSize,
    height: sizes.avatarSize,
    borderRadius: sizes.avatarSize / 2,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  avatarPlaceholder: {
    width: sizes.avatarSize,
    height: sizes.avatarSize,
    borderRadius: sizes.avatarSize / 2,
    backgroundColor: colors.photoPlaceholder,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.border,
  },
  avatarInitial: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});

export default ContactCard;
