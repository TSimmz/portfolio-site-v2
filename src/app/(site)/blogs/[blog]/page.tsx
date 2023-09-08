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
      <article className="flex w-full flex-col items-center gap-2 max-md:pt-8">
        {/* @component - Blog Header Data */}
        <div className="flex w-full flex-col">
          <h1 className="text-[26px] font-bold sm:text-3xl md:text-5xl">
            {blog.title}
          </h1>

          <hr className="my-2 h-px w-full border-t-0  bg-neutrals-400 dark:bg-neutrals-500" />

          <p className=" text-sm sm:text-base">{blog.tagLine}</p>
          <p className="mt-1 text-xs font-semibold sm:text-sm">
            Written By:{' '}
            <span className="italic text-brandLight-600  dark:text-brandDark-400">{`${blog.author.firstName} ${blog.author.lastName}`}</span>
          </p>
          <hr className="my-2 h-px w-full border-t-0  bg-neutrals-400 dark:bg-neutrals-500" />

          {/* @component - Blog Metadata */}
          <div className="my-2 flex flex-wrap justify-between gap-x-4 text-xs sm:text-sm">
            <p className="text-xs font-semibold sm:text-sm">
              Created On:{' '}
              <span className="italic text-brandLight-600  dark:text-brandDark-400">{`${formatDate(
                blog._createdAt,
              )}`}</span>
              {blog._updatedAt ? (
                <p className="text-xs font-semibold sm:text-sm">
                  Updated On:{' '}
                  <span className="italic text-brandLight-600  dark:text-brandDark-400">
                    {`${formatDate(blog._updatedAt)}`}
                  </span>
                </p>
              ) : null}
            </p>
            <p className="font-semibold">
              Read Time:{' '}
              <span className="italic text-brandLight-600  dark:text-brandDark-400">{`~${blog.readingTime}min`}</span>
            </p>
          </div>
        </div>

        {/* @component - Blog Header Image */}
        <div className="relative h-60 w-full overflow-hidden shadow-lg shadow-neutrals-500/50 after:absolute after:inset-0 after:bg-neutrals-800/30 after:transition-colors after:duration-300 after:ease-in-out after:content-[''] hover:after:bg-transparent dark:shadow-neutrals-900/30 md:h-80 lg:h-[500px]">
          <Image
            src={urlForImage(blog.image).width(1440).url()}
            alt={blog.image.alt}
            fill={true}
            className="rounded-md object-cover"
          />
        </div>
        <p className="w-full text-left text-sm italic">{blog.image.alt}</p>

        <hr className="mt-2 h-1 w-full border-t-0 bg-transparent bg-gradient-to-r from-transparent via-brandLight-500 to-transparent dark:via-brandDark-500" />

        {/* @component - Blog Content Wrapper */}
        <div className="relative flex gap-4 max-md:flex-col ">
          <div className="blog-post-content mt-4 rounded-md bg-neutrals-400/40 p-2 pl-4 shadow-lg shadow-neutrals-500/50 dark:bg-neutrals-600/50 dark:shadow-neutrals-900/30">
            <PortableText value={blog.content} />
          </div>

          {/* <hr className="sticky top-[86px] mt-1.5 h-[250px] w-2 border-t-0 bg-neutrals-400 dark:bg-neutrals-500 max-md:hidden" /> */}

          <aside className="sticky top-20 mt-1 flex h-fit shrink-0 grow-0 basis-72 flex-col gap-4 rounded-lg bg-neutrals-400/40 p-3 shadow-lg shadow-neutrals-500/50 dark:bg-neutrals-600/50 dark:shadow-neutrals-900/30 md:mt-4">
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
        <div
          id="author-card"
          className="mt-4 w-full self-start rounded-lg bg-neutrals-400/40 px-4 pb-4 pt-2 shadow-lg shadow-neutrals-500/50 dark:bg-neutrals-600/50 dark:shadow-neutrals-900/30 md:mt-6"
        >
          <h1 className="text-2xl font-bold ">
            About the Author →
            <hr className="mt-1 h-px w-full border-t-0 bg-neutrals-400 dark:bg-neutrals-500" />
          </h1>
          <div className="mt-4 flex w-full gap-4 max-[499px]:flex-col">
            <div className="relative h-[16rem] w-[16rem] shrink-0 overflow-hidden max-[499px]:mx-auto min-[500px]:h-40 min-[500px]:w-40">
              <Image
                src={urlForImage(blog.author.profileImage).width(1440).url()}
                alt={blog.author.profileImage.alt}
                fill={true}
                className="rounded-md object-cover"
              />
            </div>
            <div>
              <h2 className="mb-1 w-full rounded-[4px] bg-brandLight-600 pl-2 pr-3 text-center text-xl font-bold dark:bg-brandDark-500 min-[500px]:w-fit min-[500px]:text-left">
                {`${blog.author.firstName} ${blog.author.lastName}`}
              </h2>
              <p className="w-full italic min-[500px]:max-w-xl">
                {blog.author.bio}
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
