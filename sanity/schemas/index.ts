import { type SchemaTypeDefinition } from 'sanity';
import blog from './blog-schema';

const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog],
};

export default schema;
