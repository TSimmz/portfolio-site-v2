'use-client';

import SectionWrapper from '~/components/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';

const Hero = () => {
  return (
    <SectionWrapper id="home">
      <div>
        <h1 className="mb-3 text-5xl font-bold tracking-tight sm:text-[5rem]">
          Hello there.
        </h1>
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
