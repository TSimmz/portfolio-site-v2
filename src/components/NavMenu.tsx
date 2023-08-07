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
      const prevActiveLink = document.getElementById(activeLinkId);
      const nextActiveLink = document.getElementById(newActiveLinkId);

      if (nextActiveLink === null || navMenuRef.current === null) return;

      const newScale = `${
        nextActiveLink.offsetWidth / navMenuRef.current.offsetWidth
      }`;
      const newPosition = `${nextActiveLink.offsetLeft}px`;

      if (prevActiveLink === null) {
        navMenuRef.current.style.setProperty('--_width', newScale);
        navMenuRef.current.style.setProperty('--_left', newPosition);
        navMenuRef.current.style.setProperty('--_height', '2px');
        navMenuRef.current.style.setProperty('--_duration', '0ms');
      } else {
        navMenuRef.current.style.setProperty('--_duration', '200ms');
        const direction =
          prevActiveLink.compareDocumentPosition(nextActiveLink) === 4
            ? 'right'
            : 'left';

        let transitionScale: number;
        if (direction === 'right') {
          transitionScale =
            nextActiveLink.offsetWidth +
            nextActiveLink.offsetLeft -
            prevActiveLink.offsetLeft;

          navMenuRef.current.style.setProperty(
            '--_width',
            `${transitionScale / navMenuRef.current.offsetWidth}`,
          );

          setTimeout(() => {
            if (navMenuRef.current !== null) {
              navMenuRef.current.style.setProperty('--_width', newScale);
              navMenuRef.current.style.setProperty('--_left', newPosition);
            }
          }, 220);
        } else {
          transitionScale =
            prevActiveLink.offsetLeft +
            prevActiveLink.offsetWidth -
            nextActiveLink.offsetLeft;

          navMenuRef.current.style.setProperty(
            '--_width',
            `${transitionScale / navMenuRef.current.offsetWidth}`,
          );
          navMenuRef.current.style.setProperty('--_left', newPosition);
          setTimeout(() => {
            if (navMenuRef.current !== null) {
              navMenuRef.current.style.setProperty('--_width', newScale);
            }
          }, 220);
        }
      }

      setActiveLinkId(newActiveLinkId);
    },
    [activeLinkId],
  );

  return (
    <header
      id="page-header"
      key="page-header"
      className="fixed top-0 z-10 mt-8"
    >
      <nav
        id="nav-menu"
        key="nav-menu"
        ref={navMenuRef}
        className="nav-menu fade relative flex scroll-pr-6 flex-row items-start gap-2 px-0 md:overflow-auto lg:sticky"
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
