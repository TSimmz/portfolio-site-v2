import { type ElementType, type HTMLAttributes, type FC } from 'react';
interface PageWrapperProps extends HTMLAttributes<HTMLOrSVGElement> {
  id: string;
  as?: ElementType;
  children: React.ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({
  id,
  as: Tag = 'div',
  children,
  ...otherProps
}) => {
  const className = `${
    otherProps.className ? `${otherProps.className} ` : ''
  }mt-16`;

  return (
    <Tag key={id} id={id} className={className}>
      {children}
    </Tag>
  );
};

export default PageWrapper;
