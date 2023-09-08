const blog = {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Header Image',
      type: 'image',
      description: 'Image used as the header for blog post',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
        },
      ],
    },
    {
      name: 'title',
      title: 'Title',
      description: 'Title of the blog post',
      type: 'string',
    },
    {
      name: 'author',
      title: 'Author',
      description: 'Person who authored this blog post',
      type: 'reference',
      to: { type: 'author' },
    },
    {
      name: 'slug',
      title: 'Slug',
      description:
        "Used to index the blog post on the site. \n Click 'Generate' to create auto-magically from the Title",
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'tagLine',
      title: 'Tag Line',
      description: 'Short, quick blurb to hook readers',
      type: 'string',
    },
    {
      name: 'readingTime',
      title: 'Read Time',
      description: 'Approximate reading time of blog post',
      type: 'number',
    },
    {
      name: 'topics',
      title: 'Topics',
      description: 'List of relevant topics covered in the blog post',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'content',
      title: 'Content',
      description: 'The content of the blog post',
      type: 'array',
      of: [
        { type: 'block' }, // Allows for rich text support straight out of Sanity IO
      ],
    },
  ],
};

export default blog;
