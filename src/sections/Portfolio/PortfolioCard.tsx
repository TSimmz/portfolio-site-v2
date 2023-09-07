'use client';
import { type FC } from 'react';
import { motion } from 'framer-motion';
import TopicScroller from '~/components/containers/TopicScroller';

type PortfolioCardProps = {
  title: string;
  description: string;
  href: string;
  topics: string[];
  imageUrl?: string;
  index: number;
  setSelectedCard: (title: string, index: number) => void;
};

const PortfolioCard: FC<PortfolioCardProps> = ({
  title,
  description,
  topics,
  index,
  setSelectedCard,
}) => {
  return (
    <motion.div
      layoutId={`${title}-${index}`}
      className={`portfolio-card three-dee group relative flex min-h-[200px] max-w-sm cursor-pointer flex-col justify-between gap-4 overflow-hidden rounded-lg bg-neutrals-200/90 text-light-base backdrop-brightness-110 transition-colors duration-300 ease-in-out hover:backdrop-brightness-125 dark:bg-neutrals-700/90 dark:text-dark-base`}
      onClick={() => setSelectedCard(title, index)}
    >
      <div
        id={`${title}-card-navbar`}
        className="absolute flex h-7 w-full items-center justify-between bg-neutrals-400 transition-colors duration-300 ease-in-out dark:bg-neutrals-500"
      >
        <div className="relative ml-3 aspect-square w-3 rounded-full bg-error-400 before:absolute before:left-[18px] before:aspect-square before:w-3 before:rounded-full before:bg-warning-400 before:content-[''] after:absolute after:left-[36px] after:aspect-square after:w-3 after:rounded-full after:bg-success-400 after:content-['']"></div>
        <p className="mr-3 rounded-md bg-neutrals-500/60 px-2 py-0.5 text-xs text-white transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:bg-neutrals-500 dark:bg-neutrals-600/60 group-hover:dark:bg-neutrals-600">
          Click Me!
        </p>
      </div>
      <div className="mt-7 p-4">
        <h3 className="text-2xl font-bold">{title} →</h3>
        <p className="text-sm">{description}</p>
      </div>
      <TopicScroller title={title} topics={topics} />
    </motion.div>
  );
};

export default PortfolioCard;
