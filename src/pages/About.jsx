import React, { useEffect } from 'react';
import * as Icons from 'lucide-react';
import siteData from '../data/site.json';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import SectionTitle from '../components/common/SectionTitle';

function About() {
  useEffect(() => {
    document.title = 'About Us | Aadarsha Mitra Seva Sangham (AMSS)';
  }, []);



  const differences = [
    {
      id: 'diff-1',
      icon: 'Users',
      title: 'Started by Friends',
      desc: 'Built on a firm foundation of childhood trust, shared school bonds, and joint passion rather than commercial administrative motives.'
    },
    {
      id: 'diff-2',
      icon: 'Flame',
      title: 'Small Contributions Create Big Impact',
      desc: 'Demonstrates how pocket savings (₹50 to ₹100 per month) aggregated across many hearts grow into powerful relief funds.'
    },
    {
      id: 'diff-4',
      icon: 'ShieldCheck',
      title: 'Transparent Community Service',
      desc: 'Enforces strict financial transparency, directing 100% of contributions to on-ground drives with zero administrative overheads.'
    }
  ];

  return (
    <div className="about-page-wrapper">
      {/* 1. ABOUT HERO */}
      <section 
        className="hero" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(27, 94, 60, 0.8), rgba(27, 94, 60, 0.95)), url(${siteData.heroImagePath})` 
        }}
        aria-label="About AMSS Hero"
      >
        <Container>
          <div className="hero__container">
            <span className="hero__label">About AMSS</span>
            <h1 className="hero__heading">Serving Humanity with Compassion Since 2022</h1>
            <p className="hero__paragraph">
              Discover the history, core values, and community missions driving Aadarsha Mitra Seva Sangham.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. OUR STORY */}
      <Section id="our-story" variant="light">
        <Container>
          <div className="about-story-container">
            <span className="about-story-label">HOW IT BEGAN</span>
            <h3 className="about-story-heading">Our Story</h3>
            
            <h3 className="about-story-subheading">From a Small Beginning to a Shared Mission</h3>

            <p className="about-story-p">
              Aadarsha Mitra Seva Sangham (AMSS) was born in 2022, not from abundant resources, but from a shared belief among a small group of 10–15 friends that kindness has the power to transform lives. Inspired by the values, guidance, and encouragement of our respected teachers, Sri P. Pydiraju Sir and Sri K. Tirupathi Rao Sir, we chose to turn compassion into meaningful action.
            </p>

            <p className="about-story-p">
              With nothing more than a simple commitment, each of us contributed ₹50 or ₹100 every month. What seemed like a small contribution soon became a source of hope for people facing difficult circumstances. We discovered that when many hearts unite with a common purpose, even the smallest efforts can create lasting change.
            </p>

            <p className="about-story-p">
              Over time, AMSS grew beyond a circle of friends into a student-led social service initiative dedicated to supporting education, food assistance, medical aid, and community welfare. Every activity, every donation, and every volunteer effort reflects our belief that service is not measured by the size of a contribution, but by the difference it makes in someone's life.
            </p>

            <p className="about-story-p">
              Guided by the philosophy &ldquo;Daivam Maanushya Rupena,&rdquo; we believe that compassion is one of the greatest strengths a person can possess. This belief continues to inspire every initiative we undertake, reminding us that ordinary people can create extraordinary change when they choose to serve others.
            </p>
          </div>
        </Container>
      </Section>

      {/* 3. WHY AMSS WAS CREATED */}
      <Section id="why-created" variant="background">
        <Container>
          <div className="why-created-card">
            <span className="why-created-card__label">WHY AMSS WAS CREATED</span>
            <h2 className="why-created-card__heading">Bridging Gaps Through Compassion</h2>
            
            <p className="why-created-card__p">
              As students, we often saw children unable to continue their education because they lacked basic school supplies. We also met families struggling to meet their daily needs, even for a single nutritious meal. These experiences made us realize that small acts of kindness could make a meaningful difference.
            </p>
            <p className="why-created-card__p">
              At the same time, many people wanted to help but didn't know how or where to contribute with confidence. This inspired us to create Aadarsha Mitra Seva Sangham (AMSS)—a student-led initiative built on trust, transparency, and the belief that even small monthly contributions can change lives.
            </p>
            <p className="why-created-card__p">
              Today, AMSS works to support education, food assistance, medical aid, and community welfare. Guided by &ldquo;Daivam Maanushya Rupena,&rdquo; we continue our journey with one simple purpose: to connect compassionate people with those who need support and to create lasting change through collective service.
            </p>


          </div>
        </Container>
      </Section>



      {/* 5. WHAT MAKES AMSS DIFFERENT */}
      <Section id="why-different" variant="background">
        <Container>
          <SectionTitle 
            label="Our Unique Core" 
            title="What Makes AMSS Different" 
            center={true}
          />
          <div className="grid grid-3" style={{ display: 'grid', gap: 'var(--spacing-lg)', justifyContent: 'center', maxWidth: '1140px', margin: '0 auto' }}>
            {differences.map((diff) => {
              const IconComp = Icons[diff.icon] || Icons.HelpCircle;
              return (
                <div key={diff.id} className="card feature-card">
                  <IconComp className="feature-card__icon" size={32} aria-hidden="true" />
                  <h3 className="feature-card__title">{diff.title}</h3>
                  <p className="statistic-card__desc">{diff.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>



      {/* 7. MISSION & VISION */}
      <section id="mission-vision-detailed" className="mission-vision-section" aria-label="Mission and Vision">
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

      {/* 8. FOUNDER MESSAGE */}
      <section id="founder-message-full" className="founder-section" aria-label="A Message from Our Leadership">
        <div className="founder-section__bg-glow" aria-hidden="true" />
        <Container>
          <SectionTitle 
            label="Founder's Voice" 
            title="A Vision of Compassion" 
            center={true}
          />
          <div className="founder-grid">
            {/* Left Column: Portrait & Details */}
            <div className="founder-profile-col">
              <div className="founder-portrait-wrapper">
                <img 
                  src="/src/assets/images/placeholders/team_ravi.png" 
                  alt="Founder Arasavalli Ravi Kiran portrait" 
                  className="founder-portrait-img"
                  loading="lazy"
                />
              </div>
              <h3 className="founder-name">Arasavalli Ravi Kiran</h3>
              <span className="founder-designation">Founder &amp; Volunteer</span>
            </div>

            {/* Right Column: Premium Content Card */}
            <div className="founder-message-card">
              {/* <Icons.Quote size={40} className="founder-quote-icon" aria-hidden="true" /> */}
              
              <p className="founder-message-p">
                Aadarsha Mitra Seva Sangham (AMSS) is more than just an organization; it is a promise made by a group of school friends to stand by our community. When we started in 2022, we were just 10 to 15 classmates who wanted to make a difference. Guided by our teachers, Sri P. Pydiraju Sir and Sri K. Tirupathi Rao Sir, we pooled together our pocket savings. Today, that small pledge has grown into a structured mission of service.
              </p>

              <p className="founder-message-p">
                I personally follow the philosophy of &ldquo;Daivam Maanushya Rupena,&rdquo; believing that serving humanity is one of the purest ways to experience the presence of God. This belief inspires every initiative we undertake and reminds us that even the smallest act of kindness can transform someone's life.
              </p>



              <p className="founder-message-p">
                By bringing together small contributions from many warm hearts, we can create a lasting impact in someone's life. We are deeply grateful to our volunteers, supporters, and teachers who continue to guide us on this journey of compassion.
              </p>

              <p className="founder-message-p">
                Our vision is simple—to inspire more people to serve with kindness, integrity, and selflessness, proving that when compassionate hearts unite, even small efforts can create extraordinary change.
              </p>
            </div>
          </div>
        </Container>
      </section>





    </div>
  );
}

export default About;
