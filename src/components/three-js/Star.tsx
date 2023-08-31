'use client';

import { type FC, useRef, useLayoutEffect } from 'react';
import { degreesToRadians, mix } from 'popmotion';

type StarProps = {
  indexId: number;
  isAnimating: boolean;
  color: string;
};

const Star: FC<StarProps> = ({ indexId, isAnimating, color }) => {
  const ref = useRef<THREE.Mesh>(null);

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
