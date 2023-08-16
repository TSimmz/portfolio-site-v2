import { useState, useEffect } from 'react';
import { themeLocalStorageId } from '~/utils/constants';

const themeTypes = {
  light: 'light',
  dark: 'dark',
  system: 'system',
} as const;

export type ThemeType = keyof typeof themeTypes;

function useDarkTheme() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [themeMode, setThemeMode] = useState<ThemeType>('system');

  const handleSystemChange = (event: MediaQueryListEvent) => {
    const themeMode = event.matches ? 'dark' : 'light';
    if (themeMode === themeTypes.dark) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  };

  useEffect(() => {
    if (themeMode === 'system')
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', handleSystemChange);
    else
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleSystemChange);

    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleSystemChange);
  }, [themeMode]);

  useEffect(() => {
    // If key not in local storage or value is not valid type, set to system
    if (
      !(themeLocalStorageId in localStorage) ||
      !(localStorage[themeLocalStorageId] in themeTypes)
    ) {
      onThemeClick('system');
    }
    // Else set theme value
    else {
      onThemeClick(localStorage[themeLocalStorageId] as ThemeType);
    }

    const darkMode = document.documentElement.classList.contains('dark');
    setIsDarkMode(darkMode);
  }, []);

  const setSystemTheme = () => {
    localStorage[themeLocalStorageId] = 'system';
    setThemeMode('system');
  };

  const setDarkTheme = () => {
    document.documentElement.classList.add('dark');
    localStorage[themeLocalStorageId] = 'dark';
    setIsDarkMode(true);
    setThemeMode('dark');
  };

  const setLightTheme = () => {
    document.documentElement.classList.remove('dark');
    localStorage[themeLocalStorageId] = 'light';
    setIsDarkMode(false);
    setThemeMode('light');
  };

  const onThemeClick = (theme: ThemeType) => {
    if (theme === 'system') {
      localStorage.removeItem(themeLocalStorageId);
      setSystemTheme();
    } else if (theme === 'dark') {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  };

  return {
    isDarkMode,
    themeMode,
    onThemeClick,
  };
}

export default useDarkTheme;
