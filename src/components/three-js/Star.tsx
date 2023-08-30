'use client';

import { type FC, useRef, useLayoutEffect, useCallback } from 'react';
import { degreesToRadians, mix } from 'popmotion';
import colors from 'tailwindcss/colors';

type StarProps = {
  indexId: number;
  isAnimating: boolean;
  isDarkMode: boolean;
};

const Star: FC<StarProps> = ({ indexId, isAnimating, isDarkMode }) => {
  const ref = useRef<THREE.Mesh>(null);

  // Generates the color based on animating and dark mode
  const getColor = useCallback(() => {
    if (isAnimating)
      return isDarkMode ? colors.slate['600'] : colors.slate['300'];

    return isDarkMode ? colors.rose['500'] : colors.emerald['500'];
  }, [isAnimating, isDarkMode]);
  const color = getColor();

  useLayoutEffect(() => {
    if (isAnimating) {
      const distance = mix(1.2, 10, Math.random() * 2);
      const yAngle = mix(
        degreesToRadians(0),
        degreesToRadians(360),
        Math.random(),
      );
      const xAngle = degreesToRadians(360) * indexId;
      ref.current!.position.setFromSphericalCoords(distance, yAngle, xAngle);
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshBasicMaterial wireframe color={color} />
    </mesh>
  );
};

export default Star;
