import { type ElementType, type HTMLAttributes, type FC } from 'react';

interface GradientTextColorProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: ElementType;
}

const GradientTextColor: FC<GradientTextColorProps> = ({
  as: Tag = 'span',
  ...otherProps
}) => {
  const colorGradientClass =
    'bg-gradient-to-b from-rose-500 to-rose-700 bg-clip-text text-transparent';
  const className = !otherProps.className
    ? colorGradientClass
    : `${otherProps.className} ${colorGradientClass}`;

  return <Tag {...otherProps} className={className} />;
};

export default GradientTextColor;
