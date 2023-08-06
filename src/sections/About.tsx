import Hexagon from '~/components/containers/Hexagon/Hexagon';
import SectionWrapper from '~/components/containers/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';

const About = () => {
  return (
    <SectionWrapper id="about">
      <div>
        <Heading as="h2" className="mb-12">
          <GradientTextColor>About</GradientTextColor> Page
        </Heading>
        {/* <Hexagon className="w-40" /> */}
        <div className="hexagon-container">
          <div className="hexagon-wrapper">
            {Array(20)
              .fill(0)
              .map((_, index) => (
                <div
                  key={`hexagon-${index}`}
                  className="hexagon"
                >
                  <div className="flex h-full items-center justify-center">
                    {index + 1}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
