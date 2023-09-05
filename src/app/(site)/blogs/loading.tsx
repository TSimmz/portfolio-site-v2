'use client';

import SectionWrapper from '~/components/containers/SectionWrapper';
import LoadingSpinner from '~/components/svgs/LoadingSpinner';

const BlogPageLoading = () => {
  return (
    <SectionWrapper id="blog-page-loading" className="">
      <LoadingSpinner height="h-16" width="w-16" />
    </SectionWrapper>
  );
};

export default BlogPageLoading;
