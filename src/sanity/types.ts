import { type PortableTextBlock } from 'sanity';

export type Blog = {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: string;
  description: string;
  tags: string[];
  image: string;
  url: string;
  content: PortableTextBlock[];
};
