import { type HTMLAttributes, type FC } from 'react';

interface HeadingProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const headingClasses = {
  h1: 'text-5xl font-bold tracking-tight sm:text-[3.5rem] md:text-[4rem]',
  h2: 'text-4xl font-bold tracking-tight sm:text-[3rem] md:text-[3.5rem]',
  h3: 'text-3xl font-bold tracking-tight sm:text-[2.5rem] md:text-[3rem]',
  h4: 'text-2xl font-bold tracking-tight sm:text-[2rem] md:text-[2.5rem]',
  h5: 'text-xl font-bold tracking-tight sm:text-[1.5rem] md:text-[2rem]',
  h6: 'text-lg font-bold tracking-tight sm:text-[1rem] md:text-[1.5rem]',
};

const Heading: FC<HeadingProps> = ({ as: Tag = 'h1', ...otherProps }) => {
  const className = !otherProps.className
    ? headingClasses[Tag]
    : `${otherProps.className} ${headingClasses[Tag]} transition-all`;
  return <Tag {...otherProps} className={className} />;
};

export default Heading;
