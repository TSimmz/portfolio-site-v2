import { useRef, type FC } from 'react';
import { motion } from 'framer-motion';
import * as Chevrons from '~/components/svgs/chevrons';
import Link from 'next/link';
import { useHoverDirty } from 'react-use';

type CallToActionProps = {
  buttonText?: string;
  href: string;
  direction?: 'Up' | 'Down' | 'Left' | 'Right';
  fill?: boolean;
};

const CallToAction: FC<CallToActionProps> = ({
  buttonText,
  href,
  direction = 'Down',
  fill,
}) => {
  const ctaRef = useRef(null);
  const isCtaHovering = useHoverDirty(ctaRef);

  const Chevron = Chevrons[direction];
  const directionalPositions =
    direction === 'Up'
      ? { y: [30, 0, -30] }
      : direction === 'Down'
      ? { y: [-30, 0, 30] }
      : direction === 'Right'
      ? { x: [-30, 0, 30] }
      : { x: [30, 0, -30] };

  const directionalRest =
    direction === 'Up' || direction === 'Down' ? { y: 0 } : { x: 0 };

  return (
    <motion.div
      ref={ctaRef}
      className="group max-w-fit overflow-hidden"
      initial={{ opacity: 0, scale: 0.7, y: 60 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{
        scale: 1.1,
        transition: { scale: { duration: 0.15, delay: 0.1 } },
      }}
      whileTap={{
        scale: 0.9,
        transition: { scale: { duration: 0.15, delay: 0.1 } },
      }}
    >
      <Link
        href={href}
        passHref
        as={`${href}`}
        className={`${buttonText ? 'px-3 py-2' : 'p-2'} ${
          fill
            ? ' bg-brandLight-500 group-hover:border-brandLight-400 group-hover:bg-brandLight-400 group-hover:text-dark-base dark:border-brandDark-500 dark:bg-brandDark-500 group-hover:dark:bg-brandDark-600'
            : 'group-hover:bg-brandLight-500 group-hover:text-dark-base dark:border-brandDark-500 group-hover:dark:bg-brandDark-500'
        } mt-6 flex items-center justify-around gap-4 overflow-hidden rounded-lg border-2 border-brandLight-500  text-base font-semibold duration-300 ease-in-out  sm:text-sm`}
      >
        {buttonText ? <span>{buttonText}</span> : null}
        <motion.div
          className="text-neutrals-100"
          animate={
            isCtaHovering
              ? {
                  ...directionalPositions,
                  opacity: [0.7, 1, 0.7],
                  transition: {
                    duration: 1,
                    ease: 'easeInOut',
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                  },
                }
              : { ...directionalRest, opacity: 1 }
          }
        >
          <Chevron
            className={`h-6 w-6 ${
              fill ? 'stroke-light' : 'stroke-dark'
            } group-hover:stroke-white dark:stroke-white`}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CallToAction;
