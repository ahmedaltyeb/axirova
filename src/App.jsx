import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Cursor />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Suspense fallback={null}><Privacy /></Suspense>} />
          <Route path="/terms" element={<Suspense fallback={null}><Terms /></Suspense>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Suspense fallback={null}><Footer /></Suspense>

        {/* ── Floating widgets ── */}
        <ChatbotWidget />
        <WhatsAppButton />
        <CookieConsent />
      </BrowserRouter>
    </LanguageProvider>
  );
}
