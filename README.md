# 打电话

专为老年人设计的 Android 拨号应用。大字体、大按钮、照片联系人，不识字也能用。

## 功能

- 👥 **通讯录** — 联系人以照片为主，大卡片展示，点击即拨
- 📞 **拨号盘** — 超大圆形按键，手动输入号码拨打
- 📷 **照片头像** — 支持拍照或从相册选取联系人照片
- 🔤 **字号调节** — 标准 / 大号 / 超大，三级调节全局生效
- 💾 **本地存储** — 联系人数据保存在手机本地，无需网络

## 环境要求

- Node.js >= 18
- npm

## 开发

```bash
# 安装依赖（淘宝镜像）
npm install -f --registry=https://registry.npmmirror.com

# 启动开发服务器
npx expo start --clear
```

启动后终端显示二维码，手机上安装 **Expo Go** 扫码即可实时预览。

> Expo Go 仅用于界面调试，拨号功能需打包 APK 测试。

## 打包 APK

### 方式一：云端打包（推荐，无需 Android SDK）

```bash
# 1. 登录 Expo 账号（免费注册）
npx eas-cli login

# 2. 云端编译
npx eas-cli build --platform android --profile preview

# 3. 等待编译完成，下载 APK 安装到手机
```

### 方式二：本地打包（需要 Android SDK）

```bash
npx expo run:android
```

编译产物在 `android/app/build/outputs/apk/` 目录下。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Expo SDK 56 + React Native 0.85 |
| 语言 | TypeScript |
| 导航 | @react-navigation (Bottom Tabs + Stack) |
| 存储 | @react-native-async-storage/async-storage |
| 图片 | expo-image-picker |

## 项目结构

```
phone/
├── App.tsx                    # 应用入口，导航配置
├── index.js                   # Expo 注册入口
├── src/
│   ├── screens/
│   │   ├── ContactsScreen.tsx      # 通讯录
│   │   ├── DialPadScreen.tsx       # 拨号盘
│   │   ├── AddContactScreen.tsx    # 添加/编辑联系人
│   │   ├── ContactDetailScreen.tsx # 联系人详情
│   │   └── SettingsScreen.tsx      # 设置
│   ├── components/
│   │   ├── ContactCard.tsx         # 联系人卡片
│   │   ├── DialButton.tsx          # 拨号按键
│   │   └── PhotoPicker.tsx         # 照片选择器
│   ├── storage/
│   │   └── contactStorage.ts       # 数据持久化
│   ├── context/
│   │   └── FontSizeContext.tsx     # 字体缩放
│   ├── theme/
│   │   └── index.ts               # 主题
│   └── utils/
│       └── phoneCall.ts           # 拨号工具
└── assets/
    └── icon.png                    # 应用图标
```

## 许可

MIT
