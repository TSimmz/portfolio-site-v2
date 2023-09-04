import { createClient, groq } from 'next-sanity';
import { apiVersion, dataset, projectId } from './env';

export async function getBlogs() {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
  });

  return client.fetch(
    groq`*[_type == 'blog']{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      url,
      content
    }`,
  );
}
