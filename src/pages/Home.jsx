import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import siteData from '../data/site.json';
import activitiesData from '../data/activities.json';
import teamData from '../data/team.json';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import SectionTitle from '../components/common/SectionTitle';
import ActivityCard from '../components/common/ActivityCard';
import TeamCard from '../components/common/TeamCard';
import Counter from '../components/common/Counter';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Aadarsha Mitra Seva Sangham (AMSS) | Together We Can Create Hope';
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedActivity) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedActivity]);

  // Carousel auto-rotate slide transition every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + 3) % 3);
  };

  // Extract first 3 featured activities
  const featuredActivities = activitiesData.slice(0, 3);


  // Truncate founder message for preview (first 3 sentences)
  const founderMessagePreview = siteData.founder.message
    .split('.')
    .slice(0, 3)
    .join('.') + '.';

  const slides = [
    {
      id: 'slide-1',
      title: (
        <span style={{ fontSize: '0.88em', display: 'inline-block' }}>
          Together We Can <br />
          Create <span>Hope</span>, <br />
          One Act of <span>Kindness</span> <br />
          at a Time.
        </span>
      ),
      description: "AMSS is dedicated to improving lives through education, food support, community development, and compassionate service. Together we create opportunities, restore hope, and build stronger communities.",
      image: '/src/assets/images/placeholders/activities_edu.png'
    },
    {
      id: 'slide-2',
      title: (
        <span style={{ fontSize: '0.88em', display: 'inline-block' }}>
          Nourishing Lives, <br />
          Restoring <span>Hope</span>, <br />
          Through Every Meal <br />
          We Share.
        </span>
      ),
      description: "We believe no child or family should go to sleep hungry. Through monthly food distribution drives, we provide nutritious meals and essential rations to those in need.",
      image: '/src/assets/images/placeholders/activities_food.png'
    },
    {
      id: 'slide-3',
      title: (
        <span style={{ fontSize: '0.88em', display: 'inline-block' }}>
          Restoring Green Cover, <br />
          Planting <span>Hope</span>, <br />
          For a Sustainable <br />
          Better Tomorrow.
        </span>
      ),
      description: "Our environmental drives focus on planting saplings, establishing tree guards, and raising awareness about ecological conservation. Join us to make our neighborhoods cleaner and greener.",
      image: '/src/assets/images/placeholders/activities_plant.png'
    }
  ];

  return (
    <div className="homepage-wrapper">
      {/* 1. HERO CAROUSEL SECTION */}
      <section className="hero-carousel-section" aria-label="Home Welcome Banner">
        <div className="hero-carousel">
          {slides.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div 
                key={slide.id} 
                className={`hero-carousel__slide ${isActive ? 'hero-carousel__slide--active' : ''}`}
              >
                <img 
                  src={slide.image} 
                  alt="" 
                  className="hero-carousel__image"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
                <div className="hero-carousel__overlay" />
                <div className="hero-carousel__content">
                  <Container>
                    <div className="hero-content-left">
                      <h1 className="hero-heading-new">{slide.title}</h1>
                      <p className="hero-paragraph-new">{slide.description}</p>
                      <div className="hero-btn-group">
                        <a 
                          href="https://forms.gle/2T2tABrXn6jsVCZN6" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hero-btn-volunteer"
                          aria-label="Become a Volunteer at AMSS (opens in a new tab)"
                        >
                          🤝 Become a Volunteer
                        </a>
                        <a 
                          href="https://forms.gle/YGxxfrNZX4rSv8hE9" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hero-btn-donor"
                          aria-label="Join as Donor to AMSS (opens in a new tab)"
                        >
                          ❤️ Join as Donor
                        </a>
                      </div>
                    </div>
                  </Container>
                </div>
              </div>
            );
          })}

          {/* Manual Left/Right Arrows */}
          <button 
            type="button" 
            className="hero-carousel__arrow hero-carousel__arrow--left" 
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <Icons.ChevronLeft size={28} />
          </button>
          <button 
            type="button" 
            className="hero-carousel__arrow hero-carousel__arrow--right" 
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <Icons.ChevronRight size={28} />
          </button>



          {/* Bottom Pagination Dots */}
          <div className="hero-carousel__dots">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`hero-carousel__dot ${idx === currentSlide ? 'hero-carousel__dot--active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. FLOATING STATISTICS BAR */}
      <div className="floating-stats-bar-wrapper">
        <Container>
          <div className="floating-stats-bar">
            {/* Stat 1: Years of Service */}
            <div className="floating-stats-item">
              <Icons.Calendar className="floating-stats-item__icon" size={24} aria-hidden="true" />
              <p className="floating-stats-item__value">
                <Counter target="4+" />
              </p>
              <h4 className="floating-stats-item__label">Years of Service</h4>
            </div>

            {/* Stat 2: Funds Raised */}
            <div className="floating-stats-item">
              <Icons.Heart className="floating-stats-item__icon" size={24} aria-hidden="true" />
              <p className="floating-stats-item__value">
                <Counter target="₹1,28,649+" />
              </p>
              <h4 className="floating-stats-item__label">Funds Raised</h4>
            </div>

            {/* Stat 3: Donation Drives */}
            <div className="floating-stats-item">
              <Icons.Award className="floating-stats-item__icon" size={24} aria-hidden="true" />
              <p className="floating-stats-item__value">
                <Counter target="10+" />
              </p>
              <h4 className="floating-stats-item__label">Drives Completed</h4>
            </div>

            {/* Stat 4: Supported */}
            <div className="floating-stats-item">
              <Icons.Users className="floating-stats-item__icon" size={24} aria-hidden="true" />
              <p className="floating-stats-item__value">
                <Counter target="500+" />
              </p>
              <h4 className="floating-stats-item__label">Beneficiaries</h4>
            </div>

            {/* Stat 5: Volunteers */}
            <div className="floating-stats-item">
              <Icons.UserCheck className="floating-stats-item__icon" size={24} aria-hidden="true" />
              <p className="floating-stats-item__value">
                <Counter target="25+" />
              </p>
              <h4 className="floating-stats-item__label">Active Mitras</h4>
            </div>

            {/* Stat 6: Events */}
            <div className="floating-stats-item">
              <Icons.Globe className="floating-stats-item__icon" size={24} aria-hidden="true" />
              <p className="floating-stats-item__value">
                <Counter target="10+" />
              </p>
              <h4 className="floating-stats-item__label">Local Events</h4>
            </div>
          </div>
        </Container>
      </div>

      {/* 3. ABOUT PREVIEW SECTION */}
      <section id="about-preview" className="about-section" aria-label="About AMSS">
        <Container>
          <div className="about-preview__grid">
            {/* Left Content Column */}
            <div className="about-preview__content">
              <span className="about-preview__badge">ABOUT AMSS</span>
              <h3 className="about-heading-new">Small Acts. Lasting Impact.</h3>
              <div className="about-preview__text-wrapper">
                <p className="about-preview__text">
                  Aadarsha Mitra Seva Sangham (AMSS) is a student-led social service initiative founded in 2022 with a simple belief—small acts of kindness can create lasting change. What started as a group of friends contributing a small amount each month has grown into a mission dedicated to supporting education, food assistance, and community welfare.
                </p>
                <p className="about-preview__text">
                  Guided by the philosophy "Daivam Maanushya Rupena," we believe that God works through compassionate hearts to bring hope, dignity, and positive change to society. Together, we strive to create opportunities, inspire kindness, and build a brighter future for children, families, and communities.
                </p>
              </div>

              <div className="about-preview__cta">
                <Button to="/about" className="about-btn-pill">
                  Read More
                </Button>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="about-preview__image-wrapper">
              <div className="about-preview__glow-backdrop" aria-hidden="true" />
              <div className="about-preview__image-container">
                <img 
                  src="/images/about_amss.jpg" 
                  alt="Aadarsha Mitra Seva Sangham (AMSS) Volunteers with children" 
                  className="about-preview__image"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. MISSION & VISION SECTION */}
      <section id="mission-vision" className="mission-vision-section" aria-label="Mission and Vision">
        <div className="mission-vision__bg-glow" aria-hidden="true" />
        <Container>
          <div className="mission-vision__header">
            <span className="mission-vision__label">OUR DRIVING PRINCIPLES</span>
            <h2 className="mission-vision__heading">Mission & Vision</h2>
          </div>
          <div className="mission-vision__grid">
            {/* Mission Card */}
            <div className="mv-card">
              <div className="mv-card__icon-wrap">
                <Icons.Target size={36} aria-hidden="true" />
              </div>
              <h3 className="mv-card__title">Our Mission</h3>
              <p className="mv-card__text">{siteData.mission}</p>
            </div>
            {/* Vision Card */}
            <div className="mv-card">
              <div className="mv-card__icon-wrap">
                <Icons.Eye size={36} aria-hidden="true" />
              </div>
              <h3 className="mv-card__title">Our Vision</h3>
              <p className="mv-card__text">{siteData.vision}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. WHY SUPPORT AMSS SECTION (REDESIGNED) */}
      <section id="why-support-amss" className="why-support-section" aria-label="Why Support AMSS">
        {/* Background Leaf Illustrations in Corners */}
        {/* <div className="why-support__leaf-bg why-support__leaf-bg--left" aria-hidden="true">
          <svg width="160" height="160" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,90 Q30,10 90,10 Q70,90 10,90 Z" fill="rgba(46, 125, 50, 0.05)" stroke="rgba(46, 125, 50, 0.15)" strokeWidth="1.5"/>
            <path d="M10,90 Q50,50 90,10" stroke="rgba(46, 125, 50, 0.15)" strokeWidth="1.5"/>
          </svg>
        </div> */}
        {/* <div className="why-support__leaf-bg why-support__leaf-bg--right" aria-hidden="true">
          <svg width="160" height="160" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M90,90 Q70,10 10,10 Q30,90 90,90 Z" fill="rgba(46, 125, 50, 0.05)" stroke="rgba(46, 125, 50, 0.15)" strokeWidth="1.5"/>
            <path d="M90,90 Q50,50 10,10" stroke="rgba(46, 125, 50, 0.15)" strokeWidth="1.5"/>
          </svg>
        </div> */}

        <Container>
          {/* Header with faint green radial glow */}
          <div className="why-support__header">
            <div className="why-support__glow" aria-hidden="true" />
            <span className="why-support__label"> OUR CORE STRENGTHS</span>
            <h2 className="why-support__heading">Why Support AMSS</h2>
            <p className="why-support__subtitle">
              We are committed to creating a better tomorrow through compassion, education, and community service.
            </p>
          </div>

          {/* 3-Column Editorial Layout (No Boxed Cards) */}
          <div className="why-support__grid">
            {/* Column 1 */}
            <div className="why-support__col">
              <div className="why-support__img-wrap">
                <img
                  src="/images/why_support/coins_jar.jpg"
                  alt="Hand dropping coins into transparent donation jar outdoors"
                  className="why-support__img"
                  loading="lazy"
                />
              </div>
              <h3 className="why-support__col-heading">Small Contributions</h3>
              <div className="why-support__accent-line" aria-hidden="true" />
              <p className="why-support__col-desc">
                We believe no amount is too small. Even a tiny contribution can fund a child's textbook or feed a hungry person.
              </p>
            </div>

            {/* Column 2 */}
            <div className="why-support__col">
              <div className="why-support__img-wrap">
                <img
                  src="/images/why_support/education_kids.jpg"
                  alt="School children sitting in classroom receiving educational supplies"
                  className="why-support__img"
                  loading="lazy"
                />
              </div>
              <h3 className="why-support__col-heading">Education First</h3>
              <div className="why-support__accent-line" aria-hidden="true" />
              <p className="why-support__col-desc">
                We prioritize child education support, providing school kits, notebooks, mentoring, and learning opportunities to build brighter futures.
              </p>
            </div>

            {/* Column 3 */}
            <div className="why-support__col">
              <div className="why-support__img-wrap">
                <img
                  src="/images/why_support/team_unity.jpg"
                  alt="Volunteers hands together in unity"
                  className="why-support__img"
                  loading="lazy"
                />
              </div>
              <h3 className="why-support__col-heading">Transparent Service</h3>
              <div className="why-support__accent-line" aria-hidden="true" />
              <p className="why-support__col-desc">
                We maintain complete transparency with donors by openly sharing our activities, community drives, and the impact of every contribution.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. FEATURED ACTIVITIES SECTION */}
      <Section id="featured-activities" variant="background">
        <Container>
          <SectionTitle 
            label="Featured Activities" 
            title="Our Recent Donation Drives" 
            center={true}
          />
          <div className="featured-activities-grid">
            {featuredActivities.map((activity) => (
              <ActivityCard 
                key={activity.id} 
                {...activity} 
                onViewDetails={() => navigate(`/activities?id=${activity.id}`)} 
              />
            ))}
          </div>
          <div className="flex flex-center" style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--spacing-md)', marginBottom: '10px' }}>
            <Button to="/activities" variant="primary" size="lg" style={{ borderRadius: '50px', padding: '14px 32px' }}>
              View All Activities &rarr;
            </Button>
          </div>
        </Container>
      </Section>

      {/* 7. MENTORS SECTION (THE MENTORS WHO SHAPED OUR JOURNEY) */}
      <section id="mentors-section" className="mentors-section" aria-label="Mentors Who Shaped Our Journey">
        <div className="mentors-container">
          {/* Section Header */}
          <div className="mentors-header">
            <span className="mentors-label">OUR FOUNDATION & GUIDANCE</span>
            <h3 className="mentors-heading">The Mentors Who Shaped Our Journey</h3>
            <p className="mentors-subtitle">
              "Behind every meaningful mission stand great teachers whose wisdom shapes not only knowledge but also character, purpose, and a lifetime of service."
            </p>
          </div>

          {/* Main 2-Column Grid */}
          <div className="mentors-main-grid">
            {/* Left Column - Single Premium Framed Mentor Photo */}
            <div className="mentors-photo-col">
              <div className="mentors-frame">
                <img 
                  src="/images/mentors/mentors_together.jpg" 
                  alt="P. Pydiraju Sir & K. Tirupathi Rao Sir" 
                  className="mentors-frame__single-img" 
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/src/assets/images/logo/logo.png';
                  }}
                />
              </div>
              <div className="mentors-caption">
                <h3 className="mentors-caption__name">Sri P. Pydiraju & Sri K. Tirupathi Rao</h3>
                <span className="mentors-caption__role">Teachers • Mentors • Guiding Inspirations</span>
              </div>
            </div>

            {/* Right Column - Inspired Message & Quote */}
            <div className="mentors-content-col">
              {/* <h3 className="mentors-content__title">The Teachers Who Inspired a Lifetime of Service</h3> */}
              
              <div className="mentors-content__message">
                <p>
                  Every meaningful journey begins with someone who believes in us before we believe in ourselves. For me, those people are <strong>Sri P. Pydiraju Sir</strong> and <strong>Sri K. Tirupathi Rao Sir</strong>.
                </p>
                <p>
                  They were never just teachers who taught subjects inside a classroom. They taught us how to live with integrity, treat others with kindness, respect every individual, remain humble regardless of success, and understand that the true purpose of education is to become a better human being.
                </p>
                <p>
                  The vision behind <strong>Aadarsha Mitra Seva Sangham (AMSS)</strong> was greatly influenced by the values, discipline, compassion, and life lessons they shared with us. Their guidance continues to inspire every service activity we undertake, reminding us that real education is not measured by marks or certificates, but by the positive impact we create in the lives of others.
                </p>
                <p>
                  We are forever grateful to our mentors for shaping our character, inspiring our purpose, and planting the values that continue to guide both our lives and the mission of AMSS.
                </p>
              </div>

              {/* Single Premium Highlight Quote Card */}
              {/* <div className="mentor-highlight-card">
                <Icons.Quote size={22} className="mentor-highlight-card__icon" aria-hidden="true" />
                <p className="mentor-highlight-card__text">
                  "Some teachers complete a syllabus. Extraordinary teachers shape character, inspire purpose, and leave behind values that continue to guide generations."
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
