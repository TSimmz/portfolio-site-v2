'use client';

import { Canvas } from '@react-three/fiber';
import HeroScene from '~/components/three-js/Scene';

const StarField = () => {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen">
      <Canvas gl={{ antialias: false }}>
        <HeroScene />
      </Canvas>
    </div>
  );
};

export default StarField;
