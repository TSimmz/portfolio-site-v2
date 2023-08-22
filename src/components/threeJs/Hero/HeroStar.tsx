import './styles.css';
import { Canvas } from '@react-three/fiber';
import { useRef, useLayoutEffect } from 'react';
import { degreesToRadians, mix } from 'popmotion';

const color = '#111111';

const HeroStar = ({ p }: { p: number }) => {
  const ref = useRef<THREE.Object3D>(null);

  useLayoutEffect(() => {
    const distance = mix(2, 3.5, Math.random());
    const yAngle = mix(
      degreesToRadians(80),
      degreesToRadians(100),
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

export default HeroStar;

// export default function App() {
//   return (
//     <div className="container">
//       <Canvas gl={{ antialias: false }}>
//         <Scene />
//       </Canvas>
//     </div>
//   );
// }
