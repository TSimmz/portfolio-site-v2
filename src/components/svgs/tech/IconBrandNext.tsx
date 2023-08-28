'use client';
import { type FC } from 'react';
import { motion } from 'framer-motion';
import { type SVGIconProps } from '..';

const IconBrandNext: FC<SVGIconProps> = ({ strokeWidth = 2, className }) => {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="none"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
    >
      <motion.path stroke="none" fill="none" d="M0 0h24v24H0z" />
      <motion.path
        fill="none"
        d="M9 15V9l7.745 10.65A9 9 0 1119 17.657M15 12V9"
      />
    </motion.svg>
  );
};

export default IconBrandNext;
