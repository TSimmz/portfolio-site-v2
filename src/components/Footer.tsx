'use client';

import SocialLinks from './containers/SocialLinks';
import CallToAction from './buttons/CallToAction';

const Footer = () => {
  return (
    <footer
      id="page-footer"
      key="page-footer"
      className="relative mt-4 flex w-full flex-col justify-center bg-gradient-to-b from-neutrals-100 to-neutrals-300 px-4 pb-8 pt-12 dark:from-neutrals-800 dark:to-neutrals-700"
    >
      <div className="absolute left-[50%] top-[-2.75rem] mt-6 translate-x-[-50%]">
        <CallToAction href={'#home'} direction="Up" fill />
      </div>
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
