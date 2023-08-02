'use-client';

import SectionWrapper from '~/components/SectionWrapper';

const Hero = () => {
  return (
    <SectionWrapper id="home">
      <div>
        <h1 className="mb-2 text-5xl font-bold tracking-tight sm:text-[5rem]">
          <span>Hello there.</span>
        </h1>
        <h2 className="text-4xl font-bold leading-[3.5rem] tracking-tight sm:text-[3rem]">
          My name is <span className="text-rose-500">Tyler Simoni</span>.
          <br />
          I&apos;m a frontend web developer.
        </h2>
      </div>
    </SectionWrapper>
  );
};

export default Hero;
