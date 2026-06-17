import { Platform, Linking, Alert } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';

/**
 * 拨打电话
 * Android 尝试直接拨出（需要 CALL_PHONE 权限），失败则回退到系统拨号界面
 */
export const makeCall = async (phoneNumber: string): Promise<void> => {
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');

  if (!cleanNumber) {
    Alert.alert('提示', '请输入有效的电话号码');
    return;
  }

  try {
    if (Platform.OS === 'android') {
      // 尝试直接拨出（Android 10+ 需要设为默认拨号器才能生效）
      await IntentLauncher.startActivityAsync('android.intent.action.CALL', {
        data: `tel:${cleanNumber}`,
      });
    } else {
      await Linking.openURL(`tel:${cleanNumber}`);
    }
  } catch {
    // 直拨失败，回退到系统拨号界面
    try {
      await Linking.openURL(`tel:${cleanNumber}`);
    } catch (error) {
      console.error('Failed to make call:', error);
      Alert.alert('提示', '拨号失败，请重试');
    }
  }
};
