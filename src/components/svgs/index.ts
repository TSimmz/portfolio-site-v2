import { type SVGAttributes } from 'react';
import { type Variants } from 'framer-motion';

interface SVGIcon {
  id?: string;
  variants?: Variants | undefined;
}

export type SVGIconProps = SVGAttributes<SVGIcon> & SVGIcon;
