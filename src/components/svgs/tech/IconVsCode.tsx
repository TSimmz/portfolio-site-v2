'use client';
import { motion } from 'framer-motion';
function IconBrandVscode() {
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
      <motion.path d="M16 3v18l4-2.5v-13zM9.165 13.903L5 17.5l-2-1L7.333 12m1.735-1.802L16 3v5l-4.795 4.141" />
      <motion.path d="M16 16.5L5 6.5l-2 1L16 21" />
    </motion.svg>
  );
}

export default IconBrandVscode;
