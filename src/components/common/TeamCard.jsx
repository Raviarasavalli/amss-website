import React from 'react';
import { logoImg, teamImages } from '../../assets/images';

function TeamCard({ id, name, role, bio, image, className = '' }) {
  const imgSrc = teamImages[id] || image || logoImg;

  return (
    <div className={`reusable-team-card ${className}`.trim()}>
      {/* 1:1 Aspect Ratio Square Image */}
      <div className="reusable-team-card__image-container">
        <img
          src={imgSrc}
          alt={name}
          loading="lazy"
          className="reusable-team-card__image"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = logoImg;
          }}
        />
      </div>

      {/* Card Details */}
      <div className="reusable-team-card__body">
        <h3 className="reusable-team-card__name">{name}</h3>
        <span className="reusable-team-card__role">{role}</span>
        {bio && <p className="reusable-team-card__bio">{bio}</p>}
      </div>
    </div>
  );
}

export default TeamCard;
