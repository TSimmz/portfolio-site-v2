import { groq } from 'next-sanity';
import client from '../lib/client';
import { type Blog } from '../types';

export async function getBlogs(): Promise<Blog[]> {
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
