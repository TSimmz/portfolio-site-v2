import Link from 'next/link';
import { type FC, useRef, useEffect } from 'react';
import { useMouseHovered } from 'react-use';
import PortfolioTopics from './PortfolioTopics';

type PortfolioCardProps = {
  title: string;
  description: string;
  href: string;
  topics: string[];
  imageUrl?: string;
};

const PortfolioCard: FC<PortfolioCardProps> = ({
  title,
  description,
  href,
  topics,
}) => {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const mousePosition = useMouseHovered(cardRef, {
    bound: true,
    whenHovered: true,
  });

  const cardSize = useRef<{ w: number; h: number }>({
    w: mousePosition.elW,
    h: mousePosition.elH,
  });

  const mapValues = (
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
  ) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  // useEffect(() => {
  //   if (cardRef.current !== null) {
  //     if (cardSize.current.w === 0 || cardSize.current.h === 0)
  //       cardSize.current = { w: mousePosition.elW, h: mousePosition.elH };

  //     const height = cardSize.current.h;
  //     const width = cardSize.current.w;
  //     const center = { x: Math.floor(width / 2), y: Math.floor(height / 2) };

  //     const posX = mousePosition.elX;
  //     const posY = mousePosition.elY;

  //     const ratioX = Math.abs(center.x - posX);
  //     const ratioY = Math.abs(center.y - posY);

  //     const modifierX = posX > center.x ? 1 : -1;
  //     const rotateY = mapValues(ratioX, 0, center.x, 0, 15) * modifierX;
  //     const modifierY = posY > center.y ? -1 : 1;
  //     const rotateX = mapValues(ratioY, 0, center.y, 0, 15) * modifierY;

  //     cardRef.current.style.setProperty('--_rotateX', `${rotateX}deg`);
  //     cardRef.current.style.setProperty('--_rotateY', `${rotateY}deg`);
  //   }
  // }, [mousePosition]);

  return (
    <Link
      ref={cardRef}
      className="portfolio-card three-dee group relative flex min-h-[200px] max-w-sm flex-col justify-between gap-4 overflow-hidden rounded-lg bg-neutrals-100/60 text-light-base backdrop-brightness-110 transition-colors duration-300 ease-in-out hover:backdrop-brightness-125 dark:bg-neutrals-700/90 dark:text-dark-base"
      href={href}
      target="_blank"
    >
      <div
        id={`${title}-card-navbar`}
        className="absolute flex h-7 w-full items-center bg-neutral-300 transition-colors duration-300 ease-in-out group-hover:bg-neutrals-400/50 dark:bg-neutrals-400/25"
      >
        <div className="relative ml-3 aspect-square w-3 rounded-full bg-error-500 before:absolute before:left-[18px] before:aspect-square before:w-3 before:rounded-full before:bg-warning-400 before:content-[''] after:absolute after:left-[36px] after:aspect-square after:w-3 after:rounded-full after:bg-success-500 after:content-['']"></div>
      </div>
      <div className="mt-7 p-4">
        <h3 className="text-2xl font-bold">{title} →</h3>
        <p className="text-sm">{description}</p>
      </div>
      <PortfolioTopics repoTitle={title} topics={topics} />
    </Link>
  );
};

export default PortfolioCard;
