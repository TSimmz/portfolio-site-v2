import SectionWrapper from '~/components/containers/SectionWrapper';
import { Octokit } from '@octokit/core';
import { type OctokitResponse } from '@octokit/types';
import { type GitHubRepositoryData } from '~/utils/types';
import PortfolioBody from './PortfolioBody';

const getGithubRepos = async (): Promise<unknown> => {
  const octokit = new Octokit({ auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN });

  return (await octokit.request('GET /users/tsimmz/repos', {
    username: 'tsimmz',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })) as OctokitResponse<GitHubRepositoryData[]>;
};

const Portfolio = async () => {
  const githubRepos = await getGithubRepos().then((response: unknown) => {
    const res = response as OctokitResponse<GitHubRepositoryData[]>;
    if (res.status === 200) return res.data;
  });

  return (
    <SectionWrapper id="portfolio">
      <PortfolioBody githubRepos={githubRepos} />
    </SectionWrapper>
  );
};

export default Portfolio;
