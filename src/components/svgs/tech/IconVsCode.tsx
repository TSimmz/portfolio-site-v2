'use client';
import { type FC } from 'react';
import { motion } from 'framer-motion';
import { type SVGIconProps } from '..';

const IconBrandVscode: FC<SVGIconProps> = ({
  fill = 'none',
  stroke = 'currentColor',
  strokeWidth = 1,
  className,
}) => {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      className={className}
    >
      <motion.path fill="none" stroke="none" d="M0 0h24v24H0z" />
      <motion.path d="M16 3v18l4-2.5v-13zM9.165 13.903L5 17.5l-2-1L7.333 12m1.735-1.802L16 3v5l-4.795 4.141" />
      <motion.path
        fill="none"
        stroke={className}
        d="M16 16.5L5 6.5l-2 1L16 21"
      />
    </motion.svg>
  );
};

export default IconBrandVscode;
