'use client';
import { type FC, useRef } from 'react';
import { useHoverDirty } from 'react-use';
import { AnimatePresence, motion } from 'framer-motion';

type TooltipProps = {
  text: string;
  children: React.ReactNode;
};

const Tooltip: FC<TooltipProps> = ({ text, children }) => {
  const tooltipRef = useRef(null);
  const isHovering = useHoverDirty(tooltipRef);
  return (
    <div ref={tooltipRef} className=" group relative inline-block w-full">
      {children}
      <AnimatePresence>
        {isHovering ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1 }}
            role="tooltip"
            className={`pointer-events-none absolute bottom-[-2.7rem] left-[51%] z-30 translate-x-[-50%] rounded-md bg-neutrals-600 px-2 py-1 text-xs text-dark-base ${"before:absolute before:left-[40%] before:top-[-0.5rem] before:h-0 before:w-0 before:content-['']"} 
            ${'before:border-l-[0.5rem] before:border-l-transparent'} 
            ${'before:border-r-[0.5rem] before:border-r-transparent '} 
            ${'before:border-b-[0.5rem] before:border-b-neutrals-600'}`}
          >
            {text}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
