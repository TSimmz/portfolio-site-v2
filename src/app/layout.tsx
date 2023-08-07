import '~/styles/globals.css';
import { type Metadata } from 'next';
import { sourceCodePro } from './fonts';

import NavMenu from '~/components/NavMenu';
import { NAV_LINKS } from '~/utils/constants';
import Footer from '~/components/Footer';

export const metadata: Metadata = {
  title: 'Tyler Simoni - Portfolio v2',
  description: 'A portfolio website for Tyler Simoni',
  applicationName: 'My Portfolio v2',
  authors: {
    name: 'Tyler Simoni',
    url: 'https://tylersimoni.com',
  },
  keywords: ['react', 'next13', 'tailwindcss', 'trpc', 'sanityio', 'portfolio'],
  themeColor: [
    {
      media: '(prefers-color-scheme: dark)',
      color: '#000000',
    },
    {
      media: '(prefers-color-scheme: light)',
      color: '#ffffff',
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
    <html
      lang="en"
      className="bg-white text-gray-800 dark:bg-slate-800 dark:text-slate-200"
    >
      <body
        className={`relative mx-auto flex max-w-4xl flex-col antialiased ${sourceCodePro.className}`}
      >
        <NavMenu navLinks={NAV_LINKS} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
