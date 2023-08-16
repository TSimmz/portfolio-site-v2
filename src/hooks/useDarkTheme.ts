import { useState, useEffect } from 'react';

export type ThemeType = 'light' | 'dark' | 'system';

function useDarkTheme() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [themeMode, setThemeMode] = useState<ThemeType>('system');

  const handleSystemChange = (event: MediaQueryListEvent) => {
    event.matches ? 'dark' : 'light';
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
    const darkMode = document.documentElement.classList.contains('dark');
    setIsDarkMode(darkMode);

    if (!('theme' in localStorage)) {
      onThemeClick('system');
    } else {
      if (localStorage.theme === 'dark') onThemeClick('dark');
      else onThemeClick('light');
    }
  }, []);

  const setSystemTheme = () => {
    localStorage.removeItem('theme');
    setThemeMode('system');
  };

  const setDarkTheme = () => {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
    setIsDarkMode(true);
    setThemeMode('dark');
  };

  const setLightTheme = () => {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
    setIsDarkMode(false);
    setThemeMode('light');
  };

  const onThemeClick = (theme: ThemeType) => {
    if (theme === 'system') {
      localStorage.removeItem('theme');
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
