import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Contact } from '../types';
import { colors, spacing } from '../theme';
import { useFontSize } from '../context/FontSizeContext';

interface ContactCardProps {
  contact: Contact;
  onPress: (contact: Contact) => void;
  onLongPress?: (contact: Contact) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onPress, onLongPress }) => {
  const { fontScale } = useFontSize();

  const nameSize = fontScale === 'xlarge' ? 34 : fontScale === 'large' ? 30 : 26;
  const phoneSize = fontScale === 'xlarge' ? 24 : fontScale === 'large' ? 22 : 20;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(contact)}
      onLongPress={() => onLongPress?.(contact)}
      activeOpacity={0.85}
      delayLongPress={500}
      accessibilityLabel={`${contact.name}，点击拨打电话`}
      accessibilityRole="button"
    >
      {/* 头像作为卡片背景 */}
      {contact.photoUri ? (
        <Image
          source={{ uri: contact.photoUri }}
          style={styles.bgImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.bgPlaceholder}>
          <Text style={styles.bgInitial}>
            {contact.name ? contact.name.charAt(0) : '?'}
          </Text>
        </View>
      )}

      {/* 底部遮罩 + 文字信息 */}
      <View style={styles.overlay}>
        <Text style={[styles.name, { fontSize: nameSize }]} numberOfLines={1}>
          {contact.name || '未命名'}
        </Text>
        <Text style={[styles.phone, { fontSize: phoneSize }]} numberOfLines={1}>
          {contact.phoneNumber}
        </Text>
      </View>

      {/* 拨打图标 */}
      <View style={styles.callIcon}>
        <MaterialIcons name="phone" size={30} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 180,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  // 背景图片
  bgImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  // 无头像的占位背景
  bgPlaceholder: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgInitial: {
    fontSize: 72,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.6)',
  },
  // 底部遮罩 - 半透明，能看清照片
  overlay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  name: {
    color: '#FFFFFF',
    fontWeight: '700',
    flexShrink: 1,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  phone: {
    color: 'rgba(255,255,255,0.95)',
    marginLeft: 16,
    flexShrink: 1,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  // 右上角拨打图标
  callIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContactCard;
