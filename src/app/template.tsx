import NavMenu from '~/components/NavMenu';
import { NAV_LINKS } from '~/utils/constants';

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"> */}
      <NavMenu navLinks={NAV_LINKS} />
      <main className="mt-6 flex min-h-screen min-w-0 flex-auto flex-col items-center justify-center px-2 md:px-0">
        {children}
      </main>
    </>
  );
}
