import { getBlog } from '~/sanity/api/getBlog';
import { PortableText } from '@portabletext/react';
import { type Blog } from '~/sanity/types';
import Image from 'next/image';
import { urlForImage } from '~/sanity/lib/image';

export const revalidate = 10;

type BlogProps = {
  params: { blog: string };
};

export default async function Blog(props: BlogProps) {
  const slug = props.params.blog;
  const blog: Blog = await getBlog(slug);

  if (!blog) return null;

  return (
    <section
      id="blog-page"
      className="container mt-8 flex max-w-5xl flex-col items-center gap-4 bg-neutrals-300/70 px-4 py-16 dark:bg-neutrals-700/70"
    >
      {/* @component - Blog Header Data */}
      <div className="flex w-full flex-col pt-8">
        <h1 className="text-2xl font-bold underline decoration-brandLight-500/50 underline-offset-[6px] dark:decoration-brandDark-500/50">
          {blog.title}
        </h1>
        <p className="mt-3 text-base italic">{blog.tagLine}</p>

        {/* @component - Blog Metadata */}
        <div className="mt-5 flex flex-wrap justify-between gap-x-4 text-sm">
          <p>
            <span className="font-semibold">Created On: </span>
            {`2023-01-01`}
            {blog._updatedAt ? (
              <p>
                <span className="font-semibold">Updated On: </span>
                {`2024-01-01`}
              </p>
            ) : null}
          </p>

          <p>
            <span className="font-semibold">Read Time: </span>
            {`${blog.readingTime}min`}
          </p>
        </div>
      </div>

      {/* @component - Blog Header Image */}
      <div className="relative h-60 w-full overflow-hidden md:h-72 lg:h-96">
        <Image
          src={urlForImage(blog.image).width(1440).url()}
          alt={blog.title}
          fill={true}
          className="rounded-md object-cover"
        />
      </div>
      <p className="w-full text-left text-sm font-semibold italic">
        {'Testing the alt text'}
      </p>

      <hr className="my-4 h-2 w-full border-t-0 bg-transparent bg-gradient-to-r from-transparent via-brandLight-500 to-transparent dark:via-brandDark-500" />

      {/* @component - Blog Content Wrapper */}
      <div className="blog-post-content mt-5 w-5/6 self-start text-lg text-light-base dark:text-dark-base">
        <PortableText value={blog.content} />
      </div>

      {/* @component - Related Blogs */}

      {/* @component - Author Information */}
    </section>
  );
}
