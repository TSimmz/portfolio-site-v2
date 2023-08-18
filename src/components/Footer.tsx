import Link from 'next/link';
import * as SocialIcons from '~/components/svgs/socials';

const Footer = () => {
  return (
    <footer
      id="page-footer"
      key="page-footer"
      className="mt-4 flex w-full flex-col justify-center bg-gradient-to-b from-neutrals-200 to-neutrals-100 px-4 pb-8 pt-12 dark:from-neutrals-800 dark:to-neutrals-700"
    >
      <div
        id="socials"
        className="mx-auto mb-4 flex min-w-fit justify-center gap-4"
      >
        <Link
          href={'https://github.com/tsimmz'}
          target="_blank"
          className="group flex aspect-square w-12 items-center justify-center rounded-xl p-1 transition-all duration-200 ease-in-out hover:translate-y-[-8px] hover:scale-110 hover:backdrop-brightness-125"
        >
          <SocialIcons.IconGitHubAlt
            height={36}
            width={36}
            className="fill-dark stroke-dark group-hover:fill-brandLight-500 group-hover:stroke-brandLight-500 dark:fill-light dark:stroke-light dark:group-hover:fill-brandDark-500 dark:group-hover:stroke-brandDark-500 "
          />
        </Link>
        <Link
          href={'https://linkedin.com/in/tylersimoni'}
          target="_blank"
          className="group flex aspect-square w-12 items-center justify-center  rounded-xl p-1 transition-all duration-200 ease-in-out hover:translate-y-[-8px] hover:scale-110 hover:backdrop-brightness-125"
        >
          <SocialIcons.IconLinkedIn
            height={36}
            width={36}
            className="fill-dark stroke-dark group-hover:fill-brandLight-500 group-hover:stroke-brandLight-500 dark:fill-light dark:stroke-light dark:group-hover:fill-brandDark-500 dark:group-hover:stroke-brandDark-500 "
          />
        </Link>
        <Link
          href={'http://instagram.com/t_simmz'}
          target="_blank"
          className="group flex aspect-square w-12 items-center justify-center rounded-xl p-1 transition-transform duration-200 ease-in-out hover:translate-y-[-8px] hover:scale-110 hover:backdrop-brightness-125"
        >
          <SocialIcons.IconInstagram
            height={36}
            width={36}
            className="fill-dark stroke-dark group-hover:fill-brandLight-500 group-hover:stroke-brandLight-500 dark:fill-light dark:stroke-light dark:group-hover:fill-brandDark-500 dark:group-hover:stroke-brandDark-500 "
          />
        </Link>
        <Link
          href={'https://twitter.com/tylersimoni'}
          target="_blank"
          className="group flex aspect-square w-12 items-center justify-center rounded-xl p-1  transition-transform duration-200 ease-in-out hover:translate-y-[-8px] hover:scale-110 hover:backdrop-brightness-125"
        >
          <SocialIcons.IconTwitter
            height={30}
            width={30}
            className="fill-dark stroke-dark group-hover:fill-brandLight-500 group-hover:stroke-brandLight-500 dark:fill-light dark:stroke-light dark:group-hover:fill-brandDark-500 dark:group-hover:stroke-brandDark-500 "
          />
        </Link>
      </div>
      <p className="text-center text-sm text-light-base dark:text-dark-base">
        Tyler Simoni{' '}
        <span className="text-brandLight-600 dark:text-brandDark-300">
          &copy;{new Date().getFullYear()}
        </span>
      </p>
    </footer>
  );
};

export default Footer;
