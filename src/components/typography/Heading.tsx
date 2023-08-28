import { type HTMLAttributes, type FC } from 'react';

interface HeadingProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const headingClasses = {
  h1: 'text-[2.5rem] leading-10 xs:text-5xl',
  h2: 'text-[2rem] leading-10 xs:text-4xl',
  h3: 'text-[1.625rem] leading-9 xs:text-[2rem] xs:leading-10',
  h4: 'text-2xl xs:text-3xl',
  h5: 'text-xl xs:text-2xl',
  h6: 'text-lg xs:text-xl',
};

const Heading: FC<HeadingProps> = ({ as: Tag = 'h1', ...otherProps }) => {
  const className = `${
    !otherProps.className
      ? headingClasses[Tag]
      : `${otherProps.className} ${headingClasses[Tag]}`
  } transition-all font-bold tracking-tight`;
  return <Tag {...otherProps} className={className} />;
};

export default Heading;
