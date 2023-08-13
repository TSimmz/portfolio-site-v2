'use client';
import { motion } from 'framer-motion';
function IconBrandNext() {
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
      <motion.path d="M9 15V9l7.745 10.65A9 9 0 1119 17.657M15 12V9" />
    </motion.svg>
  );
}

export default IconBrandNext;
