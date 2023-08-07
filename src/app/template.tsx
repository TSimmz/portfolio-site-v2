export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex min-h-screen min-w-0 flex-auto flex-col items-center justify-center px-2 md:px-0">
        {children}
      </main>
    </>
  );
}
