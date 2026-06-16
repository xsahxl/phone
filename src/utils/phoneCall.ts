import { Platform, Linking, Alert } from 'react-native';

/**
 * 拨打电话
 * 直接尝试调起系统拨号器，不预先检查 canOpenURL
 * （Expo Go 中 canOpenURL 对 tel: 会返回 false，但实际可以拨号）
 */
export const makeCall = async (phoneNumber: string): Promise<void> => {
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');

  if (!cleanNumber) {
    Alert.alert('提示', '请输入有效的电话号码');
    return;
  }

  const url = Platform.select({
    android: `tel:${cleanNumber}`,
    ios: `tel:${cleanNumber}`,
    default: `tel:${cleanNumber}`,
  });

  try {
    await Linking.openURL(url);
  } catch (error) {
    console.error('Failed to make call:', error);
    // Expo Go 不支持真拨号，给用户提示
    Alert.alert(
      '提示',
      'Expo Go 中无法拨打电话。请使用真机安装 APK 后测试拨号功能：\n\n运行 npx expo run:android 生成 APK',
    );
  }
};
