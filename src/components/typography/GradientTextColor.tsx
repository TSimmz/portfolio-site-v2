import {
  type ElementType,
  type HTMLAttributes,
  type FC,
} from 'react';

interface GradientTextColorProps
  extends HTMLAttributes<HTMLOrSVGElement> {
  as?: ElementType;
}

const GradientTextColor: FC<GradientTextColorProps> = ({
  as: Tag = 'div',
  ...otherProps
}) => {
  const colorGradientClass =
    'bg-gradient-to-b from-rose-500 to-rose-700 bg-clip-text text-transparent';

  return (
    <Tag
      {...otherProps}
      className={`${otherProps.className} ${colorGradientClass}`}
    />
  );
};

export default GradientTextColor;
