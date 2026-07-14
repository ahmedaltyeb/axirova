import React from 'react';
import ContentDetailPage from '../components/ContentDetailPage';
import { CASE_STUDIES } from '../utils/caseStudyData';

export default function CaseStudyDetail() {
  return <ContentDetailPage items={CASE_STUDIES} basePath="/case-studies" contentKey="caseStudies" />;
}
