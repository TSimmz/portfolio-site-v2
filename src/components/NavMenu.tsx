'use client';

import { usePathname } from 'next/navigation';
import { useElementSize } from '@mantine/hooks';
import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Burger, Drawer } from '@mantine/core';
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
  const { ref, width } = useElementSize();
  const [opened, { toggle, close }] = useDisclosure(false);

  const navMenuRef = useRef<HTMLElement | null>(null);

  const [activeLinkId, setActiveLinkId] = useState<string>('');

  const themeSize = useRef<number>(
    parseInt(theme.screens.sm.split('px')[0] ?? '0', 10),
  );
  const isMobileView = useRef<boolean>(window.screen.width < themeSize.current);

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
    isMobileView.current = window.screen.width < themeSize.current;

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
      ref={ref}
      className="fixed top-0 z-10 flex min-h-[84px] w-screen justify-between bg-gradient-to-t from-slate-800/50 to-slate-700/60 px-4 pb-3 pt-8 shadow-xl shadow-slate-800 backdrop-blur-md sm:justify-start"
    >
      <nav
        id="nav-menu"
        key="nav-menu"
        ref={navMenuRef}
        className={`${
          !isMobileView.current ? 'nav-menu' : ''
        } relative mx-auto flex min-h-[40px] max-w-4xl grow scroll-pr-6 items-center justify-end gap-2 sm:justify-start`}
      >
        {isMobileView.current ? (
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
        )}
        <Burger
          title={'Open/Close Navigation'}
          aria-label={'Open/Close Navigation'}
          color={!opened ? colors.slate['200'] : colors.rose['500']}
          className={`${
            !isMobileView.current ? 'hidden' : ''
          } hover:backdrop-brightness-125`}
          opened={opened}
          onClick={toggle}
        />
      </nav>
    </header>
  );
};

export default NavMenu;
