import { getBlog } from '~/sanity/api/getBlog';
import { PortableText } from '@portabletext/react';
import { type Blog } from '~/sanity/types';
import Image from 'next/image';
import { urlForImage } from '~/sanity/lib/image';
import { formatDate } from '~/utils/helpers';

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
      className="mb-8 max-w-5xl rounded-b-md bg-neutrals-300/70 px-5 pb-8 pt-16 dark:bg-neutrals-700/70 md:mt-8 "
    >
      <article className="flex w-full flex-col items-center gap-2">
        {/* @component - Blog Header Data */}
        <div className="flex w-full flex-col">
          <h1 className="text-2xl font-bold sm:text-3xl md:text-5xl">
            {blog.title}
          </h1>
          <p className="mt-3 text-sm italic sm:text-base">{blog.tagLine}</p>

          <hr className="my-2 h-px w-full border-t-0  bg-neutrals-400 dark:bg-neutrals-500" />

          {/* @component - Blog Metadata */}
          <div className="my-2 flex flex-wrap justify-between gap-x-4 text-xs sm:text-sm">
            <p>
              <span className="font-semibold">Created On: </span>
              {`${formatDate(blog._createdAt)}`}
              {blog._updatedAt ? (
                <p>
                  <span className="font-semibold">Updated On: </span>
                  {`${formatDate(blog._updatedAt)}`}
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
        <div className="relative h-60 w-full overflow-hidden after:absolute after:inset-0 after:bg-neutrals-800/30 after:transition-colors after:duration-300 after:ease-in-out after:content-[''] hover:after:bg-transparent md:h-72 lg:h-96">
          <Image
            src={urlForImage(blog.image).width(1440).url()}
            alt={blog.title}
            fill={true}
            className="rounded-md object-cover"
          />
        </div>
        <p className="w-full text-center text-sm font-semibold italic">
          {'Testing the alt text'}
        </p>

        <hr className="my-2 h-1 w-full border-t-0 bg-transparent bg-gradient-to-r from-transparent via-brandLight-500 to-transparent dark:via-brandDark-500" />

        {/* @component - Blog Content Wrapper */}
        <div className="relative flex gap-4 max-md:flex-col">
          <div className="blog-post-content">
            <PortableText value={blog.content} />
          </div>

          <hr className="sticky top-[86px] mt-1.5 h-[250px] w-2 border-t-0 bg-neutrals-400 dark:bg-neutrals-500 max-md:hidden" />

          <aside className="sticky top-20 flex h-fit shrink-0 grow-0 basis-72 flex-col gap-4 overflow-y-scroll">
            {/* @component - Related Blogs */}
            <div>
              <h2 className="mb-2 font-bold underline underline-offset-4">
                Topics
              </h2>
              <div className="flex flex-wrap gap-1">
                {blog.topics.map((topic: string) => {
                  return (
                    <span
                      key={`${blog.title}-${topic}`}
                      className="whitespace-nowrap rounded-full bg-brandLight-600 px-2 py-0.5 text-xs font-semibold text-dark-base antialiased transition-colors duration-200 ease-out group-hover:!backdrop-brightness-125 dark:bg-brandDark-500 group-hover:dark:!backdrop-brightness-125"
                    >
                      {`#${topic}`}
                    </span>
                  );
                })}
              </div>
            </div>
            {/* @component - Related Blogs */}
            <div>
              <h2 className="mb-2 font-bold underline underline-offset-4">
                Related Posts
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                accusantium officia dicta eveniet nobis vero aliquam placeat
                voluptatibus quos, cumque ullam sunt ut laudantium. Eligendi
                itaque doloribus corporis nihil ea!
              </p>
            </div>
          </aside>
        </div>

        {/* @component - Author Information */}
      </article>
    </section>
  );
}
