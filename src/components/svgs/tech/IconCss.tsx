'use client';
import { type FC } from 'react';
import { motion } from 'framer-motion';
import { type SVGIconProps } from '..';

const IconCss: FC<SVGIconProps> = ({
  fill = 'currentColor',
  stroke = 'none',
  strokeWidth = 0,
  height = '1em',
  width = '1em',
}) => {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      height={width}
      width={width}
    >
      <motion.path d="M4.192 3.143h15.615l-1.42 16.034-6.404 1.812-6.369-1.813L4.192 3.143zM16.9 6.424l-9.8-.002.158 1.949 7.529.002-.189 2.02H9.66l.179 1.913h4.597l-.272 2.62-2.164.598-2.197-.603-.141-1.569h-1.94l.216 2.867L12 17.484l3.995-1.137.905-9.923z" />
    </motion.svg>
  );
};

export default IconCss;
