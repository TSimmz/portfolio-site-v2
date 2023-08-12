import SectionWrapper from '~/components/containers/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Heading from '~/components/typography/Heading';
import PortfolioCard from '~/components/containers/PortfolioCard';
import Underline from '~/components/Underline';
import { pinnedRepoNames } from '~/utils/constants';
import { type GitHubRepositoryResponse } from '~/utils/types';

const getGithubProfile = async (): Promise<unknown> => {
  //if (process.env.GITHUB_ACCESS_TOKEN) {
  const data: Response = await fetch(`https://api.github.com/users/tsimmz`, {
    method: 'GET',
  });
  const githubProfile: unknown = await data.json();

  return githubProfile;
  //}
};

const getGithubRepos = async (): Promise<unknown> => {
  const data: Response = await fetch(
    'https://api.github.com/users/TSimmz/repos',
    {
      method: 'GET',
    },
  );

  const githubRepoData: unknown = await data.json();
  return githubRepoData as GitHubRepositoryResponse[];
};

const Portfolio = async () => {
  //const githubProfile = await getGithubProfile();
  const githubRepos: GitHubRepositoryResponse[] =
    (await getGithubRepos()) as GitHubRepositoryResponse[];

  console.log('Repos: ', githubRepos);

  return (
    <SectionWrapper id="portfolio">
      <Heading as="h1" className="text-center">
        <GradientTextColor>Portfolio</GradientTextColor>

        <Underline className="bg-rose-700 px-4" />
      </Heading>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6">
        {githubRepos
          .filter(
            (repo) =>
              !repo.private && pinnedRepoNames.has(repo.name ? repo.name : ''),
          )
          .map((repo) => (
            <PortfolioCard
              key={repo.name}
              title={repo.name ?? 'Repo Name'}
              description={repo.description ?? 'Repo Description'}
              href={repo.svn_url ?? '/'}
            />
          ))}
        {/* <PortfolioCard
          title="First Steps"
          description="Just the basics - Everything you need to know to set up your database and authentication."
          href="https://create.t3.gg/en/usage/first-steps"
        />
        <PortfolioCard
          title="Documentation"
          description="Learn more about Create T3 App, the libraries it uses, and how to deploy it."
          href="https://create.t3.gg/en/introduction"
        />
        <PortfolioCard
          title="First Steps"
          description="Just the basics - Everything you need to know to set up your database and authentication."
          href="https://create.t3.gg/en/usage/first-steps"
        />
        <PortfolioCard
          title="Documentation"
          description="Learn more about Create T3 App, the libraries it uses, and how to deploy it."
          href="https://create.t3.gg/en/introduction"
        /> */}
      </div>
    </SectionWrapper>
  );
};

export default Portfolio;
