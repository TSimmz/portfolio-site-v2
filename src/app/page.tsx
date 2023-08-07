'use client';

import About from '~/sections/About';
import Hero from '~/sections/Hero';
import Portfolio from '~/sections/Portfolio';
import Theo from '~/sections/Theo';
import { api } from '~/utils/api';

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Portfolio />
      <Theo />
    </>
  );
}

export default api.withTRPC(HomePage);
