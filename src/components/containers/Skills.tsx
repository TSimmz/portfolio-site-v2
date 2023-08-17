'use client';
import React from 'react';
import { motion } from 'framer-motion';
import * as TechIcons from '~/components/svgs/tech';

const transition = {
  rotate: {
    duration: 0.25,
  },
};
const skillWrapper = {
  rest: { rotate: 0 },
  hover: { rotate: 135 },
};

const skillIcon = {
  rest: { rotate: 0 },
  hover: { rotate: -135 },
};

const Skills = () => {
  return (
    <div
      id="skills-container"
      className="flex flex-wrap items-center justify-center gap-4"
    >
      {Object.entries(TechIcons).map(([IconKey, Icon]) => (
        <motion.div
          id={`skill-wrapper-${IconKey.toLowerCase()}`}
          key={`skill-wrapper-${IconKey.toLowerCase()}`}
          variants={skillWrapper}
          initial="rest"
          whileHover="hover"
          animate="rest"
          transition={transition}
          className="flex aspect-square items-center justify-center rounded-2xl bg-accent p-4"
        >
          <motion.div
            className="h-full w-full"
            id={`skill-icon-${IconKey.toLowerCase()}`}
            variants={skillIcon}
            // initial="rest"
            // whileHover="hover"
            // animate="rest"
          >
            <Icon
              height={'32px'}
              width={'32px'}
              className="fill-light stroke-light"
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default Skills;
