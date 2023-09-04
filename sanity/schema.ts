import { type SchemaTypeDefinition } from 'sanity';
import blog from './schemas/blog-schema';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog],
};
