import Link from 'next/link';
import { type FC } from 'react';

type PortfolioCardProps = {
  title: string;
  description: string;
  href: string;
  imageUrl?: string;
};

const PortfolioCard: FC<PortfolioCardProps> = ({
  title,
  description,
  href,
  imageUrl = '',
}) => {
  return (
    <Link
      className="portfolio-card group relative flex min-h-[200px] max-w-sm flex-col gap-4 overflow-hidden rounded-lg text-light-base backdrop-brightness-110 transition-colors duration-300 ease-in-out hover:backdrop-brightness-125 dark:text-dark-base"
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
        <p className="text-base">{description}</p>
      </div>
    </Link>
  );
};

export default PortfolioCard;
