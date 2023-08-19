'use client';
import { useEffect } from 'react';
import { motion, stagger, useAnimate, useInView } from 'framer-motion';
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

const staggerSkills = stagger(0.12, { startDelay: 0.25, from: 'center' });

const Skills = () => {
  const [skillsRef, animateSkills] = useAnimate();
  const areSkillsInView = useInView(skillsRef, { once: true });

  useEffect(() => {
    const animate = async () => {
      await animateSkills(
        '.skill-square',
        {
          opacity: !areSkillsInView ? 0 : 1,
          scale: !areSkillsInView ? 0.1 : 1,
        },
        {
          duration: 0.2,
          delay: !areSkillsInView ? 0 : staggerSkills,
        },
      ).then(() => {
        let then = 0;
      });
    };
    animate();
  }, [areSkillsInView]);

  return (
    <div
      id="skills-container"
      ref={skillsRef}
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
          className="skill-square flex h-16 w-16 items-center justify-center rounded-2xl bg-brandLight-500 p-4 dark:bg-brandDark-500"
        >
          <motion.div
            className="h-full w-full"
            id={`skill-icon-${IconKey.toLowerCase()}`}
            variants={skillIcon}
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
