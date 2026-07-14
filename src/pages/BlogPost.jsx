import React from 'react';
import ContentDetailPage from '../components/ContentDetailPage';
import { BLOG_POSTS } from '../utils/blogData';

export default function BlogPost() {
  return <ContentDetailPage items={BLOG_POSTS} basePath="/blog" contentKey="blog" />;
}
