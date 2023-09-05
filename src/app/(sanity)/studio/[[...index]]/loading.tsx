'use client';

import SectionWrapper from '~/components/containers/SectionWrapper';
import LoadingSpinner from '~/components/svgs/LoadingSpinner';

const StudioRouteLoading = () => {
  return (
    <SectionWrapper id="studio-route-loading" className="">
      <LoadingSpinner height="h-16" width="w-16" />
    </SectionWrapper>
  );
};

export default StudioRouteLoading;