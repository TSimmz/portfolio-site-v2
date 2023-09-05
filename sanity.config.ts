import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import { clientEnvVars } from '~/sanity/env';
import schema from '~/sanity/schemas';

const { projectId, dataset, apiVersion } = clientEnvVars;

export default defineConfig({
  title: 'Tyler Simoni Portfolio Site v2',
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [deskTool(), visionTool({ defaultApiVersion: apiVersion })],
});
