'use client';
import { type FC, useEffect, useState, useMemo, useRef } from 'react';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';
import PortfolioCard from '~/sections/Portfolio/PortfolioCard';
import Underline from '~/components/Underline';
import { baseRoutes, pinnedRepoNames } from '~/utils/constants';
import {
  type GitHubRepositoryData,
  type GitHubRepoContentData,
} from '~/utils/types';
import {
  useAnimate,
  stagger,
  useInView,
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from 'framer-motion';
import CallToAction from '~/components/buttons/CallToAction';
import { useElementInView } from '~/hooks';
import { Octokit } from '@octokit/core';
import { type OctokitResponse } from '@octokit/types';
import LoadingSpinner from '~/components/svgs/LoadingSpinner';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { IconGitHubAlt } from '~/components/svgs/socials';
import { useThreeAnimation } from '~/hooks';

const staggerPortfolioHeader = stagger(0.2, { startDelay: 0.2, from: 'last' });
const staggerCards = stagger(0.2, { startDelay: 0.5 });

type PortfolioBodyProps = {
  githubRepos?: GitHubRepositoryData[];
};

const PortfolioBody: FC<PortfolioBodyProps> = ({ githubRepos }) => {
  // The card selected
  const [selectedCard, setSelectedCard] = useState<{
    title: string;
    index: number;
  }>({ title: '', index: -1 });

  // State for ReadMe logic
  const [isRepoLoading, setIsRepoLoading] = useState<boolean>(false);
  const [readmeContent, setReadmeContent] = useState<string>('');

  // Header Ref and inView watchers for animations
  const [headerRef, animateHeader] = useAnimate();
  const isHeaderInView = useInView(headerRef, { once: true });
  const isSectionInView = useInView(headerRef, {
    margin: '-30px 0px',
  });

  // Card Ref and inView for animations
  const [cardsRef, animateCards] = useAnimate();
  const areCardsInView = useInView(cardsRef, { once: true });

  // In View hook
  const { updateElementInView } = useElementInView();

  // Filter the repositories based on 'pinned' set list
  const filteredGithubRepos = githubRepos?.filter(
    (repo) => !repo.private && pinnedRepoNames.has(repo.name ? repo.name : ''),
  );

  const { updateAnimationState } = useThreeAnimation();

  // Handles updating state of current section in
  useEffect(() => {
    if (isSectionInView) updateElementInView(baseRoutes.portfolio);
  }, [isSectionInView]); // eslint-disable-line

  // Handles animations for header info
  useEffect(() => {
    // eslint-disable-next-line
    animateHeader(
      '.section-header',
      { opacity: !isHeaderInView ? 0 : 1 },
      { duration: 0.2, delay: 0.1 },
    );

    // eslint-disable-next-line
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

    // eslint-disable-next-line
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
  }, [isHeaderInView]); // eslint-disable-line

  // Handles animations for card
  useEffect(() => {
    // eslint-disable-next-line
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
  }, [areCardsInView]); // eslint-disable-line

  // Handles logic for fetching card data and stopping body scrolling
  useEffect(() => {
    const fetchRespositoryData = async (title: string) => {
      const octokit = new Octokit({
        auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
      });

      return await octokit.request(`GET /repos/tsimmz/${title}/readme`, {
        owner: 'tsimmz',
        repo: `${title}`,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });
    };

    const bodyElement = document.getElementById('app-body');

    if (selectedCard.title) {
      updateAnimationState(false);

      if (bodyElement != null) {
        bodyElement.style.overflowY = 'hidden';
      }

      setIsRepoLoading(true);

      // eslint-disable-next-line
      fetchRespositoryData(selectedCard.title).then((response: unknown) => {
        const res = response as OctokitResponse<GitHubRepoContentData>;
        if (res.status === 200) {
          const content = atob(res.data.content);

          setReadmeContent(content);
          setIsRepoLoading(false);
        }
      });
    } else {
      updateAnimationState(true);
      if (bodyElement != null) {
        bodyElement.style.overflowY = 'auto';
      }
    }
  }, [selectedCard.title]); // eslint-disable-line

  // Nested Modal component for Card Modal
  // TMS - Interesting technique but actually nice bc now the component
  // ----- has access to all the data it need without passing down props.
  // ----- Should memoize for potential optimization.
  const Modal: FC<{ index: number }> = ({ index }) => {
    // Nested Modal Body component for Card Modal
    const ModalBody = () => {
      // Ref to track scroll Y progress inside modal
      const cardModalRef = useRef<HTMLDivElement>(null);
      const { scrollYProgress } = useScroll({
        container: cardModalRef,
      });

      // Smooths out the progress bar with a spring function
      const scrollProgressLength = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 20,
        restDelta: 0.001,
      });

      // Renders the Card Modal navbar
      const renderCardNavbar = useMemo(
        () => (
          <div className="sticky top-0 z-10 flex w-full flex-col">
            <div
              id={`${selectedCard.title}-selected-card-navbar`}
              className="flex w-full items-center justify-between bg-neutrals-400 px-3 py-3 transition-colors duration-300 ease-in-out dark:bg-neutrals-500"
            >
              <div className="flex items-center justify-start gap-[10px]">
                <motion.button
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedCard({ title: '', index: -1 })}
                  className="group peer flex aspect-square w-[18px] items-center justify-center rounded-full bg-error-500 transition-colors duration-500 ease-in-out hover:bg-error-400 group-hover:scale-110 dark:bg-error-400 dark:hover:bg-error-500"
                >
                  <motion.svg
                    className="peer h-3 w-3 fill-none stroke-error-100"
                    viewBox="0 0 24 24"
                  >
                    <motion.path
                      name={'close-A'}
                      fill="none"
                      strokeWidth="2.2"
                      d="M6 18 L18 6"
                    />
                    <motion.path
                      name={'close-B'}
                      fill="none"
                      strokeWidth="2.2"
                      d="M6 6 L18 18"
                    />
                  </motion.svg>
                </motion.button>
                <div className="aspect-square w-[18px] rounded-full bg-warning-400 transition-colors duration-500 ease-in-out peer-hover:bg-warning-300"></div>
                <div className="aspect-square w-[18px] rounded-full bg-success-400 transition-colors duration-500 ease-in-out peer-hover:bg-success-300"></div>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative rounded-md bg-brandLight-400 px-2 py-0.5 text-light-base dark:bg-brandDark-500 dark:text-dark-base "
              >
                <Link
                  className="group"
                  target="_blank"
                  href={
                    filteredGithubRepos?.[index]?.svn_url ??
                    'https://www.github.com/tsimmz'
                  }
                >
                  <span className="mr-1 text-xs">GitHub</span>
                  <IconGitHubAlt className="inline h-5 w-5 " />
                </Link>
              </motion.div>
            </div>
            <motion.div
              style={{ scaleX: scrollProgressLength }}
              className="z-20 h-3 origin-[0%] bg-brandLight-500 dark:bg-brandDark-500"
            />
          </div>
        ),
        [], // eslint-disable-line
      );

      // Returns the body of Card Modal component
      return (
        <motion.div
          layoutId={`${selectedCard.title}-${selectedCard.index}`}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[calc(100vh-1.5rem)] overflow-hidden rounded-xl bg-neutrals-200 text-light-base shadow-2xl shadow-neutrals-700 after:absolute after:bottom-4 after:left-0 after:right-0 after:h-8 after:bg-gradient-to-b after:from-transparent after:to-neutrals-200 after:content-[''] dark:bg-neutrals-700 dark:text-dark-base dark:shadow-neutrals-900 after:dark:to-neutrals-700"
        >
          {renderCardNavbar}
          <div
            id="portfolio-card-modal"
            ref={cardModalRef}
            onTouchMove={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            className="scrollbar-hidden relative mb-6 h-[75vmax] w-full touch-pan-y overflow-y-auto rounded-lg px-4  sm:h-[80vmin] sm:max-h-[50%]"
          >
            <ReactMarkdown
              className="read-me-content relative flex max-w-[87vmin] flex-col gap-2 px-[3px] py-px"
              remarkPlugins={[remarkGfm]}
              linkTarget={'_blank'}
            >
              {readmeContent}
            </ReactMarkdown>
          </div>
        </motion.div>
      );
    };

    // Returns the Modal component
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          setSelectedCard({ title: '', index: -1 });
        }}
        className="group fixed inset-0 z-30 box-border flex items-center justify-center bg-neutrals-500/50 backdrop-blur-[1px]"
      >
        {isRepoLoading ? (
          <LoadingSpinner height="h-16" width="w-16" />
        ) : (
          <ModalBody />
        )}
      </motion.div>
    );
  };

  // Returns the body of the portfolio section
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
      <div className="mb-8 mt-[-3rem] flex justify-center">
        <CallToAction buttonText="Like what you see?" href={'#contact'} />{' '}
      </div>
      <div
        ref={cardsRef}
        className="cards-container relative grid grid-cols-1 gap-3 rounded-xl sm:grid-cols-2 md:gap-6 lg:gap-8"
      >
        {filteredGithubRepos?.map((repo, index: number) => (
          <PortfolioCard
            key={repo.name}
            title={repo.name ?? 'Repo Name'}
            description={repo.description ?? 'Repo Description'}
            topics={repo.topics ?? []}
            href={repo.svn_url ?? '/'}
            index={index}
            setSelectedCard={(title: string, index: number) =>
              setSelectedCard({ title, index })
            }
          />
        ))}
        <AnimatePresence>
          {selectedCard.title && <Modal index={selectedCard.index} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PortfolioBody;
