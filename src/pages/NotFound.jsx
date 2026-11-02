import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../content';
import SEO from '../components/SEO';
export default function NotFound(){const {c}=useContent();return <><SEO title={c.notFound} description={c.notFoundText} noindex/><div className="page-intro shell not-found"><span className="eyebrow">404 / AXIROVA</span><h1>{c.notFound}</h1><p>{c.notFoundText}</p><Link className="button" to="/">{c.nav.home} ↗</Link></div></>;}
