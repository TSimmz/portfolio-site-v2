'use client';

import { usePathname } from 'next/navigation';
import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { useToggle, useWindowSize, useWindowScroll } from 'react-use';
import { motion, AnimatePresence } from 'framer-motion';

import theme from 'tailwindcss/defaultTheme';

import NavLink from './NavLink';
import {
  type BaseRouteKeys,
  baseRouteKeysList,
  baseRoutes,
} from '~/utils/constants';
import Burger from './buttons/Burger';
import BrandLogo from './svgs/BrandLogo';
import Link from 'next/link';
import ThemeSwitcher from './buttons/ThemeSwitcher';
import ResumeButton from './buttons/ResumeButton';

const NavMenu = () => {
  const pathname = usePathname();
  const { y } = useWindowScroll();

  const prevScrollY = useRef<number>(y);

  const position = useRef<number>(0);

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
    if (y >= 500) {
      if (prevScrollY.current <= y) {
        if (Math.abs(prevScrollY.current - y) >= 200) {
          position.current = -100;
          prevScrollY.current = y;
        }
      } else {
        if (Math.abs(prevScrollY.current - y) >= 200) {
          position.current = 0;
          prevScrollY.current = y;
        }
      }
    }
  }, [y]);

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
      baseRouteKeysList.map((routeName: BaseRouteKeys, index: number) => (
        <NavLink
          key={createLinkId(routeName)}
          id={createLinkId(routeName)}
          title={routeName}
          href={baseRoutes[routeName]}
          index={index + 1}
          length={baseRouteKeysList.length}
          onPathChange={handleDesktopPathChange}
        />
      )),
    [createLinkId, handleDesktopPathChange],
  );

  return (
    <motion.header
      id="page-header"
      key="page-header"
      animate={{ translateY: position.current }}
      className={`fixed top-0 z-20 w-full bg-neutrals-600 py-3 pl-4 pr-4 shadow-md shadow-neutrals-300/90 backdrop-blur-md dark:bg-neutrals-700 dark:shadow-neutrals-800 sm:pr-2`}
    >
      <nav
        id="nav-menu"
        key="nav-menu"
        ref={navMenuRef}
        className={`sm:nav-menu relative flex scroll-pr-6 px-0 sm:justify-between sm:pl-4 sm:after:bg-brandLight-500 dark:sm:after:bg-brandDark-500 ${
          opened ? 'min-h-[40px]' : 'h-10'
        }`}
      >
        <AnimatePresence>
          {!opened ? (
            <motion.div
              className="flex items-center gap-3 overflow-visible rounded-md "
              initial={{
                x: -100,
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  opacity: {
                    duration: 0.2,
                    delay: 0.2,
                  },
                  x: {
                    duration: 0.2,
                    delay: 0.25,
                    type: 'spring',
                    bounce: 0.35,
                  },
                },
              }}
              exit={{
                opacity: 0,
                x: -100,
              }}
            >
              <Link id="brand-logo" href="/">
                <BrandLogo
                  height={'36px'}
                  className="fill-brandLight-500 transition-transform duration-300 ease-in-out hover:scale-110 dark:fill-brandDark-500"
                />
              </Link>
              <ResumeButton />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Mobile nav buttons */}
        <AnimatePresence>
          {opened ? (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
                translateY: -100,
              }}
              animate={{
                height: 'auto',
                opacity: 1,
                translateY: 0,
                transition: {
                  height: {
                    delay: 0.2,
                    type: 'spring',
                    bounce: 0.5,
                  },
                  opacity: {
                    duration: 0.2,
                    delay: 0.5,
                  },
                  translateY: {
                    duration: 0.2,
                    delay: 0.5,
                  },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                translateY: -100,
                transition: {
                  translateY: {
                    duration: 0,
                  },
                  opacity: {
                    duration: 0,
                  },
                  height: {
                    duration: 0.15,
                    delay: 0.1,
                  },
                },
              }}
              className="mb-1 flex w-[60%] flex-col gap-1"
            >
              {renderNavButtons}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Desktop nav buttons */}
        <div className="hidden gap-2 space-x-1 sm:flex">
          <div className="flex gap-1">{renderNavButtons}</div>
          <ThemeSwitcher id="theme-switcher-desktop" />
        </div>

        {/* Burger button */}
        <div className="absolute right-0 top-0 flex gap-1 sm:hidden">
          <ThemeSwitcher id="theme-switcher-mobile" isMobile={true} />
          <Burger opened={opened} onClick={toggle} />
        </div>
      </nav>
    </motion.header>
  );
};

export default NavMenu;
