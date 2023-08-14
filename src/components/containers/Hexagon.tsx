import { type FC, type ElementType, type HTMLAttributes } from 'react';

interface HexagonProps extends HTMLAttributes<HTMLOrSVGElement> {
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
      className={`${className} hexagon flex aspect-square flex-col items-center justify-center overflow-clip bg-brand-500`}
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

// //import Hexagon from '~/components/containers/Hexagon/Hexagon';
// 'use client';

// import * as TechIcons from '~/components/svgs/tech';

// import Underline from '~/components/Underline';
// import SectionWrapper from '~/components/containers/SectionWrapper';
// import GradientTextColor from '~/components/typography/GradientTextColor';
// import Heading from '~/components/typography/Heading';

// import { useState, useRef } from 'react';
// import { motion } from 'framer-motion';

// const ORIGSPEEDX = 25;
// const ORIGSPEEDY = 25;
// const About = () => {
//   const floatContainerRef = useRef<HTMLDivElement>(null);

//   const [x, setX] = useState<number>(0);
//   const [speedX, setSpeedX] = useState<number>(ORIGSPEEDX);
//   const [y, setY] = useState<number>(0);
//   const [speedY, setSpeedY] = useState<number>(ORIGSPEEDY);

//   return (
//     <SectionWrapper id="about" className="mb-8 !gap-0">
//       <Heading as="h1" className="text-center">
//         <GradientTextColor>About</GradientTextColor>
//         <Underline className="bg-rose-700 px-4" />
//       </Heading>

//       <p className="mb-10 text-center text-lg">-- Skills to pay the bills --</p>
//       {/* <Hexagon className="w-40" /> */}
//       <motion.div
//         className="hexagon-container relative h-[800px] w-screen overflow-hidden"
//         ref={floatContainerRef}
//       >
//         {/* <div className="hexagon-wrapper"> */}
//         {/* {Object.entries(TechIcons).map(([IconKey, Icon]) => (
//             <div
//               id={`hexagon-${IconKey}`}
//               key={`hexagon-${IconKey}`}
//               className="hexagon"
//             >
//               <div
//                 id={'hexagon-icon'}
//                 className="flex h-full items-center justify-center"
//               >
//                 <Icon />
//               </div>
//             </div>
//           ))} */}
//         <motion.div
//           id={`hexagon-IconReact`}
//           key={`hexagon-IconReact`}
//           animate={{ x: x, y: y }}
//           transition={{
//             ease: 'linear',
//           }}
//           onAnimationComplete={() => {
//             setX(x + speedX);
//             setY(y + speedY);

//             const containerBounds =
//               floatContainerRef.current?.getBoundingClientRect();

//             console.table(containerBounds);

//             if (containerBounds) {
//               if (x >= containerBounds.right) {
//                 setSpeedX((speed) => speed * -1);
//               } else if (x <= containerBounds.left) {
//                 setSpeedX((speed) => speed);
//               }
//               if (y >= containerBounds.bottom) {
//                 setSpeedY((speed) => speed * -1);
//               }
//               if (y <= containerBounds.top) {
//                 setSpeedY((speed) => speed);
//               }
//             }
//           }}
//           className="hexagon origin-center"
//         >
//           <div
//             id={'hexagon-icon'}
//             className="flex h-full items-center justify-center"
//           >
//             <TechIcons.IconReact />
//           </div>
//         </motion.div>
//         {/* </div> */}
//       </motion.div>
//     </SectionWrapper>
//   );
// };

// export default About;
