import React from 'react';
import * as Icons from 'lucide-react';

function SocialLinks({ links = [], className = '' }) {
  if (!links || links.length === 0) return null;

  return (
    <div className={`social-links flex ${className}`.trim()}>
      {links.map((item, index) => {
        const IconComponent = Icons[item.icon] || Icons.Share2;
        return (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-links__item"
            aria-label={`Follow us on ${item.platform}`}
          >
            <IconComponent size={20} aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

export default SocialLinks;
