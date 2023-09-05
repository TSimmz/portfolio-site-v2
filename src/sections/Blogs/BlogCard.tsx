'use client';
import { type FC } from 'react';
//import PortfolioTopics from './PortfolioTopics';
import { motion } from 'framer-motion';
import Link from 'next/link';

type BlogCardProps = {
  title: string;
  description: string;
  href: string;
  topics: string[];
  imageUrl?: string;
};

const BlogCard: FC<BlogCardProps> = ({ title, description, href }) => {
  return (
    <motion.div
      layout
      className="group relative flex min-h-[175px] min-w-full cursor-pointer flex-col justify-between gap-4 overflow-hidden rounded-lg bg-neutrals-200/90 text-light-base backdrop-brightness-110 transition duration-300 ease-in-out hover:scale-105 hover:backdrop-brightness-125 dark:bg-neutrals-700/90 dark:text-dark-base"
    >
      <Link href={href} className="h-full w-full">
        <div
          id={`${title}-blog-card-navbar`}
          className="absolute flex h-7 w-full items-center justify-between bg-neutrals-400 transition-colors duration-300 ease-in-out dark:bg-neutrals-500"
        >
          <div className="relative ml-3 aspect-square w-3 rounded-full bg-error-400 before:absolute before:left-[18px] before:aspect-square before:w-3 before:rounded-full before:bg-warning-400 before:content-[''] after:absolute after:left-[36px] after:aspect-square after:w-3 after:rounded-full after:bg-success-400 after:content-['']"></div>
          <p className="mr-3 rounded-md bg-neutrals-500/60 px-2 py-0.5 text-xs text-white transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:bg-neutrals-500 dark:bg-neutrals-600/60 group-hover:dark:bg-neutrals-600">
            Click Me!
          </p>
        </div>
        <div className="mt-7 p-4">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
        {/* <PortfolioTopics repoTitle={title} topics={topics} /> */}
      </Link>
    </motion.div>
  );
};

export default BlogCard;
