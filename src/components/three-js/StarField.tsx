'use client';

import { Canvas } from '@react-three/fiber';
import Scene from '~/components/three-js/Scene';

const StarField = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-light dark:bg-dark">
      <Canvas gl={{ antialias: false }}>
        <Scene numStars={500} />
      </Canvas>
    </div>
  );
};

export default StarField;
