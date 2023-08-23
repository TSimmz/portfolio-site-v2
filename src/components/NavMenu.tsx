'use client';

import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { useToggle, useWindowSize } from 'react-use';
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
import { useElementInView } from '~/providers/ViewPortProvider';
import { useTheme } from '~/providers/ThemeProvider';

const iconBounceVariant = {
  animate: {
    y: [-1.5, 0.5, -1.5],
    transition: {
      y: {
        duration: 1,
        ease: 'easeInOut',
        times: [0, 0.5, 1],
        repeat: Infinity,
      },
    },
  },
};

const NavMenu = () => {
  const { elementInView } = useElementInView();

  //const prevScrollY = useRef<number>(y);
  const [navbarYPosition, setNavbarYPosition] = useState<number>(0);

  // Toggle for mobile hamburger menu
  const { width } = useWindowSize();
  const [opened, toggle] = useToggle(false);

  // Toggle for nav bar hiding
  const [navBarHidden, toggleNavBar] = useToggle(false);

  // Ref for nav menu
  const navMenuRef = useRef<HTMLElement | null>(null);

  // Active link in the navbar
  const [activeLinkId, setActiveLinkId] = useState<string>('');

  const themeSize = useRef<number>(
    parseInt(theme.screens.sm.split('px')[0] ?? '0', 10),
  );

  const [isMobileView, setIsMobileView] = useState<boolean>(
    width < themeSize.current,
  );

  const { isDarkMode } = useTheme();

  const resumeUrlPath = isDarkMode
    ? process.env.NEXT_PUBLIC_DARK_RESUME_PATH! ?? '/'
    : process.env.NEXT_PUBLIC_LIGHT_RESUME_PATH! ?? '/';

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
    const upDistance = -64;
    setNavbarYPosition(navBarHidden ? upDistance : 0);
  }, [navBarHidden]);

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
          toggleMobileMenu={toggle}
        />
      )),
    [createLinkId, handleDesktopPathChange],
  );

  return (
    <>
      <motion.header
        id="page-header"
        key="page-header"
        animate={{ translateY: navbarYPosition }}
        className={`fixed top-0 z-20 w-full bg-neutrals-600 py-3 pl-4 pr-4 shadow-sm shadow-neutrals-300/90 backdrop-blur-md dark:bg-neutrals-700 dark:shadow-neutrals-800 sm:pr-2`}
      >
        <nav
          id="nav-menu"
          key="nav-menu"
          ref={navMenuRef}
          className={`sm:nav-menu relative flex scroll-pr-6 px-0 sm:justify-between sm:after:bg-brandLight-500 dark:sm:after:bg-brandDark-500 ${
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
      <motion.a
        target="_blank"
        href={resumeUrlPath}
        animate={{ translateY: navbarYPosition }}
        whileHover={{ translateY: navbarYPosition + 4 }}
        className="group fixed left-[1rem] top-[2.3rem] z-10 flex cursor-pointer items-center justify-between gap-1 rounded-md bg-brandLight-500/90 pb-1 pl-2 pr-3 pt-8 text-sm text-dark-base hover:bg-brandLight-400 hover:text-light-base hover:ring-2 hover:ring-brandLight-500 hover:ring-offset-2 dark:bg-brandDark-500/90 dark:text-dark-base hover:dark:bg-brandDark-400 hover:dark:text-light-base hover:dark:ring-brandDark-400"
      >
        <svg
          viewBox="0 0 32 32"
          className="z-10 mt-[2px] h-[18px] w-[18px] scale-125 fill-light group-hover:fill-dark"
        >
          <motion.path
            variants={iconBounceVariant}
            animate="animate"
            d="M15.47 18.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L16.75 16.44V9.75a.75.75 0 00-1.5 0v6.69L12.78 13.97a.75.75 0 00-1.06 1.06l3.75 3.75z"
          />
          <motion.path d="M11.75 21a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z" />
        </svg>
        <span>Resume</span>
      </motion.a>
      <motion.button
        onClick={() => toggleNavBar()}
        animate={{ translateY: navbarYPosition }}
        whileHover={{ translateY: navbarYPosition + 4 }}
        className="pointer-events-auto fixed right-[1rem] top-[2.3rem] z-10 cursor-pointer rounded-md bg-warning-300/80 px-4 pb-1 pt-8 text-sm text-light-base hover:bg-warning-400 hover:ring-2 hover:ring-warning-400 hover:ring-offset-2 sm:right-[0.5rem]"
      >
        <span className="pointer-events-none">
          {navBarHidden ? 'Show' : 'Hide'}
        </span>
      </motion.button>
    </>
  );
};

export default NavMenu;
