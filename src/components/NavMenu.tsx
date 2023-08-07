'use client';

import NavLink from './NavLink';
import { useRef, useState, useCallback } from 'react';

type NavLink = {
  title: string;
  href: string;
};

type NavMenuProps = {
  navLinks: NavLink[];
};

const NavMenu = ({ navLinks }: NavMenuProps) => {
  const navMenuRef = useRef<HTMLElement | null>(null);

  const [activeLinkId, setActiveLinkId] = useState<string>('');

  const createLinkId = useCallback(
    (name: string) => `nav-link-${name.toLowerCase()}`,
    [],
  );

  const handlePathChange = useCallback(
    (newActiveLinkId: string) => {
      // Get the link button elements
      const prevActiveLink = document.getElementById(activeLinkId);
      const nextActiveLink = document.getElementById(newActiveLinkId);

      // Check for null
      if (nextActiveLink === null || navMenuRef.current === null) return;

      // Generate new scale and position values
      const newScale = `${
        nextActiveLink.offsetWidth / navMenuRef.current.offsetWidth
      }`;
      const newPosition = `${nextActiveLink.offsetLeft}px`;

      // If previous link is null, this is first page load
      if (prevActiveLink === null) {
        navMenuRef.current.style.setProperty('--_width', newScale);
        navMenuRef.current.style.setProperty('--_left', newPosition);
        navMenuRef.current.style.setProperty('--_height', '2px');
        navMenuRef.current.style.setProperty('--_duration', '0ms');
      }
      // Else calculate transition scale
      else {
        // Set duration
        navMenuRef.current.style.setProperty('--_duration', '200ms');

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
          navMenuRef.current.style.setProperty(
            '--_width',
            `${transitionScale / navMenuRef.current.offsetWidth}`,
          );

          // Set timeout to set the final translate and scale on a delay (creates right stretch effect)
          setTimeout(() => {
            if (navMenuRef.current !== null) {
              navMenuRef.current.style.setProperty('--_width', newScale);
              navMenuRef.current.style.setProperty('--_left', newPosition);
            }
          }, 220);
        } else {
          // Transition scale - right side of right button to left side of left button
          transitionScale =
            prevActiveLink.offsetLeft +
            prevActiveLink.offsetWidth -
            nextActiveLink.offsetLeft;

          // Set translate and scale immediately
          navMenuRef.current.style.setProperty(
            '--_width',
            `${transitionScale / navMenuRef.current.offsetWidth}`,
          );
          navMenuRef.current.style.setProperty('--_left', newPosition);

          // Set timeout to set the final scale on a delay (creates left stretch effect)
          setTimeout(() => {
            if (navMenuRef.current !== null) {
              navMenuRef.current.style.setProperty('--_width', newScale);
            }
          }, 220);
        }
      }

      // Update the active link ID
      setActiveLinkId(newActiveLinkId);
    },
    [activeLinkId],
  );

  return (
    <header
      id="page-header"
      key="page-header"
      className="fixed top-0 z-10 w-full bg-slate-800/50 px-4 pb-3 pt-8 backdrop-blur-md lg:sticky"
    >
      <nav
        id="nav-menu"
        key="nav-menu"
        ref={navMenuRef}
        className="nav-menu relative mx-auto flex max-w-4xl scroll-pr-6 flex-row items-center gap-2 px-3"
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
