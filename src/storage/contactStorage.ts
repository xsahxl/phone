import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact } from '../types';

const STORAGE_KEY = '@BigFontPhone/contacts';

/**
 * 读取所有联系人
 */
export const getContacts = async (): Promise<Contact[]> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json) {
      const contacts: Contact[] = JSON.parse(json);
      return contacts.sort((a, b) => a.name.localeCompare(b.name, 'zh'));
    }
    return [];
  } catch (error) {
    console.error('Failed to load contacts:', error);
    return [];
  }
};

/**
 * 保存或更新联系人
 * 如果 id 已存在则更新，否则新增
 */
export const saveContact = async (contact: Contact): Promise<void> => {
  try {
    const contacts = await getContacts();
    const index = contacts.findIndex(c => c.id === contact.id);
    if (index >= 0) {
      contacts[index] = contact;
    } else {
      contacts.push(contact);
    }
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  } catch (error) {
    console.error('Failed to save contact:', error);
    throw error;
  }
};

/**
 * 删除联系人
 */
export const deleteContact = async (id: string): Promise<void> => {
  try {
    const contacts = await getContacts();
    const filtered = contacts.filter(c => c.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete contact:', error);
    throw error;
  }
};

/**
 * 根据 id 查找联系人
 */
export const getContactById = async (id: string): Promise<Contact | undefined> => {
  const contacts = await getContacts();
  return contacts.find(c => c.id === id);
};
