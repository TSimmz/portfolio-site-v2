import { groq } from 'next-sanity';
import client from '../lib/client';
import { type Blog } from '../types';

export async function getBlogs(): Promise<Blog[]> {
  return client.fetch(
    groq`*[_type == 'blog']{
      _id,
      _createdAt,
      _updatedAt,
      name,
      "slug": slug.current,
      tags,
      description,
      "image": image.asset->url,
    }`,
    { next: {} },
  );
}
