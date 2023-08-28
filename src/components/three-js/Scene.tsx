import { useLayoutEffect, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useTransform, useScroll, useTime } from 'framer-motion';

import { degreesToRadians, progress } from 'popmotion';
import Star from './Star';
import colors from 'tailwindcss/colors';
import { useTheme } from '~/providers/ThemeProvider';

function Scene({ numStars = 100 }) {
  const gl = useThree((state) => state.gl);
  const time = useTime();

  // Scroll Y Progress down the page
  const { scrollYProgress } = useScroll();

  // Calculates the Y angle mapping from Scroll Y Progress
  const yAngle = useTransform(
    scrollYProgress,
    [0, 1],
    [0.001, degreesToRadians(80)],
  );
  // Distance of the camera - also based on Scroll Y Progress
  const distance = useTransform(scrollYProgress, [0, 1], [6, 6]);

  // Set color based on theme
  const { isDarkMode } = useTheme();
  const color = isDarkMode ? colors.slate['600'] : colors.slate['300'];

  // Updates camera position based on distance, yAngle, and time
  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(
      distance.get(),
      yAngle.get(),
      time.get() * 0.000085,
    );
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  });

  // Updates pixel ratio
  useLayoutEffect(() => gl.setPixelRatio(0.75));

  const stars = useMemo(() => {
    return new Array(numStars)
      .fill(null)
      .map((star, index) => (
        <Star key={`star-${index}`} p={progress(0, numStars, index)} />
      ));
  }, []); // eslint-disable-line

  return (
    <>
      <mesh rotation-x={0.234}>
        {/* <icosahedronGeometry args={[1, 0]} /> */}
        <sphereGeometry />
        <meshBasicMaterial wireframe color={color} />
      </mesh>
      {stars}
    </>
  );
}

export default Scene;
