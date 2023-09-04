import SectionWrapper from '~/components/containers/SectionWrapper';
import { getBlogs } from '../../../sanity/utils';
import { type Blog } from 'sanity/types';

const BlogPage = async () => {
  const blogs: Blog[] = (await getBlogs()) as Blog[];

  return (
    <SectionWrapper id="blog-main">
      <>
        {blogs.map((blog: Blog) => (
          <div
            key={blog._id}
            className="text-4xl text-light-base dark:text-dark-base"
          >
            {blog.name}
          </div>
        ))}
      </>
    </SectionWrapper>
  );
};

export default BlogPage;
