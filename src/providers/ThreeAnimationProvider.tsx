'use client';

import {
  createContext,
  useState,
  type ReactNode,
  type FC,
  useCallback,
} from 'react';

type ThreeAnimation = {
  isAnimating: boolean;
  updateAnimationState: (value: boolean) => void;
  toggleAnimationState: () => void;
};

export const ThreeAnimationContext = createContext<ThreeAnimation>({
  isAnimating: true,
  updateAnimationState: () => null,
  toggleAnimationState: () => null,
});

type ThreeAnimationProviderProps = {
  children: ReactNode;
};

const ThreeAnimationProvider: FC<ThreeAnimationProviderProps> = ({
  children,
}) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const updateAnimationState = useCallback(
    (value: boolean) => setIsAnimating(value),
    [],
  );
  const toggleAnimationState = useCallback(
    () => setIsAnimating((previousAnimationActive) => !previousAnimationActive),
    [],
  );

  return (
    <ThreeAnimationContext.Provider
      value={{ isAnimating, updateAnimationState, toggleAnimationState }}
    >
      {children}
    </ThreeAnimationContext.Provider>
  );
};

export default ThreeAnimationProvider;
