import React from 'react';

function Loader({ className = '', ariaLabel = 'Loading content' }) {
  return (
    <div className={`loader-container ${className}`.trim()} role="status" aria-live="polite">
      <div className="loader-spinner" />
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}

export default Loader;
