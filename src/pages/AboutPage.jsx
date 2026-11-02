import React from 'react';
import { useContent } from '../content';
import { SITE } from '../utils/siteData';
import Vision from '../components/Vision';
import Values from '../components/Values';
import SEO from '../components/SEO';
import { CTA } from '../components/Marketing';
export default function AboutPage(){const {c}=useContent();return <><SEO title={c.nav.about} description={c.descriptions.about}/><div className="page-intro shell"><span className="eyebrow">AXIROVA / {c.nav.about}</span><h1>{c.descriptions.about}</h1><p>{c.aboutText}</p><div className="founder-note"><span>{c.founder}</span><strong>{SITE.ceo}</strong></div></div><Vision/><Values/><CTA/></>;}
