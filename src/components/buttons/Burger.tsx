'use client';

import { type FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import colors from 'tailwindcss/colors';

const burgerVariant = {
  closed: {
    pathLength: 0,
  },
  opened: {
    pathLength: 1,
    transition: {
      delay: 0.15,
    },
  },
};

type BurgerProps = {
  title?: string;
  opened: boolean;
  className?: string;
  onClick: (nextValue: unknown) => void;
};

const Burger: FC<BurgerProps> = ({ title, opened, onClick, className }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    document.documentElement.classList.contains('dark'),
  );

  useEffect(() => {
    if (document.documentElement.classList.contains('dark') !== isDarkMode)
      setIsDarkMode((prev) => !prev);
  });

  return (
    <motion.button
      initial={{
        x: 100,
      }}
      animate={{
        x: 0,
        transition: {
          x: {
            duration: 0.2,
            delay: 0.25,
            type: 'spring',
            bounce: 0.35,
          },
        },
      }}
      title={title}
      onClick={onClick}
      className={`flex !h-10 !w-10 items-center justify-center rounded-md hover:backdrop-brightness-125 ${
        className ? className : ''
      }`}
    >
      <motion.svg
        className="h-8 w-8"
        fill="none"
        animate={{
          stroke: opened
            ? colors.rose['500']
            : isDarkMode
            ? colors.slate[300]
            : colors.slate[700],
        }}
        transition={{ delay: 0.1 }}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          name={'close-A'}
          fill="none"
          strokeWidth="2.2"
          d="M6 18 L18 6"
          variants={burgerVariant}
          initial="closed"
          animate={opened ? 'opened' : 'closed'}
        />
        <motion.path
          name={'close-B'}
          fill="none"
          strokeWidth="2.2"
          d="M6 6 L18 18"
          variants={burgerVariant}
          initial="closed"
          animate={opened ? 'opened' : 'closed'}
        />
        <motion.path
          name={'burger-stack-top'}
          fill="none"
          strokeWidth="2"
          d="M4 6 h16"
          variants={burgerVariant}
          initial="opened"
          animate={opened ? 'closed' : 'opened'}
        />
        <motion.path
          name={'burger-stack-mid'}
          fill="none"
          strokeWidth="2"
          d="M 20 12 h -16"
          variants={burgerVariant}
          initial="opened"
          animate={opened ? 'closed' : 'opened'}
        />
        <motion.path
          name={'burger-stack-bottom'}
          fill="none"
          strokeWidth="2"
          d="M4 18 h16"
          variants={burgerVariant}
          initial="opened"
          animate={opened ? 'closed' : 'opened'}
        />
      </motion.svg>
    </motion.button>
  );
};

export default Burger;
