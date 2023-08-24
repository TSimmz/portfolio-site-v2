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
  }container flex flex-col items-center justify-center grow max-w-4xl gap-4 xs:gap-12 px-4 py-16 lg:py-20 xl:py-[7rem] min-[1920px]:py-16 min-[1920px]:min-h-[calc(100vh-64px)] `;

  return (
    <Tag key={id} id={id} className={className}>
      {children}
    </Tag>
  );
};

export default SectionWrapper;
