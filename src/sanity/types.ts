import { type Image, type PortableTextBlock } from 'sanity';

export type SanitySlug = {
  _type: 'slug';
  current: string;
  _createdAt: Date;
  _rev: string;
};

export type SanityImage = Image & {
  alt: string;
};

export type Author = {
  _type: 'author';
  _id: string;
  _createdAt: Date;
  _updatedAt: Date;
  profileImage: SanityImage;
  firstName: string;
  lastName: string;
  bio: string;
};

export type Blog = {
  _type: 'blog';
  _id: string;
  _createdAt: Date;
  _updatedAt: Date;
  author: Author;
  title: string;
  slug: string; // SanitySlug.current
  tagLine: string;
  readingTime: string;
  topics: string[];
  image: SanityImage; // SanityImage.asset -> url
  content: PortableTextBlock[];
};
