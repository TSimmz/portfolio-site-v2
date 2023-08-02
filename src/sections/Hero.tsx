'use-client';

import SectionWrapper from '~/components/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';

const Hero = () => {
  return (
    <SectionWrapper id="home">
      <div>
        <Heading as="h1">Hello there.</Heading>
        <h2 className="whitespace-nowrap text-4xl font-bold leading-[4rem] tracking-tight sm:text-[4rem]">
          My name is{' '}
          <GradientTextColor as="span">
            Tyler Simoni
          </GradientTextColor>
          .
          <br />
          I&apos;m a frontend web <br />
          developer.
        </h2>
      </div>
    </SectionWrapper>
  );
};

export default Hero;
