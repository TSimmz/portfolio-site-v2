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

const minTimeMs = 8000;
const maxTimeMs = 12000;

type PortfolioTopicsProps = {
  repoTitle: string;
  topics: string[];
};

const PortfolioTopics: FC<PortfolioTopicsProps> = ({ repoTitle, topics }) => {
  const baseVelocity = Math.log(16 / topics.length);
  const baseX = useMotionValue(0);

  const { scrollY } = useScroll();

  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  }) as MotionValue<number>;

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v: number) => {
    const wrapFn = wrap as (min: number, max: number, v: number) => number;
    const parallax = document.getElementById(
      'motion-parallax',
    ) as HTMLDivElement;
    const scroller = document.getElementById(
      'motion-scroller',
    ) as HTMLDivElement;

    const threshold = { min: 0, max: 0 };
    if (parallax !== null && scroller !== null) {
      threshold.min =
        mapRange(scroller.offsetWidth / 3, 0, scroller.offsetWidth, 0, 100) *
        -1;
      threshold.max =
        mapRange(scroller.offsetWidth / 6, 0, scroller.offsetWidth, 0, 100) *
        -1;
    } else {
      threshold.min = -20;
      threshold.max = -45;
    }

    return `${wrapFn(threshold.min, threshold.max, v)}%`;
  });

  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Changes the direction of the scroll on switching scroll directions.
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  const time = useTime();
  const loopThreshold = useRef<number>(
    Math.floor(Math.random() * (maxTimeMs - minTimeMs + 1) + minTimeMs),
  );
  const rotateHue = useTransform(time, [0, loopThreshold.current], [0, 360], {
    clamp: false,
  });
  const topicBackgroundColor = useMotionTemplate`hsla(${rotateHue}, 100%, 80%, 1)`;

  const renderTopics = useMemo(
    () => (
      <span className="block">
        {topics.map((topic: string) => {
          return (
            <motion.span
              layout
              key={`${repoTitle}-${topic}`}
              className="mr-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold text-light-base"
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
    [],
  );

  if (!topics || topics.length === 0) return null;

  return (
    <motion.div
      id="motion-parallax"
      className="m-0 flex w-full flex-nowrap overflow-hidden whitespace-nowrap py-4"
    >
      <motion.div
        id="motion-scroller"
        className="flex min-w-fit flex-nowrap whitespace-nowrap"
        style={{ x }}
      >
        {renderTopics}
        {renderTopics}
        {renderTopics}
        {renderTopics}
        {renderTopics}
        {renderTopics}
      </motion.div>
    </motion.div>
  );
};

export default PortfolioTopics;
