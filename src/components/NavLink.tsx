'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useEffect, type FC } from 'react';

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
      className={`relative ml-0 flex flex-row items-end space-x-0 rounded-md px-2 py-[2px] pb-2 text-base transition-all duration-500 dark:hover:backdrop-brightness-125 sm:px-5 sm:text-sm ${
        isActive.current
          ? 'text-brand-500 dark:text-brand-600'
          : 'hover:text-brand-400 dark:hover:text-brand-500 '
      }`}
    >
      <div className={`flex align-middle focus:outline-none`}>
        <span className="px-2 py-1 capitalize text-light-base dark:text-dark-base sm:py-0">
          {title}
        </span>
      </div>
    </Link>
  );
};

export default NavLink;
