import * as TechIcons from '~/components/svgs/tech';

import Underline from '~/components/Underline';
import SectionWrapper from '~/components/containers/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';
import Image from 'next/image';

import { type GitHubProfileResponse } from '~/utils/types';

const getGithubProfile = async (): Promise<unknown> => {
  const data: Response = await fetch(`https://api.github.com/users/tsimmz`, {
    method: 'GET',
  });
  const githubProfile: unknown = await data.json();

  return githubProfile as GitHubProfileResponse;
};

const About = async () => {
  const githubProfile: GitHubProfileResponse =
    (await getGithubProfile()) as GitHubProfileResponse;
  console.log('Profile: ', githubProfile);

  const profileImgUrl = githubProfile.avatar_url;
  console.log('Profile Img: ', profileImgUrl);

  return (
    <SectionWrapper id="about" className="mb-8 !gap-0">
      <Heading as="h1" className="text-center">
        <GradientTextColor>About</GradientTextColor>
      </Heading>

      <p className="mb-10 text-center text-lg">{githubProfile.bio}</p>
      <div className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:gap-6">
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-clip rounded-3xl">
          <Image
            src={profileImgUrl}
            fill={true}
            alt="GitHub profile image for Tyler Simoni"
          />
        </div>
        <div
          id="skills-container"
          className="flex flex-wrap justify-center gap-2"
        >
          {Object.entries(TechIcons).map(([IconKey, Icon]) => (
            <div
              id={`hexagon-${IconKey}`}
              key={`hexagon-${IconKey}`}
              className="item-center flex justify-center rounded-2xl bg-rose-500 p-4"
            >
              <Icon height={'32px'} width={'32px'} />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
