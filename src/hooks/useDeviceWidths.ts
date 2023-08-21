import { useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';
import theme from 'tailwindcss/defaultTheme';

export const themeSize = () =>
  parseInt(theme.screens.sm.split('px')[0] ?? '0', 10);

export const directions = {
  toMobile: 'toMobile',
  toDesktop: 'toDesktop',
} as const;

export type Direction = (typeof directions)[keyof typeof directions];

function useDeviceWidths() {
  const { width } = useWindowSize();
  const [isMobileView, setIsMobileView] = useState<boolean>(
    width < themeSize(),
  );
  const [direction, setDirection] = useState<Direction>(
    width < themeSize() ? directions.toMobile : directions.toDesktop,
  );

  useEffect(() => {
    if (isMobileView !== width < themeSize()) {
      setIsMobileView(width < themeSize());
      setDirection(
        width < themeSize() ? directions.toMobile : directions.toDesktop,
      );
    }
  }, [width]);

  return {
    width,
    isMobileView: isMobileView,
    isDesktopView: !isMobileView,
    direction: direction,
  };
}

export default useDeviceWidths;
