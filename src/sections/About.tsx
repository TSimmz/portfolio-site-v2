import * as TechIcons from '~/components/svgs/tech';

import { type FC } from 'react';
import Underline from '~/components/Underline';
import SectionWrapper from '~/components/containers/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';
import Image from 'next/image';
import { type SVGIconProps } from '~/components/svgs';

import { type GitHubProfileData } from '~/utils/types';
import { Octokit } from '@octokit/core';
import { type OctokitResponse } from '@octokit/types';

const getGithubProfile = async (): Promise<unknown> => {
  const octokit = new Octokit({ auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN });

  return (await octokit.request('GET /users/tsimmz', {
    username: 'tsimmz',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })) as OctokitResponse<GitHubProfileData>;
};

const About = async () => {
  const githubProfileData = await getGithubProfile().then(
    (response: unknown) => {
      const res = response as OctokitResponse<GitHubProfileData>;
      console.log('Response: ', res);
      if (res.status === 200) return res.data;
    },
  );

  const techIconsList = Object.entries(TechIcons);
  const half = Math.ceil(techIconsList.length / 2);
  const leftIcons = techIconsList.slice(0, half);
  const rightIcons = techIconsList.slice(half);

  const renderSkillsContainer = (icons: [string, FC<SVGIconProps>][]) => {
    return (
      <div
        id="skills-container"
        className="flex flex-auto flex-wrap items-center justify-center gap-4"
      >
        {icons.map(([IconKey, Icon]) => (
          <div
            id={`hexagon-${IconKey}`}
            key={`hexagon-${IconKey}`}
            className="flex aspect-square items-center justify-center rounded-2xl bg-accent p-4"
          >
            <Icon
              height={'32px'}
              width={'32px'}
              className="fill-light stroke-light"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <SectionWrapper id="about" className="mb-8 !gap-0">
      <Heading as="h1" className="text-center">
        <GradientTextColor>About</GradientTextColor>
        <Underline className="bg-brand-500 px-4" />
      </Heading>

      <p className="mb-10 text-center text-lg">
        {githubProfileData?.bio ?? '<-- Skills to pay the bills -->'}
      </p>
      {/* <div className="hidden gap-8 px-4 sm:grid sm:grid-cols-3 sm:gap-2"> */}
      <div className="flex gap-8 px-4">
        {renderSkillsContainer(leftIcons)}
        <div className="relative shrink-0 grow basis-[280px] overflow-hidden rounded-2xl">
          <Image
            src={githubProfileData?.avatar_url ?? '/default-profile-pic.jpeg'}
            fill={true}
            className="aspect-square scale-[1.05]"
            alt="GitHub profile image for Tyler Simoni"
          />
        </div>

        {renderSkillsContainer(rightIcons)}
      </div>
      {/* <div className="grid grid-cols-1 gap-8 px-4 sm:hidden md:gap-6">
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-clip rounded-3xl">
          <Image
            src={githubProfileData?.avatar_url ?? '/default-profile-pic.jpeg'}
            fill={true}
            className="scale-[1.05]"
            alt="GitHub profile image for Tyler Simoni"
          />
        </div>
        {renderSkillsContainer(techIconsList)}
      </div> */}
    </SectionWrapper>
  );
};

export default About;
