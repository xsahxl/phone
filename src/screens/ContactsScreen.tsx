import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ContactCard from '../components/ContactCard';
import { getContacts, deleteContact } from '../storage/contactStorage';
import { Contact } from '../types';
import { colors, spacing, sizes } from '../theme';
import { useFontSize } from '../context/FontSizeContext';
import { makeCall } from '../utils/phoneCall';

type RootStackParamList = {
  MainTabs: undefined;
  AddContact: { contact?: Contact };
  ContactDetail: { contact: Contact };
};

const ContactsScreen: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { fontScale } = useFontSize();

  // 每次页面获取焦点时刷新联系人列表
  useFocusEffect(
    useCallback(() => {
      loadContacts();
    }, []),
  );

  const loadContacts = async () => {
    const data = await getContacts();
    setContacts(data);
  };

  const handleContactPress = (contact: Contact) => {
    // 点击直接拨打
    makeCall(contact.phoneNumber);
  };

  const handleContactLongPress = (contact: Contact) => {
    // 长按弹出菜单
    Alert.alert(
      contact.name || '联系人',
      '请选择操作',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '查看详情',
          onPress: () => navigation.navigate('ContactDetail', { contact }),
        },
        {
          text: '拨打电话',
          style: 'default',
          onPress: () => makeCall(contact.phoneNumber),
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
                  onPress: async () => {
                    await deleteContact(contact.id);
                    await loadContacts();
                  },
                },
              ],
            );
          },
        },
      ],
    );
  };

  const handleAddContact = () => {
    navigation.navigate('AddContact', {});
  };

  const headerFontSize = styles.header.fontSize;

  return (
    <View style={styles.container}>
      {/* 顶部标题栏 */}
      <View style={styles.header}>
        <Text style={styles.header}>通讯录</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddContact}
          accessibilityLabel="添加联系人"
          accessibilityRole="button"
        >
          <Text style={styles.addButtonText}>＋ 添加</Text>
        </TouchableOpacity>
      </View>

      {/* 联系人列表 */}
      {contacts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>👋</Text>
          <Text style={[styles.emptyText, { fontSize: 28 }]}>
            还没有联系人
          </Text>
          <Text style={styles.emptyHint}>
            点击右上角"添加"按钮{'\n'}为家人添加照片和电话
          </Text>
          <TouchableOpacity
            style={styles.emptyAddButton}
            onPress={handleAddContact}
          >
            <Text style={styles.emptyAddButtonText} numberOfLines={1}>添加第一个联系人</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ContactCard
              contact={item}
              onPress={handleContactPress}
              onLongPress={handleContactLongPress}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: sizes.borderRadiusSmall,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.xxl * 2,
  },
  // 空状态
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  emptyText: {
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  emptyHint: {
    fontSize: 20,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: spacing.xl,
  },
  emptyAddButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: sizes.borderRadius,
    minHeight: sizes.buttonHeight,
    justifyContent: 'center',
    alignSelf: 'stretch',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  emptyAddButtonText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default ContactsScreen;
