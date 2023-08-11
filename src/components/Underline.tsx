import { type FC } from 'react';

type UnderlineProps = {
  className?: string;
};

const Underline: FC<UnderlineProps> = ({ className = '' }) => {
  return <div className={`my-3 h-1 w-full ${className}`} />;
};

export default Underline;
