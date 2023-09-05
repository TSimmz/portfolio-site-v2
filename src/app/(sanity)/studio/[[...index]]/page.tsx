'use client';

// Ensures the Studio route is statically generated
export const dynamic = 'force-static';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../../sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
