/**
 * Contact 数据模型
 */
export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  photoUri: string;    // 本地文件路径，空字符串表示未设置
  createdAt: number;
}

/**
 * 新建联系人的表单数据（不含 id 和 createdAt）
 */
export type ContactFormData = Omit<Contact, 'id' | 'createdAt'>;
