'use client';

import { Canvas } from '@react-three/fiber';
import Scene from '~/components/three-js/Scene';

const StarField = () => {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen">
      <Canvas gl={{ antialias: false }}>
        <Scene numStars={1000} />
      </Canvas>
    </div>
  );
};

export default StarField;
