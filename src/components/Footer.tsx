import Link from 'next/link';
import * as SocialIcons from '~/components/svgs/socials';

const Footer = () => {
  return (
    <footer
      id="page-footer"
      key="page-footer"
      className="mt-4 flex w-full flex-col justify-center bg-gradient-to-b from-neutrals-800 to-neutral-700 px-4 pb-8 pt-12"
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
            className="fill-neutrals-200 stroke-neutrals-200 group-hover:fill-rose-500 group-hover:stroke-rose-500 "
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
            className="fill-neutrals-200 stroke-neutrals-200 group-hover:fill-rose-500 group-hover:stroke-rose-500 "
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
            className="fill-neutrals-200 stroke-neutrals-200 group-hover:fill-rose-500 group-hover:stroke-rose-500 "
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
            className="fill-neutrals-200 stroke-neutrals-200 group-hover:fill-rose-500 group-hover:stroke-rose-500 "
          />
        </Link>
      </div>
      <p className="text-center text-sm text-neutrals-100">
        Tyler Simoni{' '}
        <span className="text-rose-300">&copy;{new Date().getFullYear()}</span>
      </p>
    </footer>
  );
};

export default Footer;
