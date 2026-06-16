import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import ContactsScreen from './src/screens/ContactsScreen';
import DialPadScreen from './src/screens/DialPadScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AddContactScreen from './src/screens/AddContactScreen';
import ContactDetailScreen from './src/screens/ContactDetailScreen';
import { FontSizeProvider } from './src/context/FontSizeContext';
import { Contact } from './src/types';
import { colors, sizes } from './src/theme';

// ============ 导航类型定义 ============

export type RootStackParamList = {
  MainTabs: undefined;
  AddContact: { contact?: Contact };
  ContactDetail: { contact: Contact };
};

export type TabParamList = {
  Contacts: undefined;
  DialPad: undefined;
  Settings: undefined;
};

// ============ Tab 导航 ============

const Tab = createBottomTabNavigator<TabParamList>();

const TabIcon: React.FC<{ label: string; focused: boolean }> = ({ label, focused }) => (
  <Text style={{ fontSize: 28, opacity: focused ? 1 : 0.5 }}>{label}</Text>
);

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          height: 72,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          tabBarLabel: '通讯录',
          tabBarIcon: ({ focused }) => <TabIcon label="👥" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="DialPad"
        component={DialPadScreen}
        options={{
          tabBarLabel: '拨号',
          tabBarIcon: ({ focused }) => <TabIcon label="📞" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: '设置',
          tabBarIcon: ({ focused }) => <TabIcon label="⚙️" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

// ============ Root Stack 导航 ============

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <FontSizeProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
            headerTitleStyle: {
              fontSize: sizes.iconSize,
              fontWeight: '600',
            },
            headerBackTitle: '返回',
            headerBackTitleStyle: {
              fontSize: 20,
            },
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        >
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddContact"
            component={AddContactScreen}
            options={{
              title: '添加联系人',
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="ContactDetail"
            component={ContactDetailScreen}
            options={({ route }) => ({
              title: route.params.contact.name || '联系人详情',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FontSizeProvider>
  );
};

export default App;
