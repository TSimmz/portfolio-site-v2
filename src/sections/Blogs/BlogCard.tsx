'use client';
import { type FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BadgeScroller from '~/components/containers/BadgeScroller';
import Image from 'next/image';
import { type Blog } from '~/sanity/types';
import Heading from '~/components/typography/Heading';

type BlogCardProps = {
  href: string;
  data: Blog;
};

const BlogCard: FC<BlogCardProps> = ({ href, data }) => {
  const { image, name, description, tags } = data;
  return (
    <motion.div
      layout
      className="min-w-sm group relative min-h-[250px] max-w-md cursor-pointer overflow-hidden rounded-lg bg-neutrals-200/90 text-light-base shadow-lg shadow-neutrals-500 backdrop-brightness-110 transition duration-300 ease-in-out hover:scale-105 hover:backdrop-brightness-125 dark:bg-neutrals-700/90 dark:text-dark-base dark:shadow-none"
    >
      <Link
        href={href}
        className="flex h-full w-full flex-col justify-between gap-4 overflow-hidden"
      >
        {/* @component - card navbar with feaux buttons */}
        <div
          id={`${name}-blog-card-navbar`}
          className="absolute flex h-7 w-full items-center justify-between bg-neutrals-400 transition-colors duration-300 ease-in-out dark:bg-neutrals-500"
        >
          <div className="relative ml-3 aspect-square w-3 rounded-full bg-error-400 before:absolute before:left-[18px] before:aspect-square before:w-3 before:rounded-full before:bg-warning-400 before:content-[''] after:absolute after:left-[36px] after:aspect-square after:w-3 after:rounded-full after:bg-success-400 after:content-['']"></div>
          <p className="mr-3 rounded-md bg-neutrals-500/60 px-2 py-0.5 text-xs text-white transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:bg-brandLight-500 group-hover:font-bold dark:bg-neutrals-600/60 group-hover:dark:bg-brandDark-500 ">
            Read Me!
          </p>
        </div>

        {/* @component - card body */}
        <div className="relative mt-7 flex h-full flex-col justify-end pt-4">
          <div className="shrink-0 overflow-hidden after:absolute after:inset-0 after:bg-neutrals-800/50 after:content-['']">
            <Image
              src={image}
              alt={name}
              fill={true}
              sizes="160px"
              className="object-cover"
            />
          </div>
          <div className="z-10 bg-neutrals-600/70 py-2 text-dark-base dark:bg-neutrals-700/70">
            <Heading as="h5" className="px-4">
              {name}
            </Heading>
            <p className="px-4 text-sm">{description}</p>
          </div>

          {/* @component - badge scrolling */}
          <BadgeScroller title={name} badges={tags} capEnds={false} />
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
