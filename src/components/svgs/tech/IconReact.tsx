'use client';
import { type FC } from 'react';
import { motion } from 'framer-motion';
import { type SVGIconProps } from '..';

const IconReact: FC<SVGIconProps> = ({
  strokeWidth = 0.75,
  height = '1em',
  width = '1em',
  className,
}) => {
  return (
    <motion.svg
      fill="none"
      strokeWidth={strokeWidth}
      viewBox="0 0 15 15"
      height={height}
      width={width}
      className={className}
    >
      <motion.path
        fill={className}
        stroke={className}
        strokeWidth={strokeWidth}
        d="M6.5 7.584a1 1 0 102 0 1 1 0 00-2 0z"
      />
      <motion.path
        fill="none"
        stroke={className}
        strokeWidth={strokeWidth}
        d="M14.5 7.584c0 1.657-3.134 3-7 3s-7-1.343-7-3 3.134-3 7-3 7 1.343 7 3z"
      />
      <motion.path
        fill="none"
        stroke={className}
        strokeWidth={strokeWidth}
        d="M4.166 13.739c1.457.79 4.13-1.327 5.972-4.726 1.841-3.4 2.153-6.795.696-7.584-1.457-.79-4.13 1.327-5.972 4.726-1.841 3.4-2.153 6.795-.696 7.584z"
      />
      <motion.path
        fill="none"
        stroke={className}
        strokeWidth={strokeWidth}
        d="M10.834 13.739c-1.457.79-4.13-1.327-5.972-4.726-1.841-3.4-2.153-6.795-.696-7.584 1.457-.79 4.13 1.327 5.972 4.726 1.841 3.4 2.153 6.795.696 7.584z"
      />
    </motion.svg>
  );
};

export default IconReact;
