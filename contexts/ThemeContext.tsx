import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: {
    background: string;
    surface: string;
    text: string;
    primary: string;
    secondary: string;
    border: string;
    buttonBackground: string;
    operatorButton: string;
    equalButton: string;
    clearButton: string;
    historyItem: string;
    historyText: string;
    shadow: string;
  };
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  colors: {
    background: '#000000',
    surface: '#1a1a1a',
    text: '#ffffff',
    primary: '#3b82f6',
    secondary: '#60a5fa',
    border: '#333333',
    buttonBackground: '#333333',
    operatorButton: '#0063e6',
    equalButton: '#0284c7',
    clearButton: '#4b5563',
    historyItem: '#1e293b',
    historyText: '#e2e8f0',
    shadow: 'rgba(0, 0, 0, 0.5)',
  },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const deviceColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(deviceColorScheme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    if (deviceColorScheme) {
      setTheme(deviceColorScheme === 'dark' ? 'dark' : 'light');
    }
  }, [deviceColorScheme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const colors = {
    light: {
      background: '#f8fafc',
      surface: '#ffffff',
      text: '#0f172a',
      primary: '#2563eb',
      secondary: '#3b82f6',
      border: '#e5e7eb',
      buttonBackground: '#e2e8f0',
      operatorButton: '#3b82f6',
      equalButton: '#0ea5e9',
      clearButton: '#6b7280',
      historyItem: '#f1f5f9',
      historyText: '#1e293b',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
    dark: {
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f8fafc',
      primary: '#3b82f6',
      secondary: '#60a5fa',
      border: '#334155',
      buttonBackground: '#334155',
      operatorButton: '#0063e6',
      equalButton: '#0284c7',
      clearButton: '#4b5563',
      historyItem: '#1e293b',
      historyText: '#e2e8f0',
      shadow: 'rgba(0, 0, 0, 0.5)',
    },
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colors: colors[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);