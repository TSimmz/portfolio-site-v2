import SectionWrapper from '~/components/containers/SectionWrapper';
import { getBlogs } from '~/sanity/api/getBlogs';
import { type Blog } from '~/sanity/types';
import Heading from '~/components/typography/Heading';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Underline from '~/components/Underline';
import BlogCard from '~/sections/Blogs/BlogCard';

const BlogsPage = async () => {
  const blogs: Blog[] = await getBlogs();

  return (
    <SectionWrapper id="blog-main" className="!max-w-7xl !justify-start">
      <div className="flex flex-col items-center py-4">
        <Heading
          as="h1"
          className="section-header flex flex-col items-center justify-center text-center"
        >
          <GradientTextColor className="header-text">Blogs</GradientTextColor>
          <Underline className="header-text min-w-[250px] max-w-xl bg-brandLight-500 px-4 dark:bg-brandDark-500" />
        </Heading>

        <div className="mt-4 grid w-full justify-center gap-6 sm:grid-cols-2 md:grid-cols-3">
          {blogs.map((blog: Blog) => (
            <BlogCard
              key={blog._id}
              title={blog.name}
              description={blog.description}
              href={`/blogs/${blog.slug}`}
              topics={blog.tags}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default BlogsPage;
