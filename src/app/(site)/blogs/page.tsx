import SectionWrapper from '~/components/containers/SectionWrapper';
import { getBlogs } from '~/sanity/api/getBlogs';
import { type Blog } from '~/sanity/types';
import Heading from '~/components/typography/Heading';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Underline from '~/components/Underline';
import BlogCard from '~/sections/Blogs/BlogCard';

export const revalidate = 10;

const BlogsPage = async () => {
  const blogs: Blog[] = await getBlogs();

  return (
    <main
      id="home"
      className="relative mx-auto flex flex-auto flex-col items-center overflow-x-hidden px-2"
    >
      <section
        id="blogs-main"
        className="container flex grow flex-col items-center gap-4 px-4 py-16 xs:gap-12 lg:py-20 xl:py-[7rem] min-[1920px]:min-h-[calc(100vh-64px)] min-[1920px]:py-16 "
      >
        <div className="flex flex-col items-center py-4">
          <Heading
            as="h1"
            className="section-header flex flex-col items-center justify-center text-center"
          >
            <GradientTextColor className="header-text">Blogs</GradientTextColor>
            <Underline className="header-text min-w-[250px] max-w-xl bg-brandLight-500 px-4 dark:bg-brandDark-500" />
          </Heading>

          <div className="mt-4 grid w-full justify-center gap-6 sm:grid-cols-2 md:grid-cols-3">
            {blogs.map((blog: Blog) => {
              return (
                <BlogCard
                  key={blog._id}
                  href={`/blogs/${blog.slug}`}
                  data={blog}
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogsPage;
