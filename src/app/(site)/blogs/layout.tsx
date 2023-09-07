import StarField from '~/components/three-js/StarField';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      id="blogs-main"
      className="relative mx-auto flex min-h-screen flex-auto flex-col items-center overflow-x-hidden px-2"
    >
      <StarField />
      {children}
    </main>
  );
}
