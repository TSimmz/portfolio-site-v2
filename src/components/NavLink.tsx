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
  const linkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    isActive.current = pathname === href;
    if (isActive.current) onPathChange(id);
  }, [pathname]);

  return (
    <div
      ref={linkRef}
      id={id}
      className={`relative flex flex-row space-x-0 rounded px-2 py-1 transition-all duration-500 hover:backdrop-brightness-125 sm:px-5 ${
        isActive.current ? 'text-rose-500' : 'hover:text-rose-400'
      }`}
    >
      <Link href={href} className={`flex align-middle `}>
        <span className="px-2 py-1">{title}</span>
      </Link>
    </div>
  );
};

export default NavLink;
