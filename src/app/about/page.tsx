'use client';

import GradientTextColor from '~/components/typography/GradientTextColor';

function AboutPage() {
  //const hello = api.example.hello.useQuery({ text: 'from tRPC' });

  return (
    <section>
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        <GradientTextColor as="span">
          About
        </GradientTextColor>{' '}
        Page
      </h1>
    </section>
  );
}

export default AboutPage;
