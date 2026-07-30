import React from 'react';

function Section({ children, id, className = '', variant = 'light' }) {
  const sectionClass = `section section--${variant} ${className}`.trim();

  return (
    <section id={id} className={sectionClass}>
      {children}
    </section>
  );
}

export default Section;
