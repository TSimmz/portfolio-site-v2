'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { type SVGIconProps } from '..';

const IconBrandMantine: FC<SVGIconProps> = ({
  stroke = 'currentColor',
  strokeWidth = 2,
  className,
}) => {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      className={className}
    >
      <motion.path stroke="none" fill="none" d="M0 0h24v24H0z" />
      <motion.path
        fill="none"
        stroke={className}
        d="M21 12 A9 9 0 0 1 12 21 A9 9 0 0 1 3 12 A9 9 0 0 1 21 12 z"
      />
      <motion.path
        fill="none"
        stroke={className}
        d="M11 16a4.97 4.97 0 002-4 5.01 5.01 0 00-2-4M14 9h-2M14 15h-2M10 12h.01"
      />
    </motion.svg>
  );
};

export default IconBrandMantine;
