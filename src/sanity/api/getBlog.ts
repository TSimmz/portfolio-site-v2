import { groq } from 'next-sanity';
import { type Blog } from '../types';
import client from '../lib/client';

export async function getBlog(slug: string): Promise<Blog> {
  return client.fetch(
    groq`*[_type == "blog" && slug.current == $slug][0]{
      _id,
      _createdAt,
      _updatedAt,
      name,
      description,
      tags,
      "slug": slug.current,
      "image": image.asset->url,
      url,
      content
    }`,
    { slug },
    { next: { revalidate: 10 } },
  );
}
