'use-client';

import SectionWrapper from '~/components/containers/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';

const Hero = () => {
  return (
    <SectionWrapper id="home" className="min-h-screen">
      <div>
        <Heading as="h1" className="mb-8">
          Hello there.
        </Heading>
        <Heading
          as="h2"
          className="whitespace-nowrap sm:leading-[3.5rem] md:leading-[4rem]"
        >
          My name is <GradientTextColor>Tyler Simoni</GradientTextColor>
          .
          <br />
          I&apos;m a frontend web <br />
          developer.
        </Heading>
      </div>
    </SectionWrapper>
  );
};

export default Hero;
