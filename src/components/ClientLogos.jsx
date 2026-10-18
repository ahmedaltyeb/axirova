import React from 'react';
import { motion } from 'framer-motion';
import { CLIENT_LOGOS } from '../utils/siteData';
import { useLanguage } from '../context/LanguageContext';

const doubled = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

export default function ClientLogos() {
  const { t } = useLanguage();

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
              <img
                src={`${import.meta.env.BASE_URL}images/clients/${client.logo}`}
                alt={client.name}
                loading="lazy"
                draggable="false"
              />
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
          overflow: hidden;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 10px rgba(15, 30, 60, 0.05);
        }
        .brand-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        [dir="rtl"] .brands-track { animation-direction: reverse; }
        @media (max-width: 768px) {
          .brands-sec { padding: 52px 0 56px; }
          .brands-title { margin-bottom: 36px; }
          .brands-track { gap: 20px; }
          .brand-card { width: 150px; height: 150px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .brands-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
