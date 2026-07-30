import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';

// Category badge color helper for distinct visual tags
const getCategoryBadgeStyle = (cat) => {
  switch (cat) {
    case 'Medical Assistance':
      return { backgroundColor: '#E8F5E9', color: '#1B5E20', border: '1px solid #C8E6C9' };
    case 'Education Support':
      return { backgroundColor: '#E3F2FD', color: '#0D47A1', border: '1px solid #BBDEFB' };
    case 'Food & Nutrition':
      return { backgroundColor: '#FFF3E0', color: '#E65100', border: '1px solid #FFE0B2' };
    case 'Orphanage Support':
      return { backgroundColor: '#F3E5F5', color: '#4A148C', border: '1px solid #E1BEE7' };
    case 'Infrastructure Support':
      return { backgroundColor: '#E0F2F1', color: '#004D40', border: '1px solid #B2DFDB' };
    case 'Community Service':
      return { backgroundColor: '#F5F5F5', color: '#212121', border: '1px solid #E0E0E0' };
    default:
      return { backgroundColor: '#F4F7F4', color: '#1B5E20', border: '1px solid #E4ECE4' };
  }
};

function ActivityCard({
  title,
  description,
  images = [],
  image,
  category,
  date,
  location,
  amountSpent,
  beneficiariesCount,
  volunteersCount,
  onViewDetails,
  className = '',
}) {
  const allImages = (images && images.length > 0)
    ? images
    : (image ? [image] : ['/src/assets/images/logo/logo.png']);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [fade, setFade] = useState(true);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIdx(idx);
      setFade(true);
    }, 200);
  };

  const goPrev = (e) => {
    e.stopPropagation();
    const prev = (currentIdx - 1 + allImages.length) % allImages.length;
    goTo(prev);
  };

  const goNext = (e) => {
    e.stopPropagation();
    const next = (currentIdx + 1) % allImages.length;
    goTo(next);
  };

  // Auto-slide every 4.5s; pause on hover
  useEffect(() => {
    if (allImages.length <= 1 || isHovered) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setCurrentIdx((prev) => {
        const next = (prev + 1) % allImages.length;
        setFade(false);
        setTimeout(() => setFade(true), 200);
        return next;
      });
    }, 4500);
    return () => clearInterval(timerRef.current);
  }, [allImages.length, isHovered]);

  return (
    <div
      className={`card activity-card ${className}`.trim()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Image Slider ── */}
      <div className="activity-card__image-container" style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={allImages[currentIdx]}
          alt={`${title} – photo ${currentIdx + 1}`}
          loading="lazy"
          className="activity-card__image"
          style={{
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.25s ease',
          }}
          onError={(e) => { e.currentTarget.src = '/src/assets/images/logo/logo.png'; }}
        />

        {/* Prev / Next arrows – show only when multiple images */}
        {allImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous photo"
              className="activity-card__slider-arrow activity-card__slider-arrow--left"
            >
              <Icons.ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next photo"
              className="activity-card__slider-arrow activity-card__slider-arrow--right"
            >
              <Icons.ChevronRight size={16} />
            </button>

            {/* Dot indicators */}
            <div className="activity-card__dots">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goTo(i); }}
                  aria-label={`Go to photo ${i + 1}`}
                  className={`activity-card__dot${i === currentIdx ? ' activity-card__dot--active' : ''}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Category badge */}
        {category && (
          <span
            className="activity-card__category-badge"
            style={getCategoryBadgeStyle(category)}
          >
            {category}
          </span>
        )}
      </div>

      {/* Content Area */}
      <div className="activity-card__content">
        <h3 className="activity-card__title">{title}</h3>

        <div className="activity-card__meta">
          <span className="activity-card__meta-item">
            <Icons.Calendar size={15} aria-hidden="true" />
            <span>{date}</span>
          </span>
          <span className="activity-card__meta-item">
            <Icons.MapPin size={15} aria-hidden="true" />
            <span>{location}</span>
          </span>
        </div>

        <div className="activity-card__chips">
          <span className="activity-card__chip">💰 {amountSpent || '₹24,500'}</span>
          <span className="activity-card__chip">👥 {beneficiariesCount ? `${beneficiariesCount}+` : '65+'}</span>
          <span className="activity-card__chip">🙋 {volunteersCount || '12'}</span>
        </div>

        <div className="activity-card__actions">
          <button
            type="button"
            className="activity-card__btn"
            onClick={onViewDetails}
          >
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActivityCard;
