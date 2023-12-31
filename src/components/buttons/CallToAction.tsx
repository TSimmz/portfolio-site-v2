import { useRef, type FC } from 'react';
import { motion } from 'framer-motion';
import * as Chevrons from '~/components/svgs/chevrons';
import { useHoverDirty } from 'react-use';

type CallToActionProps = {
  href: string;
  buttonText?: string;
  direction?: 'Up' | 'Down' | 'Left' | 'Right';
  fill?: boolean;
  externalLink?: boolean;
};

const CallToAction: FC<CallToActionProps> = ({
  href,
  buttonText,
  direction = 'Down',
  fill = false,
  externalLink = false,
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
      ? { x: [-15, 0, 30] }
      : { x: [30, 0, -15] };

  const directionalOpacity =
    direction === 'Up' || direction == 'Down'
      ? { opacity: [0.7, 1, 0.7] }
      : direction === 'Left'
      ? { opacity: [0.7, 1, 0.1] }
      : { opacity: [0.1, 1, 0.7] };

  const directionalRest =
    direction === 'Up' || direction === 'Down' ? { y: 0 } : { x: 0 };

  const formattedHref = externalLink ? href : `/${href}`;

  return (
    <motion.div
      ref={ctaRef}
      className={`group max-w-[250px] overflow-hidden`}
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
      <a
        href={formattedHref}
        target={externalLink ? '_blank' : '_self'}
        className={`${buttonText ? 'px-3 py-2' : 'p-2'} ${
          fill
            ? ' border-brandLight-500 bg-brandLight-500 group-hover:border-brandLight-400 group-hover:bg-brandLight-400 group-hover:text-dark-base dark:border-brandDark-500 dark:bg-brandDark-500 group-hover:dark:border-brandDark-600 group-hover:dark:bg-brandDark-600'
            : 'group-hover:bg-brandLight-500 group-hover:text-dark-base dark:border-brandDark-500 group-hover:dark:bg-brandDark-500'
        } flex items-center justify-around gap-4 overflow-hidden rounded-lg border-2 border-brandLight-500  text-base font-semibold duration-300 ease-in-out  sm:text-sm`}
      >
        {buttonText ? (
          <span className={fill ? 'text-dark-base' : ''}>{buttonText}</span>
        ) : null}
        <motion.div
          className="text-neutrals-100"
          animate={
            isCtaHovering
              ? {
                  ...directionalPositions,
                  ...directionalOpacity,
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
      </a>
    </motion.div>
  );
};

export default CallToAction;
