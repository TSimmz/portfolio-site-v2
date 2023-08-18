'use client';

import SectionWrapper from '~/components/containers/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';
import { motion } from 'framer-motion';

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

const cursorVariant = {
  highGround: {
    opacity: 0,
    rotate: 0,
  },
  dropFromAbove: {
    opacity: 1,
    rotate: 10,
    transition: {
      opacity: {
        delay: 1.2,
        duration: 0.3,
      },
      rotate: {
        delay: 3,
        duration: 0.2,
      },
    },
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
        delay: 1.5,
        duration: 0.2,
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
        delay: 1.5,
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
        delay: 2.2,
      },
      pathLength: {
        delay: 2.2,
      },
    },
  },
};

const Hero = () => {
  return (
    <SectionWrapper
      id="home"
      className="relative !mt-[84px] min-h-[calc(100vh-84px)] w-full !pt-0"
    >
      <div>
        <motion.div
          className="origin-center"
          variants={helloThereVariant}
          initial="highGround"
          animate="dropFromAbove"
          transition={{
            delay: 1,
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
            viewBox="0 0 32 2"
            className="mb-4 mr-auto mt-2 h-[14px] overflow-visible xs:h-4 sm:h-5"
          >
            <motion.path
              className={'stroke-brandLight-400 dark:stroke-brandDark-400 '}
              variants={saberVariant}
              strokeWidth={1.8}
              strokeLinecap={'round'}
              d="M7 1H28"
            />
            <motion.path
              className={'stroke-neutrals-600 dark:stroke-neutrals-500'}
              variants={hiltVariant}
              strokeWidth={2}
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
      </div>
    </SectionWrapper>
  );
};

export default Hero;
