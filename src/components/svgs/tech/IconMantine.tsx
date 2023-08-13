'use client';
import { motion } from 'framer-motion';
function IconBrandMantine() {
  return (
    <motion.svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
    >
      <motion.path stroke="none" d="M0 0h24v24H0z" />
      <motion.path d="M21 12 A9 9 0 0 1 12 21 A9 9 0 0 1 3 12 A9 9 0 0 1 21 12 z" />
      <motion.path d="M11 16a4.97 4.97 0 002-4 5.01 5.01 0 00-2-4M14 9h-2M14 15h-2M10 12h.01" />
    </motion.svg>
  );
}

export default IconBrandMantine;
