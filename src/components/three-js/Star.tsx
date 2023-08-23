import { useRef, useLayoutEffect } from 'react';
import { degreesToRadians, mix } from 'popmotion';
import colors from 'tailwindcss/colors';
import { useTheme } from '~/providers/ThemeProvider';

const Star = ({ p }: { p: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  const { isDarkMode } = useTheme();

  const color = isDarkMode ? colors.slate['600'] : colors.slate['300'];

  useLayoutEffect(() => {
    const distance = mix(1.2, 10, Math.random() * 2);
    const yAngle = mix(
      degreesToRadians(65),
      degreesToRadians(115),
      Math.random(),
    );
    const xAngle = degreesToRadians(360) * p;
    ref.current!.position.setFromSphericalCoords(distance, yAngle, xAngle);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshBasicMaterial wireframe color={color} />
    </mesh>
  );
};

export default Star;
