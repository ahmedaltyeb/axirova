import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE } from '../utils/siteData';
import { useContent } from '../content';
export default function SEO({title,description,service,faq,noindex=false}) {
 const {pathname}=useLocation(); const {lang}=useContent(); const origin=(import.meta.env.VITE_SITE_URL || 'https://axirova.ae').replace(/\/$/,''); const url=origin+pathname;
 const schema=[{'@context':'https://schema.org','@type':'Organization','@id':origin+'/#organization',name:SITE.name,url:origin,email:SITE.email,telephone:SITE.phone,areaServed:['AE','GCC','MENA']}];
 if(service)schema.push({'@context':'https://schema.org','@type':'Service',name:title,description,provider:{'@id':origin+'/#organization'},url});
 if(faq)schema.push({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))});
 return <Helmet><title>{title} | Axirova Technology</title><meta name="description" content={description}/><meta name="robots" content={noindex?'noindex, follow':'index, follow'}/><link rel="canonical" href={url}/><meta property="og:title" content={`${title} | Axirova`}/><meta property="og:description" content={description}/><meta property="og:url" content={url}/><meta property="og:type" content="website"/><meta property="og:locale" content={lang==='ar'?'ar_AE':'en_AE'}/><meta property="og:image" content={`${origin}/og-image.png`}/><script type="application/ld+json">{JSON.stringify(schema).replace(/</g,'\\u003c')}</script></Helmet>;
}
