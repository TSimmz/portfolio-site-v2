import { getBlog } from '~/sanity/api/getBlog';
import { PortableText } from '@portabletext/react';
import { type Blog } from '~/sanity/types';
import SectionWrapper from '~/components/containers/SectionWrapper';
import GradientTextColor from '~/components/typography/GradientTextColor';
import Underline from '~/components/Underline';
import Heading from '~/components/typography/Heading';

export const revalidate = 10;

type BlogProps = {
  params: { blog: string };
};

export default async function Blog(props: BlogProps) {
  const slug = props.params.blog;
  const blog: Blog = await getBlog(slug);

  return (
    <SectionWrapper id="blog-main" className="!justify-start">
      <div className="flex flex-col items-center py-4">
        <Heading
          as="h1"
          className="section-header flex flex-col items-center justify-center text-center"
        >
          <GradientTextColor className="header-text">
            {blog?.name ?? 'NAME MISSING'}
          </GradientTextColor>
          <Underline className="header-text min-w-[250px] max-w-xl bg-brandLight-500 px-4 dark:bg-brandDark-500" />
        </Heading>
      </div>
      <div className="mt-5 text-lg text-light-sub dark:text-dark-sub">
        <PortableText value={blog.content} />
      </div>
    </SectionWrapper>
  );
}
