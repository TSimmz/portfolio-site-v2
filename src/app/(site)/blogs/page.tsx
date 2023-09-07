import { getBlogs } from '~/sanity/api/getBlogs';
import { type Blog } from '~/sanity/types';
import Heading from '~/components/typography/Heading';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Underline from '~/components/Underline';
import BlogCard from '~/sections/Blogs/BlogCard';

export const revalidate = 10;

const BlogsPage = async () => {
  const blogs: Blog[] | null = await getBlogs();

  if (blogs === null) return null;

  return (
    <section
      id="blog-list"
      className="flex max-w-7xl flex-col items-center gap-4 px-4 py-16"
    >
      <div className="flex flex-col items-center py-4">
        <Heading
          as="h1"
          className="flex flex-col items-center justify-center text-center"
        >
          <GradientTextColor>Blogs</GradientTextColor>
          <Underline className="w-full min-w-[250px] max-w-xl bg-brandLight-500 px-4 dark:bg-brandDark-500" />
        </Heading>

        <div className="mt-4 grid justify-center gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* eslint-disable-next-line @typescript-eslint/prefer-optional-chain */}
          {blogs !== null && blogs?.length
            ? blogs.map((blog: Blog) => {
                return (
                  <BlogCard
                    key={blog._id}
                    href={blog.slug ? `/blogs/${blog.slug}` : '/blogs'}
                    blog={blog}
                  />
                );
              })
            : null}
        </div>
      </div>
    </section>
  );
};

export default BlogsPage;
