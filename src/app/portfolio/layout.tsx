import PageWrapper from '~/components/containers/PageWrapper';
import '~/styles/globals.css';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper id="portfolio-page-wrapper">{children}</PageWrapper>;
}
