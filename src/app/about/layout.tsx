import PageWrapper from '~/components/containers/PageWrapper';
import '~/styles/globals.css';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper id="about-page-wrapper">{children}</PageWrapper>;
}
