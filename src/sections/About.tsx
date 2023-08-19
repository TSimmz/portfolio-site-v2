import SectionWrapper from '~/components/containers/SectionWrapper';

import { Octokit } from '@octokit/core';
import { type OctokitResponse } from '@octokit/types';
import { type GitHubProfileData } from '~/utils/types';
import AboutBody from './About/AboutBody';

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
      if (res.status === 200) return res.data;
    },
  );

  return (
    <SectionWrapper id="about" className="mb-8 !gap-0">
      <AboutBody githubProfileData={githubProfileData} />
    </SectionWrapper>
  );
};

export default About;
