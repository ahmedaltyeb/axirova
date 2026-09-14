import React from 'react';
import logoDark from '../assets/icons/axirova-logo-horizontal.png';
import logoLight from '../assets/icons/axirova-logo-horizontal-light.png';

export default function BrandLogo({ height = 44, maxWidth, className = '' }) {
  const sharedStyle = {
    height: `${height}px`,
    width: 'auto',
    maxWidth,
    objectFit: 'contain',
  };

  return (
    <span className={`brand-logo ${className}`.trim()}>
      <img
        className="brand-logo__dark"
        src={logoDark}
        alt="AXIROVA — AI Solutions & Quality Assurance"
        style={sharedStyle}
      />
      <img
        className="brand-logo__light"
        src={logoLight}
        alt=""
        aria-hidden="true"
        style={sharedStyle}
      />
    </span>
  );
}
