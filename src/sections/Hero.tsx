'use client';

import SectionWrapper from '~/components/containers/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';

const Hero = () => {
  return (
    <SectionWrapper
      id="home"
      className="!mt-[84px] min-h-[calc(100vh-84px)] w-full !pt-0"
    >
      <div>
        <Heading as="h1" className="mb-8">
          Hello there.
        </Heading>
        <Heading as="h2" className="font-semibold xs:font-bold">
          My name is <br className="xs:hidden" />
          <GradientTextColor className="whitespace-nowrap">
            Tyler Simoni
          </GradientTextColor>
          .
          <br />I am a frontend web developer.
        </Heading>
      </div>
    </SectionWrapper>
  );
};

export default Hero;
