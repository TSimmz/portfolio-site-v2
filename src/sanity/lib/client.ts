import { createClient } from 'next-sanity';
import { clientEnvVars } from '../env';

const { apiVersion, dataset, projectId, useCdn } = clientEnvVars;

const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
});

export default client;
