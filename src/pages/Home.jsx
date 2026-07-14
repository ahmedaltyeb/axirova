import React, { Suspense, lazy } from 'react';
import PageEnter from '../components/PageEnter';
import ScrollProgress from '../components/ScrollProgress';
import Hero from '../components/Hero';

const ClientLogos   = lazy(() => import('../components/ClientLogos'));
const About         = lazy(() => import('../components/About'));
const WhyChooseUs   = lazy(() => import('../components/WhyChooseUs'));
const Services      = lazy(() => import('../components/Services'));
const Process       = lazy(() => import('../components/Process'));
const Industries    = lazy(() => import('../components/Industries'));
const Products      = lazy(() => import('../components/Products'));
const Testimonials  = lazy(() => import('../components/Testimonials'));
const Counters      = lazy(() => import('../components/Counters'));
const TechStack     = lazy(() => import('../components/TechStack'));
const Partners      = lazy(() => import('../components/Partners'));
const Vision        = lazy(() => import('../components/Vision'));
const Values        = lazy(() => import('../components/Values'));
const FAQ           = lazy(() => import('../components/FAQ'));
const Contact       = lazy(() => import('../components/Contact'));
const CTA           = lazy(() => import('../components/CTA'));

const Divider = () => <div className="section-divider" />;

export default function Home() {
  return (
    <>
      <PageEnter />
      <ScrollProgress />

      <main>
        {/* ── Above fold ── */}
        <section id="hero-section"><Hero /></section>

        <Suspense fallback={null}>
          {/* ── Trust bar ── */}
          <ClientLogos />

          {/* ── About ── */}
          <Divider />
          <section id="about"><About /></section>

          {/* ── Why AXIROVA ── */}
          <Divider />
          <section id="why"><WhyChooseUs /></section>

          {/* ── Services ── */}
          <Divider />
          <section id="services"><Services /></section>

          {/* ── How We Work ── */}
          <Divider />
          <section id="process"><Process /></section>

          {/* ── Industries ── */}
          <Divider />
          <section id="industries"><Industries /></section>

          {/* ── Products ── */}
          <Divider />
          <section id="products"><Products /></section>

          {/* ── Testimonials ── */}
          <Divider />
          <section id="testimonials"><Testimonials /></section>

          {/* ── Stats ── */}
          <Divider />
          <section id="counters"><Counters /></section>

          {/* ── Tech Stack ── */}
          <Divider />
          <section id="tech"><TechStack /></section>

          {/* ── Partners (borderTop handled inside) ── */}
          <section id="partners"><Partners /></section>

          {/* ── Vision & Mission ── */}
          <Divider />
          <section id="vision"><Vision /></section>

          {/* ── Core Values ── */}
          <Divider />
          <section id="values"><Values /></section>

          {/* ── FAQ ── */}
          <Divider />
          <FAQ />

          {/* ── Contact ── */}
          <Divider />
          <Contact />

          {/* ── Pre-footer CTA ── */}
          <Divider />
          <section id="cta-sec"><CTA /></section>
        </Suspense>
      </main>
    </>
  );
}
