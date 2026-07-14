import React from 'react';
import ContentIndexPage from '../components/ContentIndexPage';
import { CASE_STUDIES } from '../utils/caseStudyData';

export default function CaseStudiesIndex() {
  return <ContentIndexPage items={CASE_STUDIES} basePath="/case-studies" contentKey="caseStudies" />;
}
