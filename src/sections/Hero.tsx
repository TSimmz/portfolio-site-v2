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

const nameVariant = {
  highGround: {
    opacity: 0,
  },
  dropFromAbove: {
    opacity: 1,
    transition: {
      opacity: {
        delay: 1.5,
        duration: 0.3,
      },
    },
  },
};

const Hero = () => {
  return (
    <SectionWrapper
      id="home"
      className="!mt-[84px] min-h-[calc(100vh-84px)] w-full !pt-0"
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
          <Heading as="h1" className="mb-8">
            Hello there.
          </Heading>
        </motion.div>
        <motion.div
          variants={nameVariant}
          initial="highGround"
          animate="dropFromAbove"
        >
          <Heading as="h2" className="font-semibold xs:font-bold">
            My name is <br className="xs:hidden" />
            <GradientTextColor className="whitespace-nowrap">
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
