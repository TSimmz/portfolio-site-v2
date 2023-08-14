import { type ElementType, type HTMLAttributes, type FC } from 'react';

interface GradientTextColorProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: ElementType;
}

const GradientTextColor: FC<GradientTextColorProps> = ({
  as: Tag = 'span',
  ...otherProps
}) => {
  const colorGradientClass =
    'bg-gradient-to-b dark:from-rose-500 dark:to-rose-700 from-rose-400 to-rose-600 bg-clip-text text-transparent';
  const className = !otherProps.className
    ? colorGradientClass
    : `${otherProps.className} ${colorGradientClass}`;

  return <Tag {...otherProps} className={className} />;
};

export default GradientTextColor;
