//import Hexagon from '~/components/containers/Hexagon/Hexagon';
import Underline from '~/components/Underline';
import SectionWrapper from '~/components/containers/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';

const About = () => {
  return (
    <SectionWrapper id="about">
      <Heading as="h1" className="mb-4 text-center xs:mb-8">
        <GradientTextColor>About</GradientTextColor>
        <Underline className="bg-rose-700 px-4" />
      </Heading>
      {/* <Hexagon className="w-40" /> */}
      <div className="hexagon-container">
        <div className="hexagon-wrapper">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div key={`hexagon-${index}`} className="hexagon">
                <div className="flex h-full items-center justify-center">
                  {index + 1}
                </div>
              </div>
            ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
