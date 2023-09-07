import { groq } from 'next-sanity';
import { type Blog } from '../types';
import client from '../lib/client';

export async function getBlogs(): Promise<Blog[] | null> {
  return (
    client
      .fetch(
        groq`*[_type == "blog"]{
        _id,
        _createdAt,
        _updatedAt,
        "slug": slug.current,
        "image": image.asset->url,
        title,
        tagLine,
        readingTime,
        topics
      }`,
        {},
        { next: { revalidate: 15 } },
      )
      .then((blogs: Blog[]) => blogs)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        console.error('Get Blogs: ', error);
        return null;
      })
  );
}
