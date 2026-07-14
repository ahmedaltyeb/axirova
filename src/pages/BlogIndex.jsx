import React from 'react';
import ContentIndexPage from '../components/ContentIndexPage';
import { BLOG_POSTS } from '../utils/blogData';

export default function BlogIndex() {
  return <ContentIndexPage items={BLOG_POSTS} basePath="/blog" contentKey="blog" />;
}
