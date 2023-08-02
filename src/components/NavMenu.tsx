'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLink = {
  title: string;
  href: string;
};

type NavMenuProps = {
  navLinks: NavLink[];
};

const NavMenu = ({ navLinks }: NavMenuProps) => {
  const pathname = usePathname();

  return (
    <nav
      id="nav-menu"
      key="nav-menu"
      className="fade relative flex scroll-pr-6 flex-row items-start gap-2 px-0 md:relative md:overflow-auto lg:sticky"
    >
      {navLinks.map((link: NavLink) => {
        const isActive = pathname === link.href;
        return (
          <div
            key={link.title}
            className={`relative flex flex-row space-x-0 rounded px-5 py-1 transition-all duration-500 hover:text-rose-500 hover:backdrop-brightness-125 ${
              isActive &&
              'underline decoration-rose-500 underline-offset-8'
            }`}
          >
            <Link
              href={link.href}
              className={`flex align-middle `}
            >
              <span className="px-2 py-1">
                {link.title}
              </span>
            </Link>
            {/* <div
              className={`absolute inset-0 top-[30px] z-[-1] h-[1px] origin-center bg-neutral-200 transition-all duration-1000 ease-linear dark:bg-rose-500 ${
                !isActive && 'scale-x-0'
              }`}
            /> */}
          </div>
        );
      })}
    </nav>
  );
};

export default NavMenu;
