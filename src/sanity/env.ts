import { assertValue } from '~/utils/helpers';

// Client Side
export const clientEnvVars = {
  apiVersion: `2023-07-31`,
  dataset: assertValue(
    process.env.NEXT_PUBLIC_SANITY_DATASET,
    'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
  ),
  projectId: assertValue(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
  ),
  useCdn: false,
};
