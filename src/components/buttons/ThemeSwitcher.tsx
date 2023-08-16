'use client';

import { type FC, useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import useDarkTheme, { type ThemeType } from '~/hooks/useDarkTheme';
import colors from 'tailwindcss/colors';

const themeSwitcherVariant = {
  rest: (isDarkMode: boolean) => ({
    background: isDarkMode ? colors.slate[700] : colors.slate[400],
  }),
  out: {
    x: 250,
    opacity: 0,
  },
  hover: (isDarkMode: boolean) => ({
    background: isDarkMode ? colors.blue[400] : colors.zinc[800],
  }),
  in: {
    x: 0,
    opacity: 1,
    transition: {
      x: {
        duration: 0.2,
        delay: 0.25,
        type: 'spring',
        bounce: 0.35,
      },
    },
  },
};

const moonVariant = {
  rest: {
    fill: colors.slate[800],
    stroke: colors.slate[800],
  },
  hover: {
    fill: colors.yellow[400],
    stroke: colors.yellow[400],
    rotate: [-5, 10, -5, 10, -5],
    transition: {
      rotate: {
        duration: 1,
        ease: 'easeInOut',
        times: [0, 0.25, 0.5, 0.75, 1],
        repeat: Infinity,
      },
    },
  },
};

const sunVariant = {
  rest: {
    fill: colors.slate[200],
  },
  hover: {
    fill: colors.yellow[200],
    rotate: [-5, 10, -5, 10, -5],
    transition: {
      rotate: {
        duration: 1,
        ease: 'easeInOut',
        times: [0, 0.25, 0.5, 0.75, 1],
        repeat: Infinity,
      },
    },
  },
};

const moonFillVariant = {
  rest: {
    fill: colors.slate[800],
  },
  hover: {
    fill: colors.yellow[400],
  },
};

const sunFillVariant = {
  rest: {
    fill: colors.slate[200],
  },
  hover: {
    fill: colors.yellow[200],
  },
};

const dropdownContainerVariant = {
  open: {
    opacity: 1,
  },
  close: {
    opacity: 0,
  },
};

const dropdownVariant = {
  open: {
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariant = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { delay: 0.2, stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { delay: 0.2, stiffness: 1000 },
    },
  },
};

type ThemeSwitcherProps = {
  title?: string;
};

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ title }) => {
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
  }, []);

  return (
    <motion.details
      title={title}
      ref={detailsRef}
      onClick={() => handleDetailsClick()}
      variants={themeSwitcherVariant}
      initial={['rest', 'out']}
      whileHover="hover"
      animate={['rest', 'in']}
      custom={isDarkMode}
      className="group relative flex !h-10 items-center justify-center rounded-md"
    >
      <motion.summary
        className={`pointer-events-auto relative flex list-none items-center justify-center gap-2 bg-transparent px-3 py-2`}
      >
        <button
          className="mr-2 overflow-visible"
          onClick={(e) => {
            e.stopPropagation();
            if (isDetailsOpen) setIsDetailsOpen(false);
            onThemeClick(isDarkMode ? 'light' : 'dark');
          }}
        >
          <AnimatePresence>
            {!isDarkMode ? (
              <motion.svg
                id="moon-icon"
                viewBox="0 0 16 16"
                variants={moonVariant}
                className="h-6 w-6 stroke-[0.3]"
              >
                <motion.path d="M6 .278a.768.768 0 01.08.858 7.208 7.208 0 00-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 01.81.316.733.733 0 01-.031.893A8.349 8.349 0 018.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 016 .278zM4.858 1.311A7.269 7.269 0 001.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 005.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                <motion.path d="M10.794 3.148a.217.217 0 01.412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 010 .412l-1.162.387a1.734 1.734 0 00-1.097 1.097l-.387 1.162a.217.217 0 01-.412 0l-.387-1.162A1.734 1.734 0 009.31 6.593l-1.162-.387a.217.217 0 010-.412l1.162-.387a1.734 1.734 0 001.097-1.097l.387-1.162zM13.863.099a.145.145 0 01.274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 010 .274l-.774.258a1.156 1.156 0 00-.732.732l-.258.774a.145.145 0 01-.274 0l-.258-.774a1.156 1.156 0 00-.732-.732l-.774-.258a.145.145 0 010-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
              </motion.svg>
            ) : (
              <motion.svg
                id="sun-icon"
                viewBox="0 0 512 512"
                className="h-6 w-6"
                variants={sunVariant}
              >
                <motion.path d="M505.2 324.8l-47.73-68.78 47.75-68.81c7.359-10.62 8.797-24.12 3.844-36.06-4.969-11.94-15.52-20.44-28.22-22.72l-82.39-14.88-14.89-82.41c-2.281-12.72-10.76-23.25-22.69-28.22-11.97-4.936-25.42-3.498-36.12 3.844L256 54.49 187.2 6.709c-10.7-7.31-24.1-8.748-36.1-3.813-11.92 4.971-20.4 15.5-22.7 28.19l-14.89 82.44L31.15 128.4c-12.73 2.3-23.296 10.8-28.25 22.8-4.951 11.9-3.5 25.4 3.875 36l47.73 68.78-47.75 68.81c-7.359 10.62-8.795 24.12-3.844 36.06 4.969 11.94 15.52 20.44 28.22 22.72l82.39 14.88 14.89 82.41c2.297 12.72 10.78 23.25 22.7 28.22 11.95 4.906 25.44 3.531 36.09-3.844L256 457.5l68.83 47.78c6.47 4.42 13.97 6.72 21.47 6.72 4.906 0 9.859-.969 14.56-2.906 11.92-4.969 20.4-15.5 22.7-28.19l14.89-82.44 82.37-14.88c12.73-2.281 23.3-10.78 28.25-22.75 5.03-11.934 3.53-25.434-3.87-36.034zm-48.4 14.4l-99.61 18-18 99.63L256 399.1l-83.2 57.7-18-99.63-99.61-18 57.71-84.07-57.67-82.3 99.61-18 18-99.63L256 112.9l83.15-57.75 18.02 99.66 99.61 18-57.68 82.29 57.7 84.1zM256 143.1c-61.85 0-111.1 50.14-111.1 111.1 0 61.85 50.15 111.1 111.1 111.1s111.1-50.14 111.1-111.1c0-60.1-49.3-111.1-111.1-111.1zm0 176c-35.28 0-63.99-28.71-63.99-63.99S220.7 192 256 192s63.99 28.71 63.99 63.1-28.69 64-63.99 64z" />
              </motion.svg>
            )}
          </AnimatePresence>
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
            variants={isDarkMode ? sunFillVariant : moonFillVariant}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.0923063 2.99742L2.09231 0.330753C2.33443 -0.0843097 2.91311 -0.108725 3.19482 0.257506L5.24401 2.99742C5.50327 3.44186 5.18269 4 4.66816 4L0.668159 4C0.153632 4 -0.166949 3.44186 0.0923063 2.99742Z"
          ></motion.path>
        </motion.svg>
      </motion.summary>
      <motion.div
        variants={dropdownContainerVariant}
        initial={false}
        animate={isDetailsOpen ? 'open' : 'close'}
        className="absolute right-0 mt-[0.7rem] !w-24 rounded-md"
      >
        <motion.ul
          variants={dropdownVariant}
          layout
          className={`${'relative rounded-md bg-neutrals-300 px-4 py-2 text-sm dark:bg-neutrals-600'} 
          ${"before:absolute before:right-[6px] before:top-[-0.65rem] before:h-0 before:w-0 before:content-['']"} 
          ${'before:border-l-[0.7rem] before:border-l-transparent'} 
          ${'before:border-r-[0.7rem] before:border-r-transparent '} 
          ${'before:border-b-[0.7rem] before:border-b-neutrals-300 dark:before:border-b-neutrals-600'}`}
        >
          <motion.li
            variants={itemVariant}
            layout
            className={`w-full cursor-pointer p-1 ${
              themeMode === 'light' ? 'text-brand-500' : ''
            }`}
            onClick={() => handleThemeClick('light')}
          >
            Light
          </motion.li>
          <motion.li
            variants={itemVariant}
            layout
            className={`w-full cursor-pointer p-1 ${
              themeMode === 'dark' ? 'text-brand-500' : ''
            }`}
            onClick={() => handleThemeClick('dark')}
          >
            Dark
          </motion.li>
          <motion.li
            variants={itemVariant}
            layout
            className={`w-full cursor-pointer p-1 ${
              themeMode === 'system' ? 'text-brand-500' : ''
            }`}
            onClick={() => handleThemeClick('system')}
          >
            System
          </motion.li>
        </motion.ul>
      </motion.div>
    </motion.details>
  );
};

export default ThemeSwitcher;
