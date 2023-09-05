'use client';
/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';
import SectionWrapper from '~/components/containers/SectionWrapper';

const Studio = () => {
  return (
    <SectionWrapper id="sanity-studio" className="z-0">
      <NextStudio config={config} />
    </SectionWrapper>
  );
};

export default Studio;
