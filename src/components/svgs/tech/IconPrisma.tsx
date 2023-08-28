'use client';
import { type FC } from 'react';
import { motion } from 'framer-motion';
import { type SVGIconProps } from '..';

const IconPrisma: FC<SVGIconProps> = ({
  fill = 'currentColor',
  stroke = 'none',
  strokeWidth = 0,
  className,
}) => {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      className={className}
    >
      <motion.path d="M21.807 18.285L13.553.756a1.324 1.324 0 00-1.129-.754 1.31 1.31 0 00-1.206.626l-8.952 14.5a1.356 1.356 0 00.016 1.455l4.376 6.778a1.408 1.408 0 001.58.581l12.703-3.757c.389-.115.707-.39.873-.755s.164-.783-.007-1.145zm-1.848.752L9.18 22.224a.452.452 0 01-.575-.52l3.85-18.438c.072-.345.549-.4.699-.08l7.129 15.138a.515.515 0 01-.325.713z" />
    </motion.svg>
  );
};

export default IconPrisma;
