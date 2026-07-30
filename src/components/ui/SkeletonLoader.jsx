import React from 'react';

function SkeletonLoader({ 
  width = '100%', 
  height = '200px', 
  borderRadius = 'var(--radius-md)', 
  className = '',
  style = {} 
}) {
  return (
    <div
      className={`skeleton-loader ${className}`.trim()}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: '#e2e8f0',
        animation: 'pulse 1.5s infinite ease-in-out',
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

export default SkeletonLoader;
