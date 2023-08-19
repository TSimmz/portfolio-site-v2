'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useEffect, type FC } from 'react';
import { baseRoutes } from '~/utils/constants';

type NavLinkProps = {
  id: string;
  title: string;
  href: string;
  onPathChange: (newActiveLinkId: string) => void;
};

const NavLink: FC<NavLinkProps> = ({ id, title, href, onPathChange }) => {
  const pathname = usePathname();
  const isActive = useRef<boolean>(pathname === href);

  useEffect(() => {
    isActive.current = pathname === href;
    if (isActive.current) onPathChange(id);
  }, [pathname]);

  return (
    <Link
      id={id}
      href={href}
      className={`${
        href === baseRoutes.home ? 'max-[775px]:hidden' : ''
      } relative ml-0 flex flex-row items-center space-x-0 rounded-md px-3 py-1 text-base text-dark-base transition-all duration-500 hover:backdrop-contrast-125 dark:hover:backdrop-brightness-125 sm:text-sm min-[690px]:px-4 min-[800px]:px-5 ${
        isActive.current
          ? 'font-semibold !text-brandLight-500 dark:!text-brandDark-500'
          : 'hover:text-brandLight-300 dark:hover:text-brandDark-300 '
      }`}
    >
      <div className={`flex align-middle focus:outline-none`}>
        <span className="px-2 capitalize text-inherit sm:py-0">{title}</span>
      </div>
    </Link>
  );
};

export default NavLink;
