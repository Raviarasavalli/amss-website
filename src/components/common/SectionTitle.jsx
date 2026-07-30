import React from 'react';

function SectionTitle({
  label,
  title,
  description,
  center = false,
  className = '',
}) {
  const containerClass = `section-title ${
    center ? 'section-title--center' : ''
  } ${className}`.trim();

  return (
    <div className={containerClass}>
      {label && <span className="section-title__label">{label}</span>}
      <h2 className="section-title__heading">{title}</h2>
      {description && <p className="section-title__description">{description}</p>}
    </div>
  );
}

export default SectionTitle;
