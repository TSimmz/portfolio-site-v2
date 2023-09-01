import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTransform, useScroll, useTime } from 'framer-motion';

import { degreesToRadians, progress } from 'popmotion';

import Star from './Star';
import colors from 'tailwindcss/colors';

import { useTheme, useThreeAnimation } from '~/hooks';

function Scene({ numStars = 100 }) {
  const gl = useThree((state) => state.gl);
  const time = useTime();

  // Reference for central planetoid
  const planetRef = useRef<THREE.Mesh>(null);

  // State for color of planet and stars
  const [color, setColor] = useState<string>(colors.slate['500']);

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

  const xRotationDirectionFactor = useRef<number>(1);

  // Distance of the camera - static
  //const distance = useMotionValue(6);

  // Distance of the camera - dynamic based on scroll Y distance
  const distance = useTransform(scrollYProgress, [0, 1], [2.2, 9]);

  // Set color based on theme
  const { isDarkMode } = useTheme();

  // Effect to update color on based on animating and dark mode
  useEffect(() => {
    setColor(
      isAnimating
        ? isDarkMode
          ? colors.slate['600']
          : colors.slate['300']
        : isDarkMode
        ? colors.rose['500']
        : colors.emerald['500'],
    );
  }, [isAnimating, isDarkMode]);

  // Updates camera position based on distance, yAngle, and time
  useFrame(({ camera }) => {
    if (isAnimating) {
      // Update camera position for scroll
      camera.position.setFromSphericalCoords(
        distance.get(),
        yAngle.get(),
        time.get() * 0.000085,
      );
      camera.updateProjectionMatrix();
      camera.lookAt(0, 0, 0);

      // Spin the central planet in place

      planetRef.current!.rotation.x +=
        0.00007 * xRotationDirectionFactor.current;
      if (planetRef.current!.rotation.x >= 0.4276057)
        xRotationDirectionFactor.current = -1;
      if (planetRef.current!.rotation.x <= 0.3857178)
        xRotationDirectionFactor.current = 1;

      planetRef.current!.rotation.y -= 0.000729;
    }
  });

  // Updates pixel ratio
  useLayoutEffect(() => gl.setPixelRatio(0.35));

  const stars = useMemo(() => {
    return new Array(numStars).fill(null).map((_, index) => (
      <Star
        key={`star-${index}`}
        indexId={progress(0, numStars, index)}
        isAnimating={isAnimating} // eslint-disable-line
        color={color}
      />
    ));
  }, [isAnimating, isDarkMode, color]); // eslint-disable-line

  return (
    <>
      <mesh ref={planetRef} rotation-x={0.3857178}>
        {/* <icosahedronGeometry args={[1, 0]} /> */}
        <sphereGeometry />
        <meshBasicMaterial wireframe color={color} />
      </mesh>
      {stars}
    </>
  );
}

export default Scene;
