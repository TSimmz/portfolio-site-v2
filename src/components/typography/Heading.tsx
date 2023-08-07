import { type HTMLAttributes, type FC } from 'react';

interface HeadingProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const headingClasses = {
  h1: 'text-5xl font-bold tracking-tight sm:text-[5rem]',
  h2: 'text-4xl font-bold tracking-tight sm:text-[4.5rem]',
  h3: 'text-3xl font-bold tracking-tight sm:text-[4rem]',
  h4: 'text-2xl font-bold tracking-tight sm:text-[3.5rem]',
  h5: 'text-xl font-bold tracking-tight sm:text-[3rem]',
  h6: 'text-lg font-bold tracking-tight sm:text-[2.5rem]',
};

const Heading: FC<HeadingProps> = ({ as: Tag = 'h1', ...otherProps }) => {
  const className = !otherProps.className
    ? headingClasses[Tag]
    : `${otherProps.className} ${headingClasses[Tag]}`;
  return <Tag {...otherProps} className={className} />;
};

export default Heading;
