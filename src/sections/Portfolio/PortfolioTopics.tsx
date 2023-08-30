'use client';
import { type FC, useRef, useMemo } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useTime,
  useMotionTemplate,
  type MotionValue,
} from 'framer-motion';
import { wrap } from '@motionone/utils';
import { mapRange } from '~/utils/helpers';
import { useThreeAnimation } from '~/hooks';

// Used for color calculations
const minTimeMs = 8000;
const maxTimeMs = 12000;

type PortfolioTopicsProps = {
  repoTitle: string;
  topics: string[];
};

const PortfolioTopics: FC<PortfolioTopicsProps> = ({ repoTitle, topics }) => {
  // Get animation state
  const { isAnimating } = useThreeAnimation();

  // Starting X position
  const baseX = useMotionValue(0);

  // Base velocity - uses log to normalize speed based on length
  const baseVelocity = Math.log(16 / topics.length);

  // Scroll Y and scroll velocity with smoothing
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  }) as MotionValue<number>;

  // Direction and velocity factors for
  const directionFactor = useRef<number>(1);
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Reference for scroller element
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Calculates the X position offset as a percentage
  const x = useTransform(baseX, (v: number) => {
    // Cast the wrap function
    const wrapFn = wrap as (min: number, max: number, v: number) => number;

    // Calculate the min and max X position offsets
    const threshold = { min: 0, max: 0 };
    if (scrollerRef.current !== null) {
      threshold.min =
        mapRange(
          scrollerRef.current.offsetWidth / 2,
          0,
          scrollerRef.current.offsetWidth,
          0,
          100,
        ) * -1;
      threshold.max =
        mapRange(
          scrollerRef.current.offsetWidth / 4,
          0,
          scrollerRef.current.offsetWidth,
          0,
          100,
        ) * -1;
    }

    return `${wrapFn(threshold.min, threshold.max, v)}%`;
  });

  useAnimationFrame((_, delta) => {
    // Initial amount to move by
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Changes the direction of the scroll on switching scroll directions.
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    // Update move by based on direction
    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    // Update the X position by the move amount
    baseX.set(baseX.get() + moveBy);
  });

  // Creates the looping color animation
  const time = useTime();
  const loopThreshold = useRef<number>(
    Math.floor(Math.random() * (maxTimeMs - minTimeMs + 1) + minTimeMs),
  );
  const rotateHue = useTransform(time, [0, loopThreshold.current], [0, 360], {
    clamp: false,
  });
  const topicBackgroundColor = useMotionTemplate`hsla(${rotateHue}, 100%, 80%, 1)`;

  // Renders the list of topics
  const renderTopics = useMemo(
    () => (
      <span className="block">
        {topics.map((topic: string) => {
          return (
            <motion.span
              layout
              key={`${repoTitle}-${topic}`}
              className="mr-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold text-light-base group-hover:!bg-brandLight-500 group-hover:text-dark-base group-hover:dark:!bg-brandDark-500"
              style={{
                backgroundColor: topicBackgroundColor,
              }}
            >
              {topic}
            </motion.span>
          );
        })}
      </span>
    ),
    [], // eslint-disable-line
  );

  // Check if topics exist
  if (!topics || topics.length === 0) return null;

  return (
    <motion.div
      id="motion-parallax"
      className={`relative m-0 flex w-full flex-nowrap overflow-hidden whitespace-nowrap py-4
        ${"before:absolute before:bottom-0 before:left-0 before:top-0 before:z-10 before:w-10 before:bg-gradient-to-r before:from-neutrals-200 before:via-neutrals-200 before:to-transparent before:content-[''] before:dark:from-neutrals-700"}
        ${"after:absolute after:bottom-0 after:right-0 after:top-0 after:z-10 after:w-10 after:bg-gradient-to-l after:from-neutrals-200 after:via-neutrals-200 after:to-transparent after:content-[''] after:dark:from-neutrals-700"}
      `}
    >
      <motion.div
        id="motion-scroller"
        ref={scrollerRef}
        className="flex min-w-fit flex-nowrap whitespace-nowrap"
        style={{ x: isAnimating ? x : 0 }}
      >
        {renderTopics}
        {renderTopics}
        {renderTopics}
        {renderTopics}
        {/* If not enought topics in the list, add some extra as padding */}
        {topics.length < 3 ? (
          <>
            {renderTopics}
            {renderTopics}
          </>
        ) : null}
      </motion.div>
    </motion.div>
  );
};

export default PortfolioTopics;
