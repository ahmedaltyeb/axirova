import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import ChatbotWidget from './components/ChatbotWidget';
import WhatsAppButton from './components/WhatsAppButton';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';

const Footer            = lazy(() => import('./components/Footer'));
const Privacy           = lazy(() => import('./pages/Privacy'));
const Terms             = lazy(() => import('./pages/Terms'));
const BlogIndex         = lazy(() => import('./pages/BlogIndex'));
const BlogPost          = lazy(() => import('./pages/BlogPost'));
const CaseStudiesIndex  = lazy(() => import('./pages/CaseStudiesIndex'));
const CaseStudyDetail   = lazy(() => import('./pages/CaseStudyDetail'));

export default function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <Cursor />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Suspense fallback={null}><Privacy /></Suspense>} />
          <Route path="/terms" element={<Suspense fallback={null}><Terms /></Suspense>} />
          <Route path="/blog" element={<Suspense fallback={null}><BlogIndex /></Suspense>} />
          <Route path="/blog/:slug" element={<Suspense fallback={null}><BlogPost /></Suspense>} />
          <Route path="/case-studies" element={<Suspense fallback={null}><CaseStudiesIndex /></Suspense>} />
          <Route path="/case-studies/:slug" element={<Suspense fallback={null}><CaseStudyDetail /></Suspense>} />
        </Routes>

        <Suspense fallback={null}><Footer /></Suspense>

        {/* ── Floating widgets ── */}
        <ChatbotWidget />
        <WhatsAppButton />
        <CookieConsent />
      </HashRouter>
    </LanguageProvider>
  );
}
