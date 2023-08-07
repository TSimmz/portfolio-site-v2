'use client';

import { useElementSize } from '@mantine/hooks';
import NavLink from './NavLink';
import { useRef, useState, useCallback, useEffect } from 'react';

type NavLink = {
  title: string;
  href: string;
};

type NavMenuProps = {
  navLinks: NavLink[];
};

const NavMenu = ({ navLinks }: NavMenuProps) => {
  const { ref, width } = useElementSize();
  const navMenuRef = useRef<HTMLElement | null>(null);

  const [activeLinkId, setActiveLinkId] = useState<string>('');

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

  const handlePathChange = useCallback(
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

  return (
    <header
      id="page-header"
      key="page-header"
      ref={ref}
      className="fixed top-0 z-10 w-full bg-gradient-to-t from-slate-800/50 to-slate-700/60 px-4 pb-3 pt-8 shadow-xl shadow-slate-800 backdrop-blur-md lg:sticky"
    >
      <nav
        id="landscape-nav-menu"
        key="landscape-nav-menu"
        ref={navMenuRef}
        className="nav-menu relative mx-auto hidden max-w-4xl scroll-pr-6 flex-row items-center gap-2 px-3 sm:flex"
      >
        {navLinks.map((link: NavLink) => {
          const elementId = createLinkId(link.title);

          return (
            <NavLink
              key={elementId}
              id={elementId}
              title={link.title}
              href={link.href}
              onPathChange={handlePathChange}
            />
          );
        })}
      </nav>
    </header>
  );
};

export default NavMenu;
