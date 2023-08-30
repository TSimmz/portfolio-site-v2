'use client';

import SectionWrapper from '~/components/containers/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';
import CallToAction from '~/components/buttons/CallToAction';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useElementInView, useTheme } from '~/hooks';
import { baseRoutes, hotkeyModifier } from '~/utils/constants';
import { useHotkeys } from 'react-hotkeys-hook';

const helloThereVariant = {
  highGround: {
    opacity: 0,
    y: -250,
  },
  dropFromAbove: {
    opacity: 1,
    y: 0,
  },
};

const nameVariant = {
  highGround: {
    opacity: 0,
  },
  dropFromAbove: {
    opacity: 1,
    transition: {
      opacity: {
        delay: 1.25,
        duration: 0.3,
      },
    },
  },
};

const hiltVariant = {
  highGround: {
    opacity: 0,
  },
  dropFromAbove: {
    opacity: 1,
    transition: {
      opacity: {
        delay: 0.75,
        duration: 0.2,
      },
    },
  },
};

const saberVariant = {
  highGround: {
    pathLength: 0,
    opacity: 0,
  },
  dropFromAbove: {
    opacity: 1,
    pathLength: 1,
    transition: {
      opacity: {
        delay: 1,
      },
      pathLength: {
        delay: 1,
        duration: 0.5,
      },
    },
  },
};

const Hero = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef);
  const { updateElementInView } = useElementInView();

  const [saberExtended, setSaberExtended] = useState<number>(1);
  const lightSaberHotkey = `${hotkeyModifier} + l`;
  useHotkeys(lightSaberHotkey, () =>
    setSaberExtended((prev) => (prev === 1 ? 0 : 1)),
  );

  // Dark mode check
  const { isDarkMode } = useTheme();

  // The path to the resume depending on theme mode
  const resumeUrlPath = isDarkMode
    ? process.env.NEXT_PUBLIC_DARK_RESUME_PATH! ?? '/'
    : process.env.NEXT_PUBLIC_LIGHT_RESUME_PATH! ?? '/';
  const resumeCopyLink = process.env.NEXT_PUBLIC_BASE_URL + resumeUrlPath;

  useEffect(() => {
    if (isHeroInView) updateElementInView(baseRoutes.home);
  }, [isHeroInView]); // eslint-disable-line

  return (
    <SectionWrapper
      id="hero"
      className="relative !mt-[84px] min-h-[calc(100vh-64px)] w-full !pt-0"
    >
      <div ref={heroRef}>
        <motion.div
          className="origin-center"
          variants={helloThereVariant}
          initial="highGround"
          animate="dropFromAbove"
          transition={{
            delay: 0.4,
            type: 'spring',
            damping: 2.2,
            mass: 0.1,
            stiffness: 50,
          }}
        >
          <Heading as="h1" className="">
            Hello there.
          </Heading>
          <motion.svg
            id="light-saber-alt-l-to-extend"
            viewBox="0 0 32 2"
            className=" mb-4 mr-auto mt-2 h-[14px] overflow-visible xs:h-4 sm:h-5"
          >
            <motion.path
              className={
                'scale-x-[1.15] stroke-brandLight-400 dark:stroke-brandDark-500'
              }
              variants={saberVariant}
              strokeWidth={1.5}
              strokeLinecap={'round'}
              animate={{ pathLength: saberExtended }}
              d="M7 1H28"
            />
            <motion.path
              className={'stroke-neutrals-600 dark:stroke-neutrals-500'}
              variants={hiltVariant}
              strokeWidth={1.7}
              strokeLinecap={'square'}
              d="M1 1H8"
            />
          </motion.svg>
        </motion.div>
        <motion.div
          variants={nameVariant}
          initial="highGround"
          animate="dropFromAbove"
        >
          <Heading as="h2" className="font-semibold leading-none xs:font-bold">
            My name is <br className="xs:hidden" />
            <GradientTextColor className="whitespace-nowrap !bg-gradient-to-br !to-brandLight-800 dark:!to-brandDark-200">
              Tyler Simoni
            </GradientTextColor>
            .
            <br />I am a frontend web developer.
          </Heading>
        </motion.div>
        <div className="mt-10 flex flex-col-reverse gap-4 min-[460px]:mt-6 min-[460px]:flex-row min-[460px]:justify-between">
          <CallToAction buttonText="Check me out" href="#about" />
          <CallToAction
            buttonText="View my resume"
            direction="Right"
            href={resumeCopyLink}
            fill
            externalLink
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Hero;
