import { type SchemaTypeDefinition } from 'sanity';
import blog from './blog-schema';
import author from './author-schema';

const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, blog],
};

export default schema;
