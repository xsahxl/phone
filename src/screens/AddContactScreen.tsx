import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import PhotoPicker from '../components/PhotoPicker';
import { saveContact } from '../storage/contactStorage';
import { Contact } from '../types';
import { colors, spacing, sizes } from '../theme';
import { useFontSize } from '../context/FontSizeContext';
import * as Crypto from 'expo-crypto';

type RouteParams = {
  AddContact: {
    contact?: Contact; // 编辑模式时传入
  };
};

const AddContactScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'AddContact'>>();
  const existingContact = route.params?.contact;
  const isEditing = !!existingContact;

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photoUri, setPhotoUri] = useState('');
  const [saving, setSaving] = useState(false);
  const { fontScale } = useFontSize();

  useEffect(() => {
    if (existingContact) {
      setName(existingContact.name);
      setPhoneNumber(existingContact.phoneNumber);
      setPhotoUri(existingContact.photoUri);
    }
  }, [existingContact]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('提示', '请输入联系人姓名');
      return;
    }
    if (!phoneNumber.trim()) {
      Alert.alert('提示', '请输入电话号码');
      return;
    }

    setSaving(true);
    try {
      const contact: Contact = {
        id: existingContact?.id || Crypto.randomUUID(),
        name: name.trim(),
        phoneNumber: phoneNumber.trim(),
        photoUri,
        createdAt: existingContact?.createdAt || Date.now(),
      };

      await saveContact(contact);
      navigation.goBack();
    } catch (error) {
      Alert.alert('提示', '保存失败，请重试');
      console.error('Save contact error:', error);
    } finally {
      setSaving(false);
    }
  };

  const inputFontSize = 22 * (fontScale === 'xlarge' ? 1.3 : fontScale === 'large' ? 1.15 : 1);
  const labelFontSize = 24 * (fontScale === 'xlarge' ? 1.3 : fontScale === 'large' ? 1.15 : 1);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* 标题 */}
        <Text style={styles.title}>
          {isEditing ? '编辑联系人' : '添加联系人'}
        </Text>

        {/* 照片选择 */}
        <PhotoPicker photoUri={photoUri} onPhotoSelected={setPhotoUri} />

        {/* 姓名输入 */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { fontSize: labelFontSize }]}>姓名</Text>
          <TextInput
            style={[styles.input, { fontSize: inputFontSize }]}
            value={name}
            onChangeText={setName}
            placeholder="请输入姓名"
            placeholderTextColor={colors.border}
            returnKeyType="next"
            maxLength={20}
            accessibilityLabel="联系人姓名"
          />
        </View>

        {/* 电话号码输入 */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { fontSize: labelFontSize }]}>电话</Text>
          <TextInput
            style={[styles.input, { fontSize: inputFontSize }]}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="请输入电话号码"
            placeholderTextColor={colors.border}
            keyboardType="phone-pad"
            returnKeyType="done"
            maxLength={20}
            accessibilityLabel="电话号码"
          />
        </View>

        {/* 保存按钮 */}
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.7}
          accessibilityLabel={saving ? '正在保存' : '保存联系人'}
          accessibilityRole="button"
        >
          <Text style={styles.saveButtonText}>
            {saving ? '保存中...' : '💾 保存'}
          </Text>
        </TouchableOpacity>

        {/* 取消按钮 */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="取消"
          accessibilityRole="button"
        >
          <Text style={styles.cancelButtonText}>取消</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl * 2,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: sizes.borderRadius,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
    minHeight: sizes.buttonHeight,
    color: colors.text,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: sizes.borderRadius,
    minHeight: sizes.buttonHeight + 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  saveButtonDisabled: {
    backgroundColor: colors.border,
    elevation: 0,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: spacing.lg,
    minHeight: sizes.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: 20,
  },
});

export default AddContactScreen;
