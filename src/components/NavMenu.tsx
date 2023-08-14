'use client';

import { usePathname } from 'next/navigation';
import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { useToggle, useWindowSize } from 'react-use';
import { motion } from 'framer-motion';

import theme from 'tailwindcss/defaultTheme';

import NavLink from './NavLink';
import {
  type BaseRouteKeys,
  baseRouteKeysList,
  baseRoutes,
} from '~/utils/constants';
import Burger from './Burger';
import { AnimatePresence } from 'framer-motion';

const NavMenu = () => {
  const pathname = usePathname();
  const { width } = useWindowSize();
  const [opened, toggle] = useToggle(false);

  const navMenuRef = useRef<HTMLElement | null>(null);

  const [activeLinkId, setActiveLinkId] = useState<string>('');

  const themeSize = useRef<number>(
    parseInt(theme.screens.sm.split('px')[0] ?? '0', 10),
  );
  const [isMobileView, setIsMobileView] = useState<boolean>(
    width < themeSize.current,
  );

  const createLinkId = useCallback(
    (name: string) => `nav-link-${name.toLowerCase()}`,
    [],
  );

  const setNavMenuVariables = useCallback(
    ({
      width = '',
      position = '',
      height = '',
      duration = '',
    }: {
      width?: string;
      position?: string;
      height?: string;
      duration?: string;
    }) => {
      if (navMenuRef.current !== null) {
        if (width) navMenuRef.current.style.setProperty('--_width', width);
        if (position) navMenuRef.current.style.setProperty('--_left', position);
        if (height) navMenuRef.current.style.setProperty('--_height', height);
        if (duration)
          navMenuRef.current.style.setProperty('--_duration', duration);
      }
    },
    [navMenuRef],
  );

  useEffect(() => {
    toggle(false);
  }, [pathname]);

  useEffect(() => {
    // Update mobile view state
    if (isMobileView !== width < themeSize.current) {
      // If moving to desktop view, turn off mobile nav menu
      if (width >= themeSize.current) toggle(false);

      setIsMobileView(width < themeSize.current);
    }

    // Update position and width for desktop nav if not in mobile view
    if (!isMobileView) {
      const activeLink = document.getElementById(activeLinkId);
      if (activeLink !== null && navMenuRef.current !== null) {
        const newWidth =
          activeLink.offsetWidth / navMenuRef.current.offsetWidth;
        const newPosition = activeLink.offsetLeft;

        setNavMenuVariables({
          width: `${newWidth}`,
          position: `${newPosition}px`,
        });
      }
    }
  }, [width]);

  // useEffect(() => {
  //   if (opened) document.body.classList.add('nav-menu-open');
  //   else document.body.classList.remove('nav-menu-open');
  // }, [opened]);

  const handleDesktopPathChange = useCallback(
    (newActiveLinkId: string) => {
      // Get the link button elements
      const prevActiveLink = document.getElementById(activeLinkId);
      const nextActiveLink = document.getElementById(newActiveLinkId);

      // Check for null
      if (nextActiveLink === null || navMenuRef.current === null) return;

      // Generate new scale and position values
      const newWidth = `${
        nextActiveLink.offsetWidth / navMenuRef.current.offsetWidth
      }`;
      const newPosition = `${nextActiveLink.offsetLeft}px`;

      // If previous link is null, this is first page load
      if (prevActiveLink === null) {
        setNavMenuVariables({
          width: newWidth,
          position: newPosition,
          height: '2px',
          duration: '0ms',
        });
      }
      // Else calculate transition scale
      else {
        // Set duration
        setNavMenuVariables({ duration: '200ms' });

        // Calculate which direction the next button is relative to previous
        let transitionScale: number;
        const direction =
          prevActiveLink.compareDocumentPosition(nextActiveLink) === 4
            ? 'right'
            : 'left';

        if (direction === 'right') {
          // Transition scale - left side of left button to right side of right button
          transitionScale =
            nextActiveLink.offsetWidth +
            nextActiveLink.offsetLeft -
            prevActiveLink.offsetLeft;

          // Set the transition scale
          setNavMenuVariables({
            width: `${transitionScale / navMenuRef.current.offsetWidth}`,
          });

          // Set timeout to set the final translate and scale on a delay (creates right stretch effect)
          setTimeout(() => {
            if (navMenuRef.current !== null) {
              setNavMenuVariables({
                width: newWidth,
                position: newPosition,
              });
            }
          }, 220);
        } else {
          // Transition scale - right side of right button to left side of left button
          transitionScale =
            prevActiveLink.offsetLeft +
            prevActiveLink.offsetWidth -
            nextActiveLink.offsetLeft;

          // Set translate and scale immediately
          setNavMenuVariables({
            width: `${transitionScale / navMenuRef.current.offsetWidth}`,
            position: newPosition,
          });

          // Set timeout to set the final scale on a delay (creates left stretch effect)
          setTimeout(() => {
            if (navMenuRef.current !== null) {
              setNavMenuVariables({ width: newWidth });
            }
          }, 220);
        }
      }

      // Update the active link ID
      setActiveLinkId(newActiveLinkId);
    },
    [activeLinkId, setNavMenuVariables],
  );

  const renderNavButtons = useMemo(
    () =>
      baseRouteKeysList.map((routeName: BaseRouteKeys) => (
        <NavLink
          key={createLinkId(routeName)}
          id={createLinkId(routeName)}
          title={routeName}
          href={baseRoutes[routeName]}
          onPathChange={handleDesktopPathChange}
        />
      )),
    [createLinkId, handleDesktopPathChange],
  );

  return (
    <header
      id="page-header"
      key="page-header"
      className={`${
        opened
          ? 'from-neutrals-300 dark:from-neutrals-900/50'
          : 'from-neutrals-200 dark:from-neutrals-800/80'
      } fixed top-0 z-10 min-h-[84px] w-full bg-gradient-to-t to-neutrals-100/60 px-4 pb-3 pt-8 shadow-2xl shadow-neutrals-300/90 backdrop-blur-md dark:to-neutrals-700/60 dark:shadow-neutrals-800`}
    >
      <nav
        id="nav-menu"
        key="nav-menu"
        ref={navMenuRef}
        className={`sm:nav-menu relative mx-auto flex min-h-[40px] max-w-4xl scroll-pr-6 gap-2 px-0 pb-3 sm:px-4 sm:pb-0 lg:px-0`}
      >
        {/* Mobile nav buttons */}
        <AnimatePresence>
          {opened ? (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: 'auto',
                opacity: 1,
                transition: {
                  height: {
                    duration: 0.4,
                  },
                  opacity: {
                    duration: 0.25,
                    delay: 0.15,
                  },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    duration: 0.4,
                  },
                  opacity: {
                    duration: 0.25,
                  },
                },
              }}
              className="flex w-[80%] flex-col gap-1"
            >
              {renderNavButtons}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Desktop nav buttons */}
        <div className="hidden w-full space-x-4 sm:flex">
          {renderNavButtons}
        </div>

        {/* Burger button */}
        <Burger
          opened={opened}
          onClick={toggle}
          className="absolute right-0 top-0 sm:hidden"
        />
      </nav>
    </header>
  );
};

export default NavMenu;
