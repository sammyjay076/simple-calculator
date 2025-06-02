import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Calculator, History, Sun, Moon } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Pressable } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function TabLayout() {
  useFrameworkReady();
  const { theme, toggleTheme } = useTheme();
  const colorScheme = useColorScheme();
  const isDark = theme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? '#3b82f6' : '#2563eb',
        tabBarInactiveTintColor: isDark ? '#9ca3af' : '#6b7280',
        tabBarStyle: {
          backgroundColor: isDark ? '#121212' : '#ffffff',
          borderTopColor: isDark ? '#333333' : '#e5e7eb',
        },
        headerStyle: {
          backgroundColor: isDark ? '#121212' : '#ffffff',
        },
        headerTintColor: isDark ? '#ffffff' : '#000000',
        headerRight: () => (
          <Pressable onPress={toggleTheme} style={{ marginRight: 16 }}>
            {isDark ? (
              <Sun size={24} color="#ffffff" />
            ) : (
              <Moon size={24} color="#000000" />
            )}
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="calculator"
        options={{
          title: 'Calculator',
          tabBarIcon: ({ color, size }) => (
            <Calculator size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <History size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}