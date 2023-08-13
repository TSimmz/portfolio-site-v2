//import Hexagon from '~/components/containers/Hexagon/Hexagon';
'use client';

import * as TechIcons from '~/components/svgs/tech';

import Underline from '~/components/Underline';
import SectionWrapper from '~/components/containers/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';

const About = () => {
  return (
    <SectionWrapper id="about" className="mb-8 !gap-0">
      <Heading as="h1" className="text-center">
        <GradientTextColor>About</GradientTextColor>
        <Underline className="bg-rose-700 px-4" />
      </Heading>

      <p className="mb-10 text-center text-lg">-- Skills to pay the bills --</p>
      {/* <Hexagon className="w-40" /> */}
      <div className="hexagon-container">
        <div className="hexagon-wrapper">
          {Object.entries(TechIcons).map(([IconKey, Icon]) => (
            <div
              id={`hexagon-${IconKey}`}
              key={`hexagon-${IconKey}`}
              className="hexagon"
            >
              <div
                id={'hexagon-icon'}
                className="flex h-full items-center justify-center"
              >
                <Icon />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
