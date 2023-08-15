'use client';

import { type FC, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import useDarkTheme, { type ThemeType } from '~/hooks/useDarkTheme';

type ThemeSwitcherProps = {
  title?: string;
  className?: string;
};

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ title, className }) => {
  const { isDarkMode, themeMode, onThemeClick } = useDarkTheme();
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleDetailsClick = () => {
    setIsDetailsOpen((prevState) => !prevState);
  };

  const handleThemeClick = (theme: ThemeType) => {
    onThemeClick(theme);
    if (
      detailsRef.current !== null &&
      detailsRef.current.hasAttribute('open')
    ) {
      detailsRef.current.removeAttribute('open');
    }
  };

  useEffect(() => {
    if (
      detailsRef.current !== null &&
      detailsRef.current.hasAttribute('open')
    ) {
      setIsDetailsOpen(true);
    } else if (
      detailsRef.current !== null &&
      !detailsRef.current.hasAttribute('open')
    ) {
      setIsDetailsOpen(false);
    }

    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      onThemeClick('dark');
    } else {
      onThemeClick('light');
    }
  }, []);

  return (
    <motion.details
      title={title}
      ref={detailsRef}
      onClick={() => handleDetailsClick()}
      className={`relative flex !h-10 items-center justify-center rounded-md hover:backdrop-brightness-125 ${
        className ? className : ''
      }`}
    >
      <summary className="pointer-events-auto relative flex list-none items-center justify-center gap-2 px-3 py-2">
        <button
          className="mr-2"
          onClick={(e) => {
            e.stopPropagation();
            onThemeClick(isDarkMode ? 'light' : 'dark');
          }}
        >
          {!isDarkMode ? (
            <motion.svg
              viewBox="0 0 16 16"
              className="h-6 w-6 fill-light dark:fill-dark"
            >
              <motion.path d="M6 .278a.768.768 0 01.08.858 7.208 7.208 0 00-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 01.81.316.733.733 0 01-.031.893A8.349 8.349 0 018.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 016 .278zM4.858 1.311A7.269 7.269 0 001.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 005.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
              <motion.path d="M10.794 3.148a.217.217 0 01.412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 010 .412l-1.162.387a1.734 1.734 0 00-1.097 1.097l-.387 1.162a.217.217 0 01-.412 0l-.387-1.162A1.734 1.734 0 009.31 6.593l-1.162-.387a.217.217 0 010-.412l1.162-.387a1.734 1.734 0 001.097-1.097l.387-1.162zM13.863.099a.145.145 0 01.274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 010 .274l-.774.258a1.156 1.156 0 00-.732.732l-.258.774a.145.145 0 01-.274 0l-.258-.774a1.156 1.156 0 00-.732-.732l-.774-.258a.145.145 0 010-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
            </motion.svg>
          ) : (
            <motion.svg
              viewBox="0 0 16 16"
              className="h-6 w-6 fill-light dark:fill-dark"
            >
              <motion.path d="M8 11a3 3 0 110-6 3 3 0 010 6zm0 1a4 4 0 100-8 4 4 0 000 8zM8 0a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 0zm0 13a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 13zm8-5a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zM3 8a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2A.5.5 0 013 8zm10.657-5.657a.5.5 0 010 .707l-1.414 1.415a.5.5 0 11-.707-.708l1.414-1.414a.5.5 0 01.707 0zm-9.193 9.193a.5.5 0 010 .707L3.05 13.657a.5.5 0 01-.707-.707l1.414-1.414a.5.5 0 01.707 0zm9.193 2.121a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707zM4.464 4.465a.5.5 0 01-.707 0L2.343 3.05a.5.5 0 11.707-.707l1.414 1.414a.5.5 0 010 .708z" />
            </motion.svg>
          )}
        </button>
        <motion.svg
          viewBox="0 0 6 4"
          height={8}
          width={12}
          initial={{ rotate: 90 }}
          animate={{ rotate: isDetailsOpen ? 180 : 90 }}
          className="mt-1"
        >
          <motion.path
            className="fill-light dark:fill-dark"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.0923063 2.99742L2.09231 0.330753C2.33443 -0.0843097 2.91311 -0.108725 3.19482 0.257506L5.24401 2.99742C5.50327 3.44186 5.18269 4 4.66816 4L0.668159 4C0.153632 4 -0.166949 3.44186 0.0923063 2.99742Z"
          ></motion.path>
        </motion.svg>
      </summary>

      <ul className="absolute right-0 mt-3 !w-24 rounded-md bg-neutrals-300 px-4 py-2 text-sm dark:bg-neutrals-700">
        <li
          className={`w-full cursor-pointer p-1 ${
            themeMode === 'light' ? 'text-brand-500' : ''
          }`}
          onClick={() => handleThemeClick('light')}
        >
          Light
        </li>
        <li
          className={`w-full cursor-pointer p-1 ${
            themeMode === 'dark' ? 'text-brand-500' : ''
          }`}
          onClick={() => handleThemeClick('dark')}
        >
          Dark
        </li>
        <li
          className={`w-full cursor-pointer p-1 ${
            themeMode === 'system' ? 'text-brand-500' : ''
          }`}
          onClick={() => handleThemeClick('system')}
        >
          System
        </li>
      </ul>
    </motion.details>
  );
};

export default ThemeSwitcher;
