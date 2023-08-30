import { useContext } from 'react';
import { ThreeAnimationContext } from '~/providers/ThreeAnimationProvider';

const useThreeAnimation = () => useContext(ThreeAnimationContext);

export default useThreeAnimation;
