'use client';
import { type FC } from 'react';
import { motion } from 'framer-motion';
import { type SVGIconProps } from '..';

const IconFramer: FC<SVGIconProps> = ({
  fill = 'currentColor',
  stroke = 'none',
  strokeWidth = 0,
  height = '1em',
  width = '1em',
  className,
}) => {
  return (
    <motion.svg
      viewBox="0 0 15 15"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      height={height}
      width={width}
      className={className}
    >
      <motion.path
        fill={fill}
        d="M2.038.309A.5.5 0 012.5 0h10a.5.5 0 01.5.5v5a.5.5 0 01-.5.5H8.707l4.147 4.146A.5.5 0 0112.5 11H8v3.5a.5.5 0 01-.854.354l-5-5A.5.5 0 012 9.5v-4a.5.5 0 01.5-.5h3.793L2.146.854a.5.5 0 01-.108-.545z"
      />
    </motion.svg>
  );
};

export default IconFramer;
