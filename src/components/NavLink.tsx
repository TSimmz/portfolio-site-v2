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
      className={`relative flex flex-row space-x-0 rounded px-2 py-[2px] text-lg transition-all duration-500 hover:backdrop-brightness-125 sm:px-5 sm:text-base ${
        isActive.current ? 'text-rose-500' : 'hover:text-rose-400'
      }`}
    >
      <div className={`flex align-middle focus:outline-none`}>
        <span className="px-2 py-1 capitalize">{title}</span>
      </div>
    </Link>
  );
};

export default NavLink;
