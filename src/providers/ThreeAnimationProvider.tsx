'use client';

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type FC,
  useCallback,
} from 'react';

type ThreeAnimation = {
  animationActive: boolean;
  updateAnimationState: (value: boolean) => void;
  toggleAnimationState: () => void;
};

const ThreeAnimationContext = createContext<ThreeAnimation>({
  animationActive: true,
  updateAnimationState: () => null,
  toggleAnimationState: () => null,
});

type ThreeAnimationProviderProps = {
  children: ReactNode;
};

const ThreeAnimationProvider: FC<ThreeAnimationProviderProps> = ({
  children,
}) => {
  const [animationActive, setAnimationActive] = useState<boolean>(true);

  const updateAnimationState = useCallback(
    (value: boolean) => setAnimationActive(value),
    [],
  );
  const toggleAnimationState = useCallback(
    () =>
      setAnimationActive((previousAnimationActive) => !previousAnimationActive),
    [],
  );

  return (
    <ThreeAnimationContext.Provider
      value={{ animationActive, updateAnimationState, toggleAnimationState }}
    >
      {children}
    </ThreeAnimationContext.Provider>
  );
};

export default ThreeAnimationProvider;

export const useThreeAnimation = () => useContext(ThreeAnimationContext);
