import React, { useEffect } from 'react';
import teamData from '../data/team.json';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import SectionTitle from '../components/common/SectionTitle';
import TeamCard from '../components/common/TeamCard';

function Team() {
  useEffect(() => {
    document.title = 'Meet Our Team | Aadarsha Mitra Seva Sangham (AMSS)';
  }, []);

  return (
    <div className="team-page-wrapper">
      {/* ── 1. PAGE HERO ───────────────────────────────────────────── */}
      <section className="team-hero" aria-label="Meet Our Team Hero">
        <img 
          src="/images/team_hero_banner.png" 
          alt="AMSS volunteer team serving the community" 
          className="team-hero__bg-img" 
        />
        <div className="team-hero__overlay" aria-hidden="true" />
        <div className="team-hero__particles" aria-hidden="true" />
        <Container>
          <div className="team-hero__content">
            <span className="team-hero__label">OUR TEAM</span>
            <h1 className="team-hero__heading">The Hearts Behind Every Act of Kindness</h1>
            <p className="team-hero__subtitle">
              Every initiative at AMSS is made possible by passionate volunteers who dedicate their time, effort, and compassion to serving the community.
            </p>
          </div>
        </Container>
      </section>

      {/* ── 2. SINGLE UNIFIED TEAM SECTION ─────────────────────────── */}
      <Section id="our-volunteers-section" variant="light">
        <Container>
          <SectionTitle 
            title="Meet Our Volunteers" 
            subtitle="Together, we believe that every act of kindness creates a stronger and more compassionate society."
            center={true}
          />

          {/* Unified Responsive Grid (4 Desktop / 3 Laptop / 2 Tablet / 1 Mobile) */}
          <div className="reusable-team-grid">
            {teamData.map((member) => (
              <TeamCard 
                key={member.id} 
                {...member} 
              />
            ))}
          </div>
        </Container>
      </Section>


    </div>
  );
}

export default Team;
