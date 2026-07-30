import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, Mail,
  Instagram, Facebook, Linkedin, Youtube,
  ChevronRight, Heart, UserPlus
} from 'lucide-react';
import WhatsAppIcon from '../common/WhatsAppIcon';
import siteData from '../../data/site.json';
import Container from '../common/Container';

const quickLinks = [
  { label: 'Home',                   to: '/'          },
  { label: 'About',                  to: '/about'     },
  { label: 'Celebrate with a Cause', to: '/celebrate' },
  { label: 'Contact',                to: '/contact'   },
];

const socialLinks = [
  { platform: 'Instagram', url: 'https://www.instagram.com/adarsha_mitra_seva_samstha/?utm_source=ig_web_button_share_sheet', icon: Instagram },
  { platform: 'Facebook',  url: 'https://facebook.com',  icon: Facebook  },
  { platform: 'LinkedIn',  url: 'https://linkedin.com',  icon: Linkedin  },
  { platform: 'YouTube',   url: 'https://youtube.com',   icon: Youtube   },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ft" aria-label="Site Footer">
      {/* Decorative top curve */}
      <div className="ft__curve" aria-hidden="true" />

      <div className="ft__body">
        <Container>
          {/* ══════════════════ 4-COLUMN MAIN GRID ══════════════════ */}
          <div className="ft__grid">

            {/* ── COLUMN 1 · BRAND ──────────────────────────── */}
            <div className="ft__col ft__col--brand">
              <div className="ft__brand-header">
                <img
                  src={siteData.logoPath}
                  alt="AMSS Logo"
                  width="44"
                  height="44"
                  className="ft__logo-img"
                  onError={e => { e.currentTarget.src = '/src/assets/images/logo/logo.png'; }}
                />
                <div className="ft__brand-text">
                  <h3 className="ft__brand-name">{siteData.acronym}</h3>
                  <p className="ft__brand-full">Aadarsha Mitra Seva Sangham</p>
                </div>
              </div>

              <p className="ft__brand-desc">
                "Student-led NGO creating positive change through education, compassion, and community service since 2022."
              </p>

              {/* Follow Us (Desktop & Tablet placement under brand description) */}
              <div className="ft__social-box ft__social-box--desktop">
                <h4 className="ft__col-heading" style={{ borderBottom: 'none', marginBottom: '6px', fontSize: '13px' }}>Follow Us</h4>
                <div className="ft__social-row" role="list" aria-label="Social media links">
                  {socialLinks.map(s => {
                    const IconComp = s.icon;
                    return (
                      <a
                        key={s.platform}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ft__social-btn"
                        aria-label={`Follow AMSS on ${s.platform}`}
                        title={s.platform}
                      >
                        <IconComp size={16} aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Mobile Side-by-Side Wrapper for Quick Links & Contact ── */}
            <div className="ft__mobile-row">
              {/* ── COLUMN 2 · QUICK LINKS ─────────────────────── */}
              <div className="ft__col ft__col--links">
                <h4 className="ft__col-heading">Quick Links</h4>
                <ul className="ft__link-list" role="list">
                  {quickLinks.map(lnk => (
                    <li key={lnk.to}>
                      <Link to={lnk.to} className="ft__nav-link">
                        <ChevronRight size={14} className="ft__link-arrow" aria-hidden="true" />
                        <span>{lnk.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── COLUMN 3 · CONTACT ─────────────────────────── */}
              <div className="ft__col ft__col--contact">
                <h4 className="ft__col-heading">Contact</h4>
                <ul className="ft__contact-list" role="list">
                  <li>
                    <a href="tel:+918096895929" className="ft__contact-card" aria-label="Call +91 80968 95929">
                      <div className="ft__contact-icon" aria-hidden="true"><Phone size={15} /></div>
                      <span>+91 80968 95929</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:aadarshamitrasevasangham@gmail.com" className="ft__contact-card" aria-label="Email aadarshamitrasevasangham@gmail.com">
                      <div className="ft__contact-icon" aria-hidden="true"><Mail size={15} /></div>
                      <span className="ft__contact-email">aadarshamitrasevasangham@gmail.com</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/918096895929" target="_blank" rel="noopener noreferrer" className="ft__contact-card" aria-label="WhatsApp Chat">
                      <div className="ft__contact-icon" aria-hidden="true"><WhatsAppIcon size={15} /></div>
                      <span>WhatsApp Chat</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* ── COLUMN 4 · GET INVOLVED & FOLLOW US (MOBILE) ─── */}
            <div className="ft__col ft__col--action">
              {/* Get Involved */}
              <div className="ft__involved-box">
                <h4 className="ft__col-heading ft__involved-heading">Get Involved</h4>
                <p className="ft__involved-desc">
                  "Together, we can create hope through every act of kindness."
                </p>
                <div className="ft__involved-btns">
                  <a 
                    href="https://forms.gle/2T2tABrXn6jsVCZN6" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ft__btn ft__btn--primary" 
                    aria-label="Become a Volunteer (opens in a new tab)"
                  >
                    <UserPlus size={14} aria-hidden="true" />
                    <span>Become a Volunteer</span>
                  </a>

                  <a 
                    href="https://forms.gle/YGxxfrNZX4rSv8hE9" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ft__btn ft__btn--secondary"
                    aria-label="Join as a Donor (opens in a new tab)"
                  >
                    <Heart size={14} aria-hidden="true" />
                    <span>Join as a Donor</span>
                  </a>
                </div>
              </div>

              {/* Follow Us (Mobile placement under Join as a Donor) */}
              <div className="ft__social-box ft__social-box--mobile">
                <h4 className="ft__col-heading" style={{ borderBottom: 'none', marginBottom: '6px', fontSize: '13px' }}>Follow Us</h4>
                <div className="ft__social-row" role="list" aria-label="Social media links">
                  {socialLinks.map(s => {
                    const IconComp = s.icon;
                    return (
                      <a
                        key={s.platform}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ft__social-btn"
                        aria-label={`Follow AMSS on ${s.platform}`}
                        title={s.platform}
                      >
                        <IconComp size={16} aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* ── BOTTOM FOOTER BAR ────────────────────────────── */}
          <div className="ft__bottom" role="contentinfo">
            <div className="ft__bottom-divider" aria-hidden="true" />
            <div className="ft__bottom-inner">
              <p className="ft__copyright">
                &copy; {year} Aadarsha Mitra Seva Sangham (AMSS)
              </p>
              <p className="ft__credit">
                Made with ❤️ to Serve Humanity
              </p>
            </div>
          </div>

        </Container>
      </div>
    </footer>
  );
}

export default Footer;
