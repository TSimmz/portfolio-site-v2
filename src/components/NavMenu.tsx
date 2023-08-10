'use client';

import { usePathname } from 'next/navigation';
import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { useToggle, useWindowSize } from 'react-use';
import colors from 'tailwindcss/colors';
import theme from 'tailwindcss/defaultTheme';

import NavLink from './NavLink';
import {
  type BaseRouteKeys,
  baseRouteKeysList,
  baseRoutes,
} from '~/utils/constants';

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
    close();
  }, [pathname]);

  useEffect(() => {
    setIsMobileView((prevMobileView) =>
      prevMobileView !== width < themeSize.current
        ? width < themeSize.current
        : prevMobileView,
    );

    const activeLink = document.getElementById(activeLinkId);
    if (activeLink !== null && navMenuRef.current !== null) {
      const newWidth = activeLink.offsetWidth / navMenuRef.current.offsetWidth;
      const newPosition = activeLink.offsetLeft;

      setNavMenuVariables({
        width: `${newWidth}`,
        position: `${newPosition}px`,
      });
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
      className="fixed top-0 z-10 flex min-h-[84px] w-screen justify-between bg-gradient-to-t from-slate-800/50 to-slate-700/60 px-4 pb-3 pt-8 shadow-xl shadow-slate-800 backdrop-blur-md sm:justify-start"
    >
      <nav
        id="nav-menu"
        key="nav-menu"
        ref={navMenuRef}
        className={`sm:nav-menu relative mx-auto flex min-h-[40px] max-w-4xl grow scroll-pr-6 items-center justify-start gap-2`}
      >
        {/* Mobile nav buttons */}
        {opened ? <div className="sm:hidden">{renderNavButtons}</div> : null}

        {/* Desktop nav buttons */}
        <div className="hidden space-x-4 sm:flex">{renderNavButtons}</div>

        {/* Burger button */}
        <div className="absolute right-0 top-0 flex aspect-square justify-center sm:hidden">
          <button onClick={toggle}>
            <svg
              className="h-8 w-8"
              fill="none"
              stroke={colors.rose['500']}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {opened ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              )}
            </svg>
          </button>
        </div>
      </nav>
      {/* <nav
        id="nav-menu"
        key="nav-menu"
        ref={navMenuRef}
        className={`${
          !isMobileView ? 'nav-menu' : ''
        } relative mx-auto flex min-h-[40px] max-w-4xl grow scroll-pr-6 items-center justify-end gap-2 sm:justify-start`}
      > */}
      {/* {isMobileView ? (
          <Drawer.Root
            opened={opened}
            onClose={close}
            position="top"
            keepMounted={false}
            transitionProps={{ duration: 200, timingFunction: 'ease-in-out' }}
          >
            <Drawer.Overlay
              opacity={0.1}
              blur={2}
              color={colors.slate['200']}
            />
            <Drawer.Content>
              <Drawer.Body className="flex gap-2">
                <div className="grow">{renderNavButtons}</div>
                <Burger
                  title={'Open/Close Navigation'}
                  aria-label={'Open/Close Navigation'}
                  color={!opened ? colors.slate['200'] : colors.rose['500']}
                  className="hover:backdrop-brightness-125"
                  opened={opened}
                  onClick={toggle}
                />
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Root>
        ) : (
          renderNavButtons
        )} */}
      {/* <button className="flex-none px-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 8h16M4 16h16"
            />
          </svg>
          <span className="sr-only">Open Menu</span>
        </button> */}

      {/* <Burger
          title={'Open/Close Navigation'}
          aria-label={'Open/Close Navigation'}
          color={!opened ? colors.slate['200'] : colors.rose['500']}
          className={`${
            !isMobileView ? 'hidden' : ''
          } hover:backdrop-brightness-125`}
          opened={opened}
          onClick={toggle}
        /> */}
      {/* </nav> */}
    </header>
  );
};

export default NavMenu;
