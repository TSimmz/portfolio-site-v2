import SectionWrapper from '~/components/containers/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';

const Portfolio = () => {
  return (
    <SectionWrapper id="portfolios">
      <div>
        <Heading as="h2" className="mb-12 text-center">
          <GradientTextColor>Portfolio</GradientTextColor>
        </Heading>
      </div>
    </SectionWrapper>
  );
};

export default Portfolio;
