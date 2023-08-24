'use client';

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type FC,
} from 'react';

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

  return (
    <ViewPortContext.Provider value={{ elementInView, updateElementInView }}>
      {children}
    </ViewPortContext.Provider>
  );
};

export default ViewPortProvider;

export const useElementInView = () => useContext(ViewPortContext);
