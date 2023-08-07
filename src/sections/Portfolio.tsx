import SectionWrapper from '~/components/containers/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';
import PortfolioCard from '~/components/containers/PortfolioCard';

const Portfolio = () => {
  return (
    <SectionWrapper id="portfolio">
      <Heading as="h1" className="mb-12 text-center">
        <GradientTextColor>Portfolio</GradientTextColor>
      </Heading>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6">
        <PortfolioCard
          title="First Steps"
          description="Just the basics - Everything you need to know to set up your database and authentication."
          href="https://create.t3.gg/en/usage/first-steps"
        />
        <PortfolioCard
          title="Documentation"
          description="Learn more about Create T3 App, the libraries it uses, and how to deploy it."
          href="https://create.t3.gg/en/introduction"
        />
        <PortfolioCard
          title="First Steps"
          description="Just the basics - Everything you need to know to set up your database and authentication."
          href="https://create.t3.gg/en/usage/first-steps"
        />
        <PortfolioCard
          title="Documentation"
          description="Learn more about Create T3 App, the libraries it uses, and how to deploy it."
          href="https://create.t3.gg/en/introduction"
        />
      </div>
    </SectionWrapper>
  );
};

export default Portfolio;
