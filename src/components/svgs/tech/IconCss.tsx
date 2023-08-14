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
  className,
}) => {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      height={height}
      width={width}
      className={className}
    >
      <motion.path d="M2.24.9287h19.5188l-1.775 20.0425-8.005 2.265-7.9612-2.2662L2.24.9287zM18.125 5.03l-12.25-.0025.1975 2.4363 9.4112.0025-.2363 2.525H9.075l.2238 2.3912h5.7463l-.34 3.275-2.705.7475-2.7462-.7537-.1762-1.9612h-2.425l.27 3.5838L12 18.855l4.9938-1.4213 1.1313-12.4038z" />
    </motion.svg>
  );
};

export default IconCss;
