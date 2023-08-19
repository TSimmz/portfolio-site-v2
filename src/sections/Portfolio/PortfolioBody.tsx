'use client';

import { type FC, useEffect } from 'react';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';
import PortfolioCard from '~/components/containers/PortfolioCard';
import Underline from '~/components/Underline';
import { pinnedRepoNames } from '~/utils/constants';
import { type GitHubRepositoryResponse } from '~/utils/types';
import { useAnimate, stagger, useInView } from 'framer-motion';

const staggerPortfolioHeader = stagger(0.2, { startDelay: 0.4, from: 'last' });
const staggerCards = stagger(0.2, { startDelay: 0.5 });

type PortfolioBodyProps = {
  githubRepos: GitHubRepositoryResponse[];
};

const PortfolioBody: FC<PortfolioBodyProps> = ({ githubRepos }) => {
  const [headerRef, animateHeader] = useAnimate();
  const isHeaderInView = useInView(headerRef, { once: true });

  const [cardsRef, animateCards] = useAnimate();
  const areCardsInView = useInView(cardsRef, { once: true });

  useEffect(() => {
    animateHeader(
      '.section-header',
      { opacity: !isHeaderInView ? 0 : 1 },
      { duration: 0.2, delay: 0.1 },
    );

    animateHeader(
      '.header-text',
      {
        y: !isHeaderInView ? -50 : 0,
        opacity: !isHeaderInView ? 0 : 1,
        scale: !isHeaderInView ? 0.7 : 1,
      },
      {
        duration: 0.2,
        delay: !isHeaderInView ? 0 : staggerPortfolioHeader,
      },
    );

    animateHeader(
      '.flavor-text',
      {
        y: !isHeaderInView ? -50 : 0,
        opacity: !isHeaderInView ? 0 : 1,
        scale: !isHeaderInView ? 0.7 : 1,
      },
      {
        duration: 0.2,
        delay: 0.8,
      },
    );
  }, [isHeaderInView]);

  useEffect(() => {
    animateCards(
      '.portfolio-card',
      {
        opacity: !areCardsInView ? 0 : 1,
        scale: !areCardsInView ? 0.1 : 1,
      },
      {
        duration: 0.2,
        delay: !areCardsInView ? 0 : staggerCards,
      },
    );
  }, [areCardsInView]);

  return (
    <div ref={headerRef} className="portfolio-body">
      <Heading
        as="h1"
        className="section-header flex flex-col items-center justify-center text-center"
      >
        <GradientTextColor className="header-text">Portfolio</GradientTextColor>

        <Underline className="header-text min-w-[250px] max-w-xl bg-brandLight-500 px-4 dark:bg-brandDark-500" />
      </Heading>
      <p className="flavor-text mb-10 text-center text-lg">
        {'Here are some of my projects! 👾'}
      </p>
      <div
        ref={cardsRef}
        className="cards-container grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6"
      >
        {githubRepos
          .filter(
            (repo) =>
              !repo.private && pinnedRepoNames.has(repo.name ? repo.name : ''),
          )
          .map((repo) => (
            <PortfolioCard
              key={repo.name}
              title={repo.name ?? 'Repo Name'}
              description={repo.description ?? 'Repo Description'}
              href={repo.svn_url ?? '/'}
            />
          ))}
      </div>
    </div>
  );
};

export default PortfolioBody;
