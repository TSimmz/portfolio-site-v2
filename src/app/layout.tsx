import '~/styles/globals.css';
import { type Metadata } from 'next';
import { sourceCodePro } from './fonts';

export const metadata: Metadata = {
  title: 'Tyler Simoni - Portfolio v2',
  description: 'A portfolio website for Tyler Simoni',
  applicationName: 'My Portfolio v2',
  authors: { name: 'Tyler Simoni', url: 'https://tylersimoni.com' },
  keywords: ['react', 'next13', 'tailwindcss', 'trpc', 'sanityio', 'portfolio'],
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
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
      className="bg-white text-gray-800 dark:bg-gray-800 dark:text-rose-100"
    >
      <body
        className={`mx-4 mb-40 mt-8 flex max-w-2xl flex-col antialiased lg:mx-auto ${sourceCodePro.className}`}
      >
        {children}
      </body>
    </html>
  );
}
