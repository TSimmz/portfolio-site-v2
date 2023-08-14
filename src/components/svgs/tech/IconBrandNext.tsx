'use client';
import { type FC } from 'react';
import { motion } from 'framer-motion';
import { type SVGIconProps } from '..';

const IconBrandNext: FC<SVGIconProps> = ({
  fill = 'none',
  stroke = 'currentColor',
  strokeWidth = 2,
  height = '1em',
  width = '1em',
}) => {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      height={height}
      width={width}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <motion.path stroke="none" d="M0 0h24v24H0z" />
      <motion.path d="M9 15V9l7.745 10.65A9 9 0 1119 17.657M15 12V9" />
    </motion.svg>
  );
};

export default IconBrandNext;
