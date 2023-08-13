import Link from 'next/link';
import * as SocialIcons from '~/components/svgs/socials';

const Footer = () => {
  return (
    <footer
      id="page-footer"
      key="page-footer"
      className="mt-4 flex w-full flex-col justify-center bg-gradient-to-b from-slate-800 to-slate-700 px-4 pb-8 pt-12"
    >
      <div
        id="socials"
        className="mx-auto mb-4 flex min-w-fit justify-center gap-4"
      >
        <Link
          href={'https://github.com/tsimmz'}
          target="_blank"
          className="group flex h-12 !w-12 min-w-fit place-items-center rounded-xl p-2 transition-transform duration-200 ease-in-out hover:translate-y-[-8px] hover:scale-110 hover:backdrop-brightness-125"
        >
          <SocialIcons.IconGitHubAlt />
        </Link>
        <Link
          href={'https://linkedin.com/in/tylersimoni'}
          target="_blank"
          className="group flex aspect-square w-12 place-items-center  rounded-xl p-2 transition-all duration-200 ease-in-out hover:translate-y-[-8px] hover:scale-110 hover:backdrop-brightness-125"
        >
          <SocialIcons.IconLinkedIn />
        </Link>
        <Link
          href={'http://instagram.com/t_simmz'}
          target="_blank"
          className="group flex aspect-square w-12 place-items-center rounded-xl p-2 transition-transform duration-200 ease-in-out hover:translate-y-[-8px] hover:scale-110 hover:backdrop-brightness-125"
        >
          <SocialIcons.IconInstagram />
        </Link>
        <Link
          href={'https://twitter.com/tylersimoni'}
          target="_blank"
          className="group flex aspect-square w-12 place-items-center rounded-xl p-2  transition-transform duration-200 ease-in-out hover:translate-y-[-8px] hover:scale-110 hover:backdrop-brightness-125"
        >
          <SocialIcons.IconTwitter />
        </Link>
      </div>
      <p className="text-center text-sm text-slate-100">
        Tyler Simoni{' '}
        <span className="text-rose-300">&copy;{new Date().getFullYear()}</span>
      </p>
    </footer>
  );
};

export default Footer;
