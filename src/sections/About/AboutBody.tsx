'use client';

import { type FC, useEffect } from 'react';
import Underline from '~/components/Underline';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';
import Image from 'next/image';
import techIcons from '~/components/svgs/tech/index';

import { useAnimate, stagger, useInView, motion } from 'framer-motion';

import { type GitHubProfileData } from '~/utils/types';
import CallToAction from '~/components/buttons/CallToAction';
import { useElementInView } from '~/hooks';
import { baseRoutes } from '~/utils/constants';

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

const staggerAboutHeader = stagger(0.2, { startDelay: 0.2, from: 'last' });
const staggerFlavorText = stagger(0.2, { startDelay: 0.3 });

type AboutBodyProps = {
  githubProfileData?: GitHubProfileData;
};

const AboutBody: FC<AboutBodyProps> = ({ githubProfileData }) => {
  const [headerRef, animateHeader] = useAnimate<HTMLDivElement>();
  const isHeaderInView = useInView(headerRef, { once: true });
  const isSectionInView = useInView(headerRef, {
    margin: '-30px 0px',
  });

  const [imageRef, animateImage] = useAnimate();
  const isImageInView = useInView(imageRef, { once: true });

  const { updateElementInView } = useElementInView();

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

  useEffect(() => {
    if (isSectionInView) updateElementInView(baseRoutes.about);
  }, [isSectionInView]); // eslint-disable-line

  useEffect(() => {
    // eslint-disable-next-line
    animateHeader(
      '.section-header',
      { opacity: !isHeaderInView ? 0 : 1 },
      { duration: 0.2, delay: 0.1 },
    );

    // eslint-disable-next-line
    animateHeader(
      '.header-text',
      {
        y: !isHeaderInView ? -50 : 0,
        opacity: !isHeaderInView ? 0 : 1,
        scale: !isHeaderInView ? 0.7 : 1,
      },
      {
        duration: 0.2,
        delay: !isHeaderInView ? 0 : staggerAboutHeader,
      },
    );

    // eslint-disable-next-line
    animateHeader(
      '.flavor-text',
      {
        y: !isHeaderInView ? -50 : 0,
        opacity: !isHeaderInView ? 0 : 1,
        scale: !isHeaderInView ? 0.7 : 1,
      },
      {
        duration: 0.2,
        delay: !isHeaderInView ? 0 : staggerFlavorText,
      },
    );
  }, [isHeaderInView]); // eslint-disable-line

  useEffect(() => {
    // eslint-disable-next-line
    animateImage(
      '.image-wrapper',
      {
        opacity: !isImageInView ? 0 : 1,
        scale: !isImageInView ? 0.1 : 1,
      },
      {
        duration: 0.5,
        delay: !isImageInView ? 0 : 0.4,
      },
    );
  }, [isImageInView]); // eslint-disable-line

  return (
    <div ref={headerRef} className="about-body flex flex-col items-center">
      <Heading
        as="h1"
        className="section-header flex flex-col items-center justify-center text-center"
      >
        <GradientTextColor className="header-text">About</GradientTextColor>
        <Underline className="header-text min-w-[250px] max-w-xl bg-brandLight-500 px-4 dark:bg-brandDark-500" />
      </Heading>

      <p className="flavor-text mb-10 break-words text-center text-base sm:text-lg">
        {githubProfileData?.bio ?? '<-- Skills to pay the bills -->'}
      </p>
      <div className="flavor-text mb-6 mt-[-1.5rem] flex justify-center lg:mb-9">
        <CallToAction buttonText="View my work" href="#portfolio" />
      </div>
      <div
        ref={imageRef}
        className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:gap-6 lg:gap-10"
      >
        <div className="image-wrapper relative mx-auto aspect-square w-full max-w-md origin-center overflow-clip rounded-2xl">
          <Image
            src={githubProfileData?.avatar_url ?? '/default-profile-pic.jpeg'}
            fill={true}
            sizes={'80vw'}
            className="scale-[1.05]"
            alt="GitHub profile image for Tyler Simoni"
          />
        </div>
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
      </div>
    </div>
  );
};

export default AboutBody;
