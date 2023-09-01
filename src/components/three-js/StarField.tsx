'use client';

import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import Scene from '~/components/three-js/Scene';

const StarField = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 5, delay: 1 } }}
      className="fixed inset-0 -z-10 bg-light dark:bg-dark"
    >
      <Canvas gl={{ antialias: false }}>
        <Scene numStars={500} />
      </Canvas>
    </motion.div>
  );
};

export default StarField;
