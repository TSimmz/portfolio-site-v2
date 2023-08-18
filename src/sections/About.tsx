import Underline from '~/components/Underline';
import SectionWrapper from '~/components/containers/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';
import Image from 'next/image';

import { Octokit } from '@octokit/core';
import { type OctokitResponse } from '@octokit/types';
import { type GitHubProfileData } from '~/utils/types';
import Skills from '~/components/containers/Skills';

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
      //console.log('Response: ', res);
      if (res.status === 200) return res.data;
    },
  );

  return (
    <SectionWrapper id="about" className="mb-8 !gap-0">
      <Heading as="h1" className="text-center">
        <GradientTextColor>About</GradientTextColor>
        <Underline className="bg-brand-500 px-4" />
      </Heading>

      <p className="mb-10 text-center text-lg">
        {githubProfileData?.bio ?? '<-- Skills to pay the bills -->'}
      </p>
      <div className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:gap-6">
        <div className="relative aspect-square w-full max-w-md overflow-clip rounded-2xl">
          <Image
            src={githubProfileData?.avatar_url ?? '/default-profile-pic.jpeg'}
            fill={true}
            className="scale-[1.05]"
            alt="GitHub profile image for Tyler Simoni"
          />
        </div>
        <Skills />
      </div>
    </SectionWrapper>
  );
};

export default About;
