import SectionWrapper from '~/components/containers/SectionWrapper';
import { type GitHubRepositoryResponse } from '~/utils/types';
import PortfolioBody from './PortfolioBody';

const getGithubRepos = async (): Promise<unknown> => {
  const data: Response = await fetch(
    'https://api.github.com/users/tsimmz/repos',
    {
      method: 'GET',
    },
  );

  const githubRepoData: unknown = await data.json();
  return githubRepoData as GitHubRepositoryResponse[];
};

const Portfolio = async () => {
  const githubRepos: GitHubRepositoryResponse[] =
    (await getGithubRepos()) as GitHubRepositoryResponse[];

  return (
    <SectionWrapper id="portfolio">
      <PortfolioBody githubRepos={githubRepos} />
    </SectionWrapper>
  );
};

export default Portfolio;
