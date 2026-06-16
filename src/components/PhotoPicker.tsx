import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, sizes, fonts } from '../theme';
import { useFontSize } from '../context/FontSizeContext';

interface PhotoPickerProps {
  photoUri: string;
  onPhotoSelected: (uri: string) => void;
}

const PhotoPicker: React.FC<PhotoPickerProps> = ({ photoUri, onPhotoSelected }) => {
  const { fontScale } = useFontSize();

  const handleTakePhoto = async () => {
    try {
      // 先请求相机权限
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('提示', '需要相机权限才能拍照，请在设置中开启');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        onPhotoSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('提示', '无法打开相机');
    }
  };

  const handlePickImage = async () => {
    try {
      // 先请求相册权限
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('提示', '需要相册权限才能选择照片，请在设置中开启');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        onPhotoSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('提示', '无法打开相册');
    }
  };

  const showOptions = () => {
    Alert.alert(
      '设置头像',
      '请选择图片来源',
      [
        { text: '拍照', onPress: handleTakePhoto },
        { text: '从相册选择', onPress: handlePickImage },
        { text: '取消', style: 'cancel' },
      ],
    );
  };

  const labelFontSize = fonts.scaled('body', fontScale);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={showOptions}
      activeOpacity={0.8}
      accessibilityLabel="点击设置联系人照片"
      accessibilityRole="button"
    >
      {photoUri ? (
        <Image
          source={{ uri: photoUri }}
          style={styles.photo}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderIcon}>📷</Text>
          <Text style={[styles.placeholderText, { fontSize: labelFontSize }]}>
            点击设置照片
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginBottom: spacing.xl,
  },
  photo: {
    width: sizes.avatarSize * 1.3,
    height: sizes.avatarSize * 1.3,
    borderRadius: sizes.avatarSize * 0.65,
    borderWidth: 4,
    borderColor: colors.primary,
  },
  placeholder: {
    width: sizes.avatarSize * 1.3,
    height: sizes.avatarSize * 1.3,
    borderRadius: sizes.avatarSize * 0.65,
    backgroundColor: colors.photoPlaceholder,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: spacing.xs,
  },
  placeholderText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
});

export default PhotoPicker;
