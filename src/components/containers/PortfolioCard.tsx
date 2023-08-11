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
      className="group relative flex min-h-[200px] max-w-sm flex-col gap-4 overflow-hidden rounded-lg text-white backdrop-brightness-110 transition-colors duration-300 ease-in-out hover:backdrop-brightness-125"
      href={href}
      target="_blank"
    >
      <div
        id={`${title}-card-navbar`}
        className="absolute flex h-7 w-full items-center bg-slate-400/25 transition-colors duration-300 ease-in-out group-hover:bg-slate-400/50"
      >
        <div className="relative ml-3 aspect-square w-3 rounded-full bg-rose-500 before:absolute before:left-[18px] before:aspect-square before:w-3 before:rounded-full before:bg-amber-400 before:content-[''] after:absolute after:left-[36px] after:aspect-square after:w-3 after:rounded-full after:bg-emerald-500 after:content-['']"></div>
      </div>
      <div className="mt-7 p-4">
        <h3 className="text-2xl font-bold">{title} →</h3>
        <p className="text-base">{description}</p>
      </div>
    </Link>
  );
};

export default PortfolioCard;
