'use client';

import Hero from '~/sections/Hero';
import Theo from '~/sections/Theo';
import { api } from '~/utils/api';

function HomePage() {
  return (
    <>
      <Hero />
      <Theo />
    </>
  );
}

export default api.withTRPC(HomePage);
