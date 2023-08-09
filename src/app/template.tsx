export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="mx-auto flex min-h-screen max-w-4xl flex-auto flex-col items-center justify-center px-2">
        {children}
      </main>
    </>
  );
}
