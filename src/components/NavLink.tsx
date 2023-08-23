'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useEffect, type FC } from 'react';
import { baseRoutes } from '~/utils/constants';
import { motion } from 'framer-motion';

type NavLinkProps = {
  id: string;
  title: string;
  href: string;
  index: number;
  length: number;
  onPathChange: (newActiveLinkId: string) => void;
};

const NavLink: FC<NavLinkProps> = ({
  id,
  title,
  href,
  index,
  length,
  onPathChange,
}) => {
  const pathname = usePathname();
  const isActive = useRef<boolean>(pathname === href);

  useEffect(() => {
    isActive.current = pathname === href;
    if (isActive.current) onPathChange(id);
  }, [pathname]);

  // Calculates delay so the drop in order is from right to left
  const delay = 0.5 + 0.15 * (length - index + 1);

  return (
    <Link
      id={id}
      href={href}
      as={`${href}`}
      passHref
      className={`${
        href === baseRoutes.home ? 'sm:max-[775px]:hidden' : ''
      } relative ml-0 flex touch-auto flex-row items-center space-x-0 rounded-md px-3 py-1 text-base text-dark-base transition-all duration-500 sm:text-sm min-[690px]:px-4 min-[800px]:px-5 ${
        isActive.current
          ? 'font-semibold !text-brandLight-500 dark:!text-brandDark-500'
          : 'hover:text-brandLight-300 dark:hover:text-brandDark-300 '
      }`}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          scale: {
            duration: 0.2,
          },
          y: {
            delay: delay,
          },
          opacity: { delay: delay },
        }}
        className={`flex align-middle focus:outline-none`}
      >
        <span className="px-2 capitalize text-inherit sm:py-0">{title}</span>
      </motion.div>
    </Link>
  );
};

export default NavLink;
