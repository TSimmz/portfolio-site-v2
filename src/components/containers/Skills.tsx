'use client';
import { useEffect } from 'react';
import { motion, stagger, useAnimate, useInView } from 'framer-motion';
import techIcons from '../svgs/tech';

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

const staggerSkills = stagger(0.12, { startDelay: 0.25, from: 'center' });

const Skills = () => {
  const [skillsRef, animateSkills] = useAnimate();
  const areSkillsInView = useInView(skillsRef, { once: true });

  useEffect(() => {
    // eslint-disable-next-line
    animateSkills(
      '.skill-square',
      {
        opacity: !areSkillsInView ? 0 : 1,
        scale: !areSkillsInView ? 0.1 : 1,
      },
      {
        duration: 0.2,
        delay: !areSkillsInView ? 0 : staggerSkills,
      },
    );
  }, [areSkillsInView]); // eslint-disable-line

  return (
    <div
      id="skills-container"
      ref={skillsRef}
      className="flex flex-wrap items-center justify-center gap-4"
    >
      {Object.entries(techIcons).map(([_, { id, Icon }]) => (
        <motion.div
          id={`skill-wrapper-${id.toLowerCase()}`}
          key={`skill-wrapper-${id.toLowerCase()}`}
          variants={skillWrapper}
          initial="rest"
          whileHover="hover"
          animate="rest"
          transition={transition}
          className="skill-square flex h-16 w-16 items-center justify-center rounded-2xl bg-brandLight-500 p-4 dark:bg-brandDark-500"
        >
          <motion.div
            className="relative flex h-full w-full items-center justify-center"
            id={`skill-icon-${id.toLowerCase()}`}
            variants={skillIcon}
          >
            <Icon className="h-8 w-8 fill-light stroke-light" />
            <p className="absolute bottom-[-1.5rem] left-[50%] min-w-[70px] max-w-fit translate-x-[-50%] break-words rounded-md bg-brandLight-400 px-1 py-0.5 text-center text-[10px] font-semibold text-light-base dark:bg-brandDark-400">
              {id}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default Skills;
