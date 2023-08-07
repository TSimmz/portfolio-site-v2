import {
  type FC,
  type ElementType,
  type HTMLAttributes,
} from 'react';

interface HexagonProps
  extends HTMLAttributes<HTMLOrSVGElement> {
  as?: ElementType;
  className?: string;
}

const Hexagon: FC<HexagonProps> = ({
  as: Tag = 'div',
  className = '',
  ...otherProps
}) => {
  return (
    <Tag
      {...otherProps}
      className={`${className} hexagon flex aspect-square flex-col items-center justify-center overflow-clip bg-rose-500`}
    >
      <div>Hello World</div>
      <div>Test Test</div>
    </Tag>
  );
};

export const HexagonContainer: FC<HexagonProps> = ({
  as: Tag = 'div',
  className = '',
  ...otherProps
}) => {
  return (
    <Tag {...otherProps} className={`${className} `}>
      {otherProps.children}
    </Tag>
  );
};

export default Hexagon;
