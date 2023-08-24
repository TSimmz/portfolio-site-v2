import '~/styles/globals.css';
import { type Metadata } from 'next';
import { sourceCodePro } from './fonts';

import NavMenu from '~/components/NavMenu';
import Footer from '~/components/Footer';
import Providers from '~/providers';

export const metadata: Metadata = {
  title: 'Tyler Simoni',
  description:
    'An animated portfolio website for Tyler Simoni to showcase his frontend web development abilities',
  applicationName: 'Tyler Simoni Portfolio v2',
  authors: {
    name: 'Tyler Simoni',
    url: 'https://tylersimoni.com',
  },
  keywords: [
    'tyler simoni',
    'simoni',
    'react',
    'next13',
    'tailwindcss',
    'trpc',
    'prisma',
    'react-use',
    'react-hook-forms',
    'sanity-io',
    'portfolio',
    'framer-motion',
    'threejs',
    'popmotion',
    'react-three-fiber',
  ],
  themeColor: [
    {
      media: '(prefers-color-scheme: dark)',
      color: '#1e293b',
    },
    {
      media: '(prefers-color-scheme: light)',
      color: '#f1f5f9',
    },
  ],
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`relative !mx-0 w-screen overflow-x-hidden bg-light text-light-base antialiased dark:bg-dark dark:text-dark-base ${sourceCodePro.className}`}
      >
        <Providers>
          <NavMenu />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
