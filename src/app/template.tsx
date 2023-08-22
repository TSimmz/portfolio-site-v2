import StarField from '~/components/three-js/StarField';

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-4xl flex-auto flex-col items-center justify-center px-2 md:max-w-5xl">
      <StarField />
      {children}
    </main>
  );
}
