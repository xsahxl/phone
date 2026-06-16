import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { deleteContact } from '../storage/contactStorage';
import { Contact } from '../types';
import { colors, spacing, sizes } from '../theme';
import { useFontSize } from '../context/FontSizeContext';
import { makeCall } from '../utils/phoneCall';

type RootStackParamList = {
  MainTabs: undefined;
  AddContact: { contact?: Contact };
  ContactDetail: { contact: Contact };
};

type DetailRouteProp = RouteProp<RootStackParamList, 'ContactDetail'>;

const ContactDetailScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<DetailRouteProp>();
  const { contact } = route.params;
  const { fontScale } = useFontSize();

  const handleDelete = () => {
    Alert.alert(
      '确认删除',
      `确定要删除「${contact.name || '此联系人'}」吗？`,
      [
        { text: '取消', style: 'cancel' },
        {
          text: '删除',
          style: 'destructive',
          onPress: async () => {
            await deleteContact(contact.id);
            navigation.goBack();
          },
        },
      ],
    );
  };

  const handleEdit = () => {
    navigation.navigate('AddContact', { contact });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 头像 */}
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

      {/* 姓名 */}
      <Text style={[styles.name, { fontSize: 36 }]}>{contact.name || '未命名'}</Text>

      {/* 电话 */}
      <Text style={[styles.phoneNumber, { fontSize: 28 }]}>
        {contact.phoneNumber}
      </Text>

      {/* 操作按钮 */}
      <View style={styles.actions}>
        {/* 拨打按钮 - 最大最醒目 */}
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => makeCall(contact.phoneNumber)}
          activeOpacity={0.7}
          accessibilityLabel={`拨打 ${contact.name} 的电话`}
          accessibilityRole="button"
        >
          <Text style={styles.callButtonIcon}>📞</Text>
          <Text style={styles.callButtonText}>拨打</Text>
        </TouchableOpacity>

        {/* 编辑按钮 */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEdit}
          activeOpacity={0.7}
          accessibilityLabel="编辑联系人"
          accessibilityRole="button"
        >
          <Text style={styles.editButtonText}>✏️ 编辑</Text>
        </TouchableOpacity>

        {/* 删除按钮 */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          activeOpacity={0.7}
          accessibilityLabel="删除联系人"
          accessibilityRole="button"
        >
          <Text style={styles.deleteButtonText}>🗑️ 删除</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl * 2,
  },
  avatarContainer: {
    marginBottom: spacing.xl,
  },
  avatar: {
    width: sizes.avatarSize * 1.5,
    height: sizes.avatarSize * 1.5,
    borderRadius: (sizes.avatarSize * 1.5) / 2,
    borderWidth: 4,
    borderColor: colors.primary,
  },
  avatarPlaceholder: {
    width: sizes.avatarSize * 1.5,
    height: sizes.avatarSize * 1.5,
    borderRadius: (sizes.avatarSize * 1.5) / 2,
    backgroundColor: colors.photoPlaceholder,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.border,
  },
  avatarInitial: {
    fontSize: 64,
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
  name: {
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  phoneNumber: {
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
    letterSpacing: 2,
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    alignItems: 'center',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: sizes.borderRadius * 2,
    minHeight: sizes.buttonHeight + 12,
    width: '85%',
    marginBottom: spacing.lg,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  callButtonIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  callButtonText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: sizes.borderRadius,
    minHeight: sizes.buttonHeight,
    width: '70%',
    alignItems: 'center',
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  editButtonText: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: colors.dangerLight,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: sizes.borderRadius,
    minHeight: sizes.buttonHeight,
    width: '70%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  deleteButtonText: {
    color: colors.danger,
    fontSize: 22,
    fontWeight: '600',
  },
});

export default ContactDetailScreen;
