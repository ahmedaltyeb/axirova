import React from 'react';

/**
 * Catches uncaught rendering errors anywhere in the tree and shows a
 * friendly fallback instead of letting the whole app unmount into a
 * blank/white page.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Surface the error in the console so it can still be diagnosed.
    console.error('Unhandled error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
            textAlign: 'center',
            fontFamily: 'sans-serif',
            background: '#0a0a0a',
            color: '#f5f5f5',
          }}
        >
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>
            Something went wrong.
          </h1>
          <p style={{ opacity: 0.75, marginBottom: '1.5rem' }}>
            Please refresh the page. If the problem persists, contact support.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '999px',
              border: '1px solid currentColor',
              background: 'transparent',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
