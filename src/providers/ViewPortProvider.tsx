'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  type FC,
} from 'react';

const themeTypes = {
  light: 'light',
  dark: 'dark',
  system: 'system',
} as const;

export type ThemeType = keyof typeof themeTypes;

type ViewPort = {
  elementInView: string;
  updateElementInView: (id: string) => void;
};

type ViewPortProviderProps = {
  children: ReactNode;
};

const ViewPortContext = createContext<ViewPort>({
  elementInView: '#home',
  updateElementInView: () => null,
});

const ViewPortProvider: FC<ViewPortProviderProps> = ({ children }) => {
  const [elementInView, setElementInView] = useState<string>('#home');

  const updateElementInView = (id: string) => setElementInView(id);

  // useEffect(() => {
  //   console.log('Element: ', elementInView);
  // }, [elementInView]);

  const viewPort = { elementInView, updateElementInView };

  return (
    <ViewPortContext.Provider value={viewPort}>
      {children}
    </ViewPortContext.Provider>
  );
};

export default ViewPortProvider;

export const useElementInView = () => useContext(ViewPortContext);
