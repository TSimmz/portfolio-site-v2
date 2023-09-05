import { type PortableTextBlock } from 'sanity';

export type SanityImage = {
  _type: 'image';
  alt: string;
  asset: {
    _type: 'reference';
    _ref: string;
  };
};

export type SanitySlug = {
  _type: 'slug';
  current: string;
  _createdAt: Date;
  _rev: string;
};

export type Blog = {
  _id: string;
  _createdAt: Date;
  _updatedAt: Date;
  _type: 'blog';
  name: string;
  slug: string; // SanitySlug.current
  description: string;
  tags: string[];
  image: string; // SanityImage.asset -> url
  url: string;
  content: PortableTextBlock[];
};
