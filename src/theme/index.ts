/**
 * 主题配置 - 专为老年人设计的大字体、高对比度主题
 */

// 字体缩放级别
export type FontScale = 'normal' | 'large' | 'xlarge';

export const fontScaleFactors: Record<FontScale, number> = {
  normal: 1.0,
  large: 1.3,
  xlarge: 1.6,
};

// 基础字号（已经是加大版）
const BASE = {
  small: 20,
  body: 24,
  title: 32,
  header: 40,
};

export const fonts = {
  sizes: BASE,
  // 根据缩放级别获取实际字号
  scaled: (base: keyof typeof BASE, scale: FontScale = 'normal') => {
    return Math.round(BASE[base] * fontScaleFactors[scale]);
  },
};

// 高对比度配色
export const colors = {
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#1A1A1A',
  textSecondary: '#555555',
  primary: '#2E7D32',        // 绿色 - 拨号/确认按钮
  primaryLight: '#4CAF50',
  danger: '#D32F2F',         // 红色 - 删除
  dangerLight: '#FFCDD2',
  border: '#BDBDBD',
  white: '#FFFFFF',
  dialButton: '#E8E8E8',    // 拨号盘按键背景
  dialButtonText: '#1A1A1A',
  photoPlaceholder: '#E0E0E0',
};

// 间距和尺寸 - 全部放大
export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const sizes = {
  // 按钮最小高度 64dp，符合无障碍标准（>48dp）
  buttonHeight: 64,
  // 拨号盘按键
  dialButtonSize: 80,
  // 头像
  avatarSize: 120,
  avatarSizeSmall: 80,
  // 卡片圆角
  borderRadius: 16,
  borderRadiusSmall: 8,
  // 图标
  iconSize: 32,
  iconSizeLarge: 48,
};

export default { fonts, colors, spacing, sizes, fontScaleFactors };
