'use client';
import { type FC } from 'react';
import { motion } from 'framer-motion';
import { type SVGIconProps } from '..';
import { ctaTopBounceVariant, ctaBottomBounceVariant } from '.';

const Down: FC<SVGIconProps> = ({ className }) => {
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
        variants={ctaTopBounceVariant}
        animate="animate"
        d="M7 13l5 5 5-5"
      />
      <motion.path
        variants={ctaBottomBounceVariant}
        animate="animate"
        d="M7 6l5 5 5-5"
      />
    </svg>
  );
};

export default Down;
