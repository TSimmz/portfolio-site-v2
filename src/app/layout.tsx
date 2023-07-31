import './globals.css';
import { type Metadata } from 'next';

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
