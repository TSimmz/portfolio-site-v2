import { groq } from 'next-sanity';
import client from '../lib/client';

export async function getBlogs() {
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
