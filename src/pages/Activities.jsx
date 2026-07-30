import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as Icons from 'lucide-react';
import activitiesData from '../data/activities.json';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import SectionTitle from '../components/common/SectionTitle';
import ActivityCard from '../components/common/ActivityCard';
import Counter from '../components/common/Counter';

// Helper for dynamic category badge colors
const getCategoryBadgeStyle = (cat) => {
  switch (cat) {
    case 'Medical Assistance':
      return { backgroundColor: '#D90429', color: '#ffffff' };
    case 'Education Support':
      return { backgroundColor: '#1D3557', color: '#ffffff' };
    case 'Food & Nutrition':
      return { backgroundColor: '#E07A5F', color: '#ffffff' };
    case 'Orphanage Support':
      return { backgroundColor: '#6B2D5C', color: '#ffffff' };
    case 'Infrastructure Support':
      return { backgroundColor: '#2A9D8F', color: '#ffffff' };
    case 'Community Service':
      return { backgroundColor: '#3D405B', color: '#ffffff' };
    default:
      return { backgroundColor: 'var(--color-primary)', color: '#ffffff' };
  }
};

function Activities() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);
  const [highlightedId, setHighlightedId] = useState(null);
  const [modalHovered, setModalHovered] = useState(false);
  const modalAutoRef = useRef(null);
  const swipeTouchStartX = useRef(null);

  useEffect(() => {
    document.title = 'Welfare Activities & Donation History | AMSS';
  }, []);

  // Handle URL navigation parameter (?id=activity-id)
  useEffect(() => {
    const activityId = searchParams.get('id');
    if (activityId) {
      const foundIndex = activitiesData.findIndex((act) => act.id === activityId);
      if (foundIndex !== -1) {
        setActiveCategory('All');
        if (foundIndex >= visibleCount) {
          setVisibleCount(foundIndex + 6);
        }
        setHighlightedId(activityId);

        const scrollTimer = setTimeout(() => {
          const cardElem = document.getElementById(`activity-card-${activityId}`);
          if (cardElem) {
            cardElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);

        const clearTimer = setTimeout(() => {
          setHighlightedId(null);
        }, 2800);

        return () => {
          clearTimeout(scrollTimer);
          clearTimeout(clearTimer);
        };
      }
    }
  }, [searchParams]);

  const detailsCloseRef = useRef(null);

  const categories = [
    'All',
    'Medical Assistance',
    'Education Support',
    'Food & Nutrition',
    'Orphanage Support',
    'Community Service',
    'Infrastructure Support',
  ];

  // Lock scroll when modal is active
  useEffect(() => {
    if (selectedDetails) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedDetails]);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedDetails(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus trap on open + reset gallery index
  useEffect(() => {
    if (selectedDetails && detailsCloseRef.current) {
      detailsCloseRef.current.focus();
      setActiveGalleryIndex(0);
    }
  }, [selectedDetails]);

  // Auto-carousel for modal: every 3 seconds, pause when user hovers
  useEffect(() => {
    if (!selectedDetails) return;
    const imgs = selectedDetails.images?.length > 0
      ? selectedDetails.images
      : selectedDetails.image ? [selectedDetails.image] : [];
    if (imgs.length <= 1) return;
    if (modalHovered) return;
    modalAutoRef.current = setInterval(() => {
      setActiveGalleryIndex((prev) => (prev + 1) % imgs.length);
    }, 3000);
    return () => clearInterval(modalAutoRef.current);
  }, [selectedDetails, modalHovered]);

  // Reset pagination on category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(6);
  };

  // Filter activities by category
  const filteredActivities = activitiesData.filter((act) => {
    return activeCategory === 'All' || act.category === activeCategory;
  });

  // Featured spotlight activity (latest drive)
  const featuredActivity = activitiesData[0];

  // Paginated activities for grid display
  const displayedActivities = filteredActivities.slice(0, visibleCount);

  // Helper for activity images list
  const getActivityImages = (activity) => {
    if (!activity) return [];
    if (activity.images && Array.isArray(activity.images) && activity.images.length > 0) {
      return activity.images;
    }
    if (activity.image) {
      return [activity.image];
    }
    return ['/src/assets/images/logo/logo.png'];
  };

  return (
    <div className="activities-page-wrapper">
      {/* 1. HERO HEADER */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(27, 94, 60, 0.82), rgba(27, 94, 60, 0.96)), url('/images/activities/annual-education-assistance/cover.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="Activities Page Banner"
      >
        <Container>
          <div className="hero__container">
            <span className="hero__label">Donation History & Activity Log</span>
            <h1 className="hero__heading">Empowering Lives Through Transparent Service</h1>
            <p className="hero__paragraph">
              Every drive completed by Aadarsha Mitra Seva Sangham is documented with direct community impact, verified expenditure, and real ground results. Explore our active welfare campaigns below.
            </p>
          </div>
        </Container>
      </section>



      {/* 3. EXPLORER GRID */}
      <Section id="activities-explorer" variant="background">
        <Container>
          {/* Activity Cards Grid */}
          {displayedActivities.length > 0 ? (
            <>
              <div className="grid grid-3" style={{ display: 'grid', gap: 'var(--spacing-lg)', alignItems: 'stretch' }}>
                {displayedActivities.map((activity) => (
                  <div id={`activity-card-${activity.id}`} key={activity.id}>
                    <ActivityCard
                      {...activity}
                      className={highlightedId === activity.id ? 'activity-card--highlighted' : ''}
                      onViewDetails={() => setSelectedDetails(activity)}
                    />
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < filteredActivities.length && (
                <div className="flex flex-center" style={{ marginTop: 'var(--spacing-xl)', justifyContent: 'center' }}>
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    style={{ gap: '8px', minWidth: '220px' }}
                  >
                    <span>Load More Activities ({filteredActivities.length - visibleCount} remaining)</span>
                    <Icons.ChevronDown size={18} aria-hidden="true" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-column flex-center" style={{ padding: 'var(--spacing-xxl) 0', textAlign: 'center' }}>
              <Icons.Info size={48} style={{ color: 'var(--color-secondary)', opacity: 0.5, marginBottom: 'var(--spacing-sm)' }} aria-hidden="true" />
              <h3>No activities found</h3>
              <p className="statistic-card__desc" style={{ maxWidth: '400px' }}>
                We couldn't find any activities under the category "{activeCategory}". Please explore other categories.
              </p>
            </div>
          )}
        </Container>
      </Section>




      {/* ═══════════════════════════════════════════════════════
          ACTIVITY DETAILS MODAL — Premium Compact No-Scroll
      ══════════════════════════════════════════════════════════ */}
      {selectedDetails && (() => {
        const imgs = getActivityImages(selectedDetails);
        const fullText = selectedDetails.longDescription || selectedDetails.description || '';
        const CHAR_LIMIT = 260;
        const isLong = fullText.length > CHAR_LIMIT;

        return (
          <div
            className="amd-overlay"
            onClick={() => { setSelectedDetails(null); }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="amd-title"
          >
            <div
              className="amd-box"
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => setModalHovered(true)}
              onMouseLeave={() => setModalHovered(false)}
            >
              {/* ── LEFT: Image Carousel ─────────────────────── */}
              <div className="amd-left">
                {/* Image wrapper — swipe support */}
                <div
                  className="amd-img-wrap"
                  onTouchStart={(e) => { swipeTouchStartX.current = e.touches[0].clientX; }}
                  onTouchEnd={(e) => {
                    if (swipeTouchStartX.current === null) return;
                    const delta = e.changedTouches[0].clientX - swipeTouchStartX.current;
                    if (Math.abs(delta) > 40) {
                      setActiveGalleryIndex((p) =>
                        delta < 0 ? (p + 1) % imgs.length : (p - 1 + imgs.length) % imgs.length
                      );
                    }
                    swipeTouchStartX.current = null;
                  }}
                >
                  <img
                    key={activeGalleryIndex}
                    src={imgs[activeGalleryIndex] || imgs[0]}
                    alt={selectedDetails.title}
                    className="amd-main-img"
                    onError={(e) => { e.currentTarget.src = '/src/assets/images/logo/logo.png'; }}
                  />

                  {/* Close button */}
                  <button
                    ref={detailsCloseRef}
                    type="button"
                    className="amd-close"
                    onClick={() => setSelectedDetails(null)}
                    aria-label="Close"
                  >
                    <Icons.X size={16} />
                  </button>

                  {/* Category badge */}
                  {selectedDetails.category && (
                    <span className="amd-cat-badge" style={getCategoryBadgeStyle(selectedDetails.category)}>
                      {selectedDetails.category}
                    </span>
                  )}

                  {/* Prev / Next arrows */}
                  {imgs.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="amd-arrow amd-arrow--l"
                        onClick={() => setActiveGalleryIndex((p) => (p - 1 + imgs.length) % imgs.length)}
                        aria-label="Previous photo"
                      ><Icons.ChevronLeft size={18} /></button>
                      <button
                        type="button"
                        className="amd-arrow amd-arrow--r"
                        onClick={() => setActiveGalleryIndex((p) => (p + 1) % imgs.length)}
                        aria-label="Next photo"
                      ><Icons.ChevronRight size={18} /></button>
                    </>
                  )}
                </div>

                {/* Dot indicators — below image, outside wrapper */}
                {imgs.length > 1 && (
                  <div className="amd-dots-row">
                    {imgs.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveGalleryIndex(i)}
                        className={`amd-dot${i === activeGalleryIndex ? ' amd-dot--on' : ''}`}
                        aria-label={`Photo ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* ── RIGHT: Content ───────────────────────────── */}
              <div className="amd-right">

                {/* Title */}
                <h2 id="amd-title" className="amd-title">{selectedDetails.title}</h2>

                {/* Meta: date + location */}
                <div className="amd-meta">
                  <span className="amd-meta-item">
                    <Icons.Calendar size={13} aria-hidden="true" />
                    {selectedDetails.date}
                  </span>
                  <span className="amd-meta-item">
                    <Icons.MapPin size={13} aria-hidden="true" />
                    {selectedDetails.location}
                  </span>
                </div>

                {/* Stats — 3 compact cards */}
                <div className="amd-stats">
                  <div className="amd-stat">
                    <span className="amd-stat-icon">💰</span>
                    <span className="amd-stat-val">{selectedDetails.amountSpent || '—'}</span>
                    <span className="amd-stat-lbl">Spent</span>
                  </div>
                  <div className="amd-stat">
                    <span className="amd-stat-icon">👥</span>
                    <span className="amd-stat-val">{selectedDetails.beneficiariesCount ? `${selectedDetails.beneficiariesCount}+` : '—'}</span>
                    <span className="amd-stat-lbl">Beneficiaries</span>
                  </div>
                  <div className="amd-stat">
                    <span className="amd-stat-icon">🤝</span>
                    <span className="amd-stat-val">{selectedDetails.volunteersCount || '—'}</span>
                    <span className="amd-stat-lbl">Volunteers</span>
                  </div>
                </div>

                {/* Mission Impact */}
                {selectedDetails.missionImpact && (
                  <div className="amd-impact">
                    <span className="amd-impact-lbl">❤️ Mission Impact</span>
                    <p className="amd-impact-txt">{selectedDetails.missionImpact}</p>
                  </div>
                )}

                {/* Overview with Read More */}
                <div className="amd-overview">
                  <span className="amd-overview-lbl">Overview</span>
                  <AmdOverview text={fullText} limit={CHAR_LIMIT} isLong={isLong} />
                </div>

                {/* Action buttons */}
                <div className="amd-actions">
                  <button
                    type="button"
                    className="amd-btn amd-btn--close"
                    onClick={() => setSelectedDetails(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ── Read-More helper (defined outside Activities to avoid re-creation) ──────
function AmdOverview({ text, limit, isLong }) {
  const [expanded, setExpanded] = React.useState(false);
  const shown = isLong && !expanded ? text.slice(0, limit) + '…' : text;
  return (
    <>
      <p className="amd-overview-body">{shown}</p>
      {isLong && (
        <button
          type="button"
          className="amd-read-more"
          onClick={() => setExpanded((x) => !x)}
        >
          {expanded ? 'Read Less ↑' : 'Read More ↓'}
        </button>
      )}
    </>
  );
}

export default Activities;

