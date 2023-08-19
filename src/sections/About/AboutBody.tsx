'use client';

import { type FC, useEffect } from 'react';
import Underline from '~/components/Underline';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';
import Image from 'next/image';
import Skills from '~/components/containers/Skills';

import { useAnimate, stagger, useInView } from 'framer-motion';

import { type GitHubProfileData } from '~/utils/types';

const staggerAboutHeader = stagger(0.2, { startDelay: 0.4, from: 'last' });

type AboutBodyProps = {
  githubProfileData?: GitHubProfileData;
};

const AboutBody: FC<AboutBodyProps> = ({ githubProfileData }) => {
  const [headerRef, animateHeader] = useAnimate();
  const isHeaderInView = useInView(headerRef, { once: true });

  const [imageRef, animateImage] = useAnimate();
  const isImageInView = useInView(imageRef, { once: true });

  useEffect(() => {
    const animate = async () => {
      await animateHeader(
        '.section-header',
        { opacity: !isHeaderInView ? 0 : 1 },
        { duration: 0.2, delay: 0.1 },
      );

      await animateHeader(
        '.header-text',
        {
          y: !isHeaderInView ? -50 : 0,
          opacity: !isHeaderInView ? 0 : 1,
          scale: !isHeaderInView ? 0.7 : 1,
        },
        {
          duration: 0.2,
          delay: !isHeaderInView ? 0 : staggerAboutHeader,
        },
      );

      await animateHeader(
        '.flavor-text',
        {
          y: !isHeaderInView ? -50 : 0,
          opacity: !isHeaderInView ? 0 : 1,
          scale: !isHeaderInView ? 0.7 : 1,
        },
        {
          duration: 0.2,
        },
      );
    };
    animate();
  }, [isHeaderInView]);

  useEffect(() => {
    const animate = async () => {
      await animateImage(
        '.image-wrapper',
        {
          opacity: !isImageInView ? 0 : 1,
          scale: !isImageInView ? 0.1 : 1,
        },
        {
          duration: 0.5,
          delay: !isImageInView ? 0 : 0.4,
        },
      );
    };
    animate();
  }, [isImageInView]);

  return (
    <div ref={headerRef} className="about-body flex flex-col items-center">
      <Heading
        as="h1"
        className="section-header flex flex-col items-center justify-center text-center"
      >
        <GradientTextColor className="header-text">About</GradientTextColor>
        <Underline className="header-text min-w-[250px] max-w-xl bg-brandLight-500 px-4 dark:bg-brandDark-500" />
      </Heading>

      <p className="flavor-text mb-10 hyphens-auto break-words text-center text-base sm:text-lg">
        {githubProfileData?.bio ?? '<-- Skills to pay the bills -->'}
      </p>
      <div
        ref={imageRef}
        className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:gap-6"
      >
        <div className="image-wrapper relative mx-auto aspect-square w-full max-w-md origin-center overflow-clip rounded-2xl">
          <Image
            src={githubProfileData?.avatar_url ?? '/default-profile-pic.jpeg'}
            fill={true}
            className="scale-[1.05]"
            alt="GitHub profile image for Tyler Simoni"
          />
        </div>
        <Skills />
      </div>
    </div>
  );
};

export default AboutBody;
