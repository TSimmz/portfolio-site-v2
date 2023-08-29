import { useContext } from 'react';
import { ViewPortContext } from '~/providers/ViewPortProvider';

const useElementInView = () => useContext(ViewPortContext);

export default useElementInView;
