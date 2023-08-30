import { useCallback, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTransform, useScroll, useTime } from 'framer-motion';

import { degreesToRadians, progress } from 'popmotion';

import Star from './Star';
import colors from 'tailwindcss/colors';

import { useTheme, useThreeAnimation } from '~/hooks';

function Scene({ numStars = 100 }) {
  //const gl = useThree((state) => state.gl);
  const time = useTime();

  // Scroll Y Progress down the page
  const { scrollYProgress } = useScroll();

  // Gets animation play state
  const { isAnimating } = useThreeAnimation();

  // Calculates the Y angle mapping from Scroll Y Progress
  const yAngle = useTransform(
    scrollYProgress,
    [0, 1],
    [0.001, degreesToRadians(80)],
  );

  // Distance of the camera - static
  //const distance = useMotionValue(6);

  // Distance of the camera - dynamic based on scroll Y distance
  const distance = useTransform(scrollYProgress, [0, 1], [2, 9]);

  // Set color based on theme
  const { isDarkMode } = useTheme();

  // Generates the color based on animating and dark mode
  const getColor = useCallback(() => {
    if (isAnimating) {
      return isDarkMode ? colors.slate['600'] : colors.slate['300'];
    }

    return isDarkMode ? colors.rose['500'] : colors.emerald['500'];
  }, [isAnimating, isDarkMode]);
  const color = getColor();

  // Updates camera position based on distance, yAngle, and time
  useFrame(({ camera }) => {
    if (isAnimating) {
      camera.position.setFromSphericalCoords(
        distance.get(),
        yAngle.get(),
        time.get() * 0.000085,
      );
      camera.updateProjectionMatrix();
      camera.lookAt(0, 0, 0);
    }
  });

  // Updates pixel ratio
  //useLayoutEffect(() => gl.setPixelRatio(0.75));

  const stars = useMemo(() => {
    return new Array(numStars)
      .fill(null)
      .map((star, index) => (
        <Star
          key={`star-${index}`}
          indexId={progress(0, numStars, index)}
          isAnimating={isAnimating as boolean}
          isDarkMode={isDarkMode}
        />
      ));
  }, [isAnimating]); // eslint-disable-line

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
