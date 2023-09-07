import { type Image, type PortableTextBlock } from 'sanity';

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
  _type: 'blog';
  _id: string;
  _createdAt: Date;
  _updatedAt: Date;
  author: string;
  title: string;
  slug: string; // SanitySlug.current
  tagLine: string;
  readingTime: string;
  topics: string[];
  image: Image; // SanityImage.asset -> url
  content: PortableTextBlock[];
};
