'use client';

import GradientTextColor from '~/components/typography/GradientTextColor';

function PortfolioPage() {
  return (
    <section>
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        <GradientTextColor as="span">Portfolio</GradientTextColor> Page
      </h1>
    </section>
  );
}

export default PortfolioPage;
