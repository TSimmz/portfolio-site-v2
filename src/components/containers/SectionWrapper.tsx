import { type ElementType, type HTMLAttributes, type FC } from 'react';
interface SectionWrapperProps extends HTMLAttributes<HTMLOrSVGElement> {
  id: string;
  as?: ElementType;
  children: React.ReactNode;
}

const SectionWrapper: FC<SectionWrapperProps> = ({
  id,
  as: Tag = 'section',
  children,
  ...otherProps
}) => {
  const className = `${
    otherProps.className ? `${otherProps.className} ` : ''
  }container flex flex-col items-center justify-center gap-12 px-4 py-16`;

  return (
    <Tag key={id} id={id} className={className}>
      {children}
    </Tag>
  );
};

export default SectionWrapper;
