import { useState, useEffect, useCallback } from 'react';
import { themeLocalStorageId } from '~/utils/constants';

const themeTypes = {
  light: 'light',
  dark: 'dark',
  system: 'system',
} as const;

export type ThemeType = keyof typeof themeTypes;

function useDarkTheme() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [themeMode, setThemeMode] = useState<ThemeType | null>(null);

  const handleSystemChange = (mediaQuery: MediaQueryList) => {
    if (localStorage[themeLocalStorageId] === themeTypes.system) {
      const theme = mediaQuery.matches ? 'dark' : 'light';
      if (theme === themeTypes.dark) {
        document.documentElement.classList.add('dark');
        setIsDarkMode(true);
      } else {
        document.documentElement.classList.remove('dark');
        setIsDarkMode(false);
      }
    }
  };

  const handleSystemChangeEvent = useCallback((event: MediaQueryListEvent) => {
    if (localStorage[themeLocalStorageId] === themeTypes.system) {
      const theme = event.matches ? 'dark' : 'light';
      if (theme === themeTypes.dark) {
        document.documentElement.classList.add('dark');
        setIsDarkMode(true);
      } else {
        document.documentElement.classList.remove('dark');
        setIsDarkMode(false);
      }
    }
  }, []);

  useEffect(() => {
    if (themeMode === 'system') {
      handleSystemChange(window.matchMedia('(prefers-color-scheme: dark)'));
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', handleSystemChangeEvent.bind(null), true);
    } else {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener(
          'change',
          handleSystemChangeEvent.bind(null),
          true,
        );
    }

    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener(
          'change',
          handleSystemChangeEvent.bind(null),
          true,
        );
  }, [themeMode]);

  useEffect(() => {
    // If key not in local storage or value is not valid type, set to system
    if (!(themeLocalStorageId in localStorage)) {
      onThemeClick('system');
    } else if (!(localStorage[themeLocalStorageId] in themeTypes)) {
      onThemeClick('system');
    } else {
      onThemeClick(localStorage[themeLocalStorageId] as ThemeType);
    }
  }, []);

  const setSystemTheme = () => {
    localStorage[themeLocalStorageId] = themeTypes.system;
    setThemeMode(themeTypes.system);
  };

  const setDarkTheme = () => {
    document.documentElement.classList.add(themeTypes.dark);
    localStorage[themeLocalStorageId] = themeTypes.dark;
    setIsDarkMode(true);
    setThemeMode(themeTypes.dark);
  };

  const setLightTheme = () => {
    document.documentElement.classList.remove(themeTypes.dark);
    localStorage[themeLocalStorageId] = themeTypes.light;
    setIsDarkMode(false);
    setThemeMode(themeTypes.light);
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
