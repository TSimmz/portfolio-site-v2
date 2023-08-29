'use client';

import { useRef } from 'react';
import { useHoverDirty } from 'react-use';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '~/hooks';

const buttonVariant = {
  initial: {
    y: -100,
    opacity: 0,
    scale: 0.8,
  },
  animateIn: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.65,
    },
  },
  autoOpenClose: {
    width: [38, 125],
    transition: {
      delay: 2,
      width: {
        duration: 1,
        ease: 'easeOut',
        times: [0, 0.5],
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 5,
      },
    },
  },
  hover: { width: 125 },
  tap: { scale: 0.9 },
};

const iconBounceVariant = {
  animate: {
    y: [-1.5, 0.5, -1.5],
    transition: {
      y: {
        duration: 1,
        ease: 'easeInOut',
        times: [0, 0.5, 1],
        repeat: Infinity,
      },
    },
  },
};

const textVariant = {
  enter: {
    width: 0,
    x: -500,
    opacity: 0,
    transition: {
      width: {
        delay: 0.5,
      },
    },
  },
  open: (isHovering: boolean) => ({
    opacity: isHovering ? 1 : 0,
    width: isHovering ? 'auto' : 0,
    x: isHovering ? -15 : -500,
  }),
  autoOpenClose: (isHovering: boolean) => ({
    opacity: !isHovering ? [0, 1] : [1, 1],
    width: !isHovering ? [0, 70] : [70, 70],
    x: !isHovering ? [-500, -4] : [-4, -4],
    transition: {
      delay: 2,
      opacity: {
        repeatType: 'reverse',
        duration: 1,
        ease: 'easeInOut',
        times: [0, 0.5],
        repeat: Infinity,
        repeatDelay: 5,
      },
      width: {
        repeatType: 'reverse',
        duration: 1,
        ease: 'easeInOut',
        times: [0, 0.5],
        repeat: Infinity,
        repeatDelay: 5,
      },
      x: {
        repeatType: 'reverse',
        duration: 1,
        ease: 'easeInOut',
        times: [0, 0.5],
        repeat: Infinity,
        repeatDelay: 5,
      },
    },
  }),
  exit: {
    opacity: 0,
    x: -500,
    width: 0,
    transition: {
      x: {
        delay: 0.1,
      },
    },
  },
};

const ResumeButton = () => {
  const linkRef = useRef<HTMLButtonElement>(null);
  const isHovering = useHoverDirty(linkRef);
  const { isDarkMode } = useTheme();

  const resumeUrlPath = isDarkMode
    ? process.env.NEXT_PUBLIC_DARK_RESUME_PATH! ?? '/'
    : process.env.NEXT_PUBLIC_LIGHT_RESUME_PATH! ?? '/';

  return (
    <motion.button
      ref={linkRef}
      variants={buttonVariant}
      initial="initial"
      animate={['animateIn', 'autoOpenClose']}
      whileHover="hover"
      whileTap="tap"
      className="pointer-events-auto origin-left scale-75 cursor-pointer rounded-lg bg-brandLight-500 p-1 dark:bg-brandDark-500"
    >
      <Link
        target="_blank"
        href={resumeUrlPath}
        className="flex items-center justify-between overflow-hidden "
      >
        <svg viewBox="0 0 32 32" className="z-10 h-7 w-7 scale-125 fill-light">
          <motion.path
            variants={iconBounceVariant}
            animate="animate"
            d="M15.47 18.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L16.75 16.44V9.75a.75.75 0 00-1.5 0v6.69L12.78 13.97a.75.75 0 00-1.06 1.06l3.75 3.75z"
          />
          <motion.path d="M11.75 21a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z" />
        </svg>
        <AnimatePresence>
          <motion.span
            variants={textVariant}
            initial="enter"
            animate={['open', 'autoOpenClose']}
            exit="exit"
            custom={isHovering}
            className="origin-left font-semibold text-dark-base"
          >
            Resume
          </motion.span>
        </AnimatePresence>
      </Link>
    </motion.button>
  );
};

export default ResumeButton;
