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
      className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
      href={href}
      target="_blank"
    >
      <h3 className="text-2xl font-bold">{title} →</h3>
      <div className="text-lg">{description}</div>
    </Link>
  );
};

export default PortfolioCard;
