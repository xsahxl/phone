import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { colors, spacing, sizes, FontScale } from '../theme';
import { useFontSize } from '../context/FontSizeContext';

const FONT_SCALES: FontScale[] = ['normal', 'large', 'xlarge'];

const scaleDescriptions: Record<FontScale, string> = {
  normal: '适合视力较好的用户',
  large: '较大字体，适合一般老年人',
  xlarge: '超大字体，方便阅读',
};

const SettingsScreen: React.FC = () => {
  const { fontScale, setFontScale, scaleLabels } = useFontSize();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>设置</Text>

      {/* 字体大小设置 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>字体大小</Text>
        <Text style={styles.sectionDescription}>
          选择适合您的字体大小，所有页面的文字都会同步调整
        </Text>

        <View style={styles.optionsContainer}>
          {FONT_SCALES.map(scale => {
            const isSelected = fontScale === scale;
            const previewSize = scale === 'normal' ? 22 : scale === 'large' ? 28 : 34;

            return (
              <TouchableOpacity
                key={scale}
                style={[styles.option, isSelected && styles.optionSelected]}
                onPress={() => setFontScale(scale)}
                activeOpacity={0.7}
                accessibilityLabel={`字体大小 ${scaleLabels[scale]}`}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
              >
                <View style={styles.optionHeader}>
                  <View style={[styles.radio, isSelected && styles.radioSelected]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                  <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                    {scaleLabels[scale]}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.optionPreview,
                    { fontSize: previewSize },
                    isSelected && styles.optionPreviewSelected,
                  ]}
                >
                  预览文字效果 Preview
                </Text>
                <Text style={styles.optionDescription}>
                  {scaleDescriptions[scale]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* 关于 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>关于</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.appName}>打电话</Text>
          <Text style={styles.appVersion}>版本 1.0.0</Text>
          <Text style={styles.appDescription}>
            专为老年人设计的简单易用的打电话应用。{'\n'}
            大字体、大按钮、照片联系人，让打电话更轻松。
          </Text>
        </View>
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
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl * 2,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  sectionDescription: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: spacing.md,
  },
  option: {
    backgroundColor: colors.surface,
    borderRadius: sizes.borderRadius,
    padding: spacing.lg,
    borderWidth: 3,
    borderColor: colors.border,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#F1F8E9',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  radio: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  optionLabel: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
  },
  optionLabelSelected: {
    color: colors.primary,
  },
  optionPreview: {
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    paddingLeft: spacing.xxl,
  },
  optionPreviewSelected: {
    color: colors.text,
  },
  optionDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    paddingLeft: spacing.xxl,
  },
  aboutCard: {
    backgroundColor: colors.surface,
    borderRadius: sizes.borderRadius,
    padding: spacing.lg,
    alignItems: 'center',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  appVersion: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  appDescription: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
  },
});

export default SettingsScreen;
