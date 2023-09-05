'use client';

import SectionWrapper from '~/components/containers/SectionWrapper';
import LoadingSpinner from '~/components/svgs/LoadingSpinner';

const StudioLoading = () => {
  return (
    <SectionWrapper id="studio-loading" className="">
      <LoadingSpinner height="h-16" width="w-16" />
    </SectionWrapper>
  );
};

export default StudioLoading;
