'use client';

import { useRef, useEffect, type FC } from 'react';
import { motion } from 'framer-motion';
import { useElementInView } from '~/hooks';

type NavLinkProps = {
  id: string;
  title: string;
  href: string;
  index: number;
  length: number;
  isMobile: boolean;
  onPathChange: (newActiveLinkId: string) => void;
  toggleMobileMenu: (nextValue: boolean) => void;
};

const NavLink: FC<NavLinkProps> = ({
  id,
  title,
  href,
  index,
  length,
  isMobile,
  onPathChange,
  toggleMobileMenu,
}) => {
  const { elementInView } = useElementInView();
  const isActive = useRef<boolean>(elementInView === href);

  useEffect(() => {
    isActive.current = elementInView === href;

    if (isActive.current) onPathChange(id);
  }, [elementInView]); // eslint-disable-line

  const handleLinkClick = () => {
    toggleMobileMenu(false);
  };

  // Calculates delay so the drop in order is from right to left
  const delay = isMobile ? 0.1 : 0.5 + 0.15 * (length - index + 1);

  return (
    <motion.a
      id={id}
      href={href}
      onClick={handleLinkClick}
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
      className={`relative ml-0 flex touch-auto flex-row items-center space-x-0 rounded-md px-2 py-1 align-middle text-base text-dark-base transition-all duration-500 sm:text-sm min-[710px]:px-3 min-[800px]:px-4 lg:px-5 ${
        isActive.current
          ? 'font-semibold !text-brandLight-500 dark:!text-brandDark-500'
          : 'hover:text-brandLight-300 dark:hover:text-brandDark-300 '
      }`}
    >
      <span className="pointer-events-none px-2 capitalize text-inherit sm:py-0">
        {title}
      </span>
    </motion.a>
  );
};

export default NavLink;
