import Link from 'next/link';
import * as SocialIcons from '~/components/svgs/socials';
import SocialLinks from './containers/SocialLinks';

const Footer = () => {
  return (
    <footer
      id="page-footer"
      key="page-footer"
      className="mt-4 flex w-full flex-col justify-center bg-gradient-to-b from-neutrals-200 to-neutrals-100 px-4 pb-8 pt-12 dark:from-neutrals-800 dark:to-neutrals-700"
    >
      <SocialLinks wrapperClassName="mx-auto mb-4 " />
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
