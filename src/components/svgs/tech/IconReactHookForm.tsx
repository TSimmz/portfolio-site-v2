'use client';
import { type FC } from 'react';
import { motion } from 'framer-motion';
import { type SVGIconProps } from '..';

const IconReacthookform: FC<SVGIconProps> = ({
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
      height={height}
      width={width}
    >
      <motion.path d="M10.775 17.348H5.806a.281.281 0 100 .563h4.97a.281.281 0 100-.563zm7.32 0h-4.969a.281.281 0 100 .563h4.969a.281.281 0 000-.563zm-7.334-6.475H5.807a.281.281 0 100 .563h4.954a.281.281 0 100-.563zm7.32 0h-4.955a.281.281 0 100 .563h4.955a.281.281 0 000-.563zm.552-9.2h-4.341a2.404 2.404 0 00-4.58 0H5.366a3.097 3.097 0 00-3.096 3.096v16.134A3.097 3.097 0 005.367 24h13.266a3.097 3.097 0 003.096-3.097V4.77a3.097 3.097 0 00-3.096-3.096zm-8.705.563a.281.281 0 00.281-.223 1.841 1.841 0 013.598 0 .281.281 0 00.282.223h1.514V4.08a.845.845 0 01-.844.844H9.255a.845.845 0 01-.844-.844V2.236zm11.238 18.667c0 1.4-1.134 2.534-2.533 2.534H5.367a2.534 2.534 0 01-2.533-2.534V4.77c0-1.399 1.134-2.533 2.533-2.533h2.48V4.08c0 .777.63 1.407 1.408 1.407h5.49c.777 0 1.407-.63 1.407-1.407V2.236h2.48c1.4 0 2.534 1.134 2.534 2.533z" />
    </motion.svg>
  );
};

export default IconReacthookform;
