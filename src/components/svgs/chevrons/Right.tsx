'use client';
import { type FC } from 'react';
import { motion } from 'framer-motion';
import { type SVGIconProps } from '..';
import { ctaLeftBounceVariant, ctaRightBounceVariant } from '.';

const Right: FC<SVGIconProps> = ({ className }) => {
  return (
    <svg
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      className={className}
    >
      <motion.path
        variants={ctaLeftBounceVariant}
        animate="animate"
        d="M13 17l5-5-5-5"
      />
      <motion.path
        variants={ctaRightBounceVariant}
        animate="animate"
        d="M6 17l5-5-5-5"
      />
    </svg>
  );
};

export default Right;
