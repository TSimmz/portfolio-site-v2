import { type FC } from 'react';
import Link from 'next/link';
import * as SocialIcons from '~/components/svgs/socials';

type SocialLinksProps = {
  wrapperClassName?: string;
  linkColors?: string;
};
const SocialLinks: FC<SocialLinksProps> = ({
  wrapperClassName,
  linkColors,
}) => {
  const defaultLinkColor =
    'fill-dark stroke-dark dark:fill-light dark:stroke-light';

  return (
    <div
      id="socials"
      className={`flex min-w-fit justify-center gap-4 ${wrapperClassName}`}
    >
      <Link
        href={'https://github.com/tsimmz'}
        target="_blank"
        className="group flex h-9 w-9 items-center justify-center rounded-xl p-1 transition-all duration-200 ease-in-out hover:translate-y-[-8px] hover:scale-110 hover:backdrop-brightness-125 sm:h-12 sm:w-12"
      >
        <SocialIcons.IconGitHubAlt
          height={36}
          width={36}
          className={`${
            linkColors ? linkColors : defaultLinkColor
          } group-hover:fill-brandLight-500 group-hover:stroke-brandLight-500  dark:group-hover:fill-brandDark-500 dark:group-hover:stroke-brandDark-500 `}
        />
      </Link>
      <Link
        href={'https://linkedin.com/in/tylersimoni'}
        target="_blank"
        className="group flex h-9 w-9 items-center justify-center rounded-xl p-1  transition-all duration-200 ease-in-out hover:translate-y-[-8px] hover:scale-110 hover:backdrop-brightness-125 sm:h-12 sm:w-12"
      >
        <SocialIcons.IconLinkedIn
          height={36}
          width={36}
          className={`${
            linkColors ? linkColors : defaultLinkColor
          } group-hover:fill-brandLight-500 group-hover:stroke-brandLight-500 dark:group-hover:fill-brandDark-500 dark:group-hover:stroke-brandDark-500 `}
        />
      </Link>
      <Link
        href={'http://instagram.com/t_simmz'}
        target="_blank"
        className="group flex h-9 w-9 items-center justify-center rounded-xl p-1 transition-transform duration-200 ease-in-out hover:translate-y-[-8px] hover:scale-110 hover:backdrop-brightness-125 sm:h-12 sm:w-12"
      >
        <SocialIcons.IconInstagram
          height={36}
          width={36}
          className={`${
            linkColors ? linkColors : defaultLinkColor
          } group-hover:fill-brandLight-500 group-hover:stroke-brandLight-500 dark:group-hover:fill-brandDark-500 dark:group-hover:stroke-brandDark-500 `}
        />
      </Link>
      <Link
        href={'https://twitter.com/tylersimoni'}
        target="_blank"
        className="group flex h-9 w-9 items-center justify-center rounded-xl p-1 transition-transform duration-200  ease-in-out hover:translate-y-[-8px] hover:scale-110 hover:backdrop-brightness-125 sm:h-12 sm:w-12"
      >
        <SocialIcons.IconTwitter
          height={30}
          width={30}
          className={`${
            linkColors ? linkColors : defaultLinkColor
          } group-hover:fill-brandLight-500 group-hover:stroke-brandLight-500 dark:group-hover:fill-brandDark-500 dark:group-hover:stroke-brandDark-500 `}
        />
      </Link>
    </div>
  );
};

export default SocialLinks;
