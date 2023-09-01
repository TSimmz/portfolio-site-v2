'use client';

import { type FC, useRef, useLayoutEffect } from 'react';
import { degreesToRadians, mix } from 'popmotion';

type StarProps = {
  indexId: number;
  isAnimating: boolean;
  color: string;
};

const Star: FC<StarProps> = ({ indexId, isAnimating, color }) => {
  const starRef = useRef<THREE.Mesh>(null);

  useLayoutEffect(() => {
    if (isAnimating) {
      const distance = mix(1.2, 10, Math.random() * 2);
      const yAngle = mix(
        degreesToRadians(10),
        degreesToRadians(180),
        Math.random(),
      );
      const xAngle = degreesToRadians(360) * indexId;
      starRef.current!.position.setFromSphericalCoords(
        distance,
        yAngle,
        xAngle,
      );
    }
  });

  return (
    <mesh ref={starRef}>
      <boxGeometry args={[0.025, 0.025, 0.025]} />
      <meshBasicMaterial wireframe color={color} />
    </mesh>
  );
};

export default Star;
