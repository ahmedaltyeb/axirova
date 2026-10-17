import React from 'react';
import { motion } from 'framer-motion';
import { CLIENT_LOGOS } from '../utils/siteData';
import { useLanguage } from '../context/LanguageContext';

const doubled = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

export default function ClientLogos() {
  const { t, pick } = useLanguage();

  return (
    <section className="brands-sec" aria-label={t('clientLogos.label')}>
      <div className="container">
        <motion.h2
          className="brands-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('clientLogos.title')}
        </motion.h2>
      </div>

      <div className="brands-track-wrap">
        <div className="brands-track">
          {doubled.map((client, i) => (
            <div key={i} className="brand-card" aria-hidden={i >= CLIENT_LOGOS.length}>
              <span className="brand-card-name">{client.name}</span>
              <span className="brand-card-sector">{pick(client.sector)}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .brands-sec {
          background: #e8ecf1;
          padding: 72px 0 80px;
          overflow: hidden;
        }
        .brands-title {
          text-align: center;
          font-family: var(--font-d);
          font-size: clamp(2rem, 4.5vw, 3.4rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #0b0b0b;
          margin: 0 0 56px;
        }
        .brands-track-wrap { overflow: hidden; position: relative; }
        .brands-track {
          display: flex;
          gap: 40px;
          width: max-content;
          padding: 0 20px;
          animation: brands-scroll 36s linear infinite;
        }
        .brands-track:hover { animation-play-state: paused; }
        @keyframes brands-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .brand-card {
          flex-shrink: 0;
          width: 200px;
          height: 200px;
          box-sizing: border-box;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-align: center;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 10px rgba(15, 30, 60, 0.05);
        }
        .brand-card-name {
          font-family: var(--font-d);
          font-size: 17px;
          font-weight: 800;
          line-height: 1.25;
          color: #0b2a5b;
        }
        .brand-card-sector {
          font-family: var(--font-m);
          font-size: 10px;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #1a6fe8;
        }
        [dir="rtl"] .brands-track { animation-direction: reverse; }
        @media (max-width: 768px) {
          .brands-sec { padding: 52px 0 56px; }
          .brands-title { margin-bottom: 36px; }
          .brands-track { gap: 20px; }
          .brand-card { width: 150px; height: 150px; }
          .brand-card-name { font-size: 14px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .brands-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
