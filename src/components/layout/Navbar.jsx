import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import siteData from '../../data/site.json';
import Container from '../common/Container';
import { logoImg } from '../../assets/images';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Monitor page scroll height to toggle sticky navbar classes and shadow triggers
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock document body scroll while mobile menu drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Dismiss mobile menu drawer when ESC is clicked on keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Activities', path: '/activities' },
    { name: 'Our Team', path: '/team' },
    { name: 'Celebrate with a Cause', path: '/celebrate' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`.trim()}>
      <Container>
        <nav className="navbar" aria-label="Main Navigation">
          {/* Brand Logo & Name */}
          <NavLink to="/" className="navbar__brand" aria-label={`${siteData.name} Home`}>
            <img 
              src={logoImg} 
              alt={siteData.name} 
              width="48" 
              height="48" 
              className="navbar__logo-img" 
            />
            <div className="navbar__brand-text flex flex-column">
              <span className="navbar__brand-title">{siteData.acronym}</span>
              <span className="navbar__brand-subtitle">Aadarsha Mitra Seva Sangham</span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <ul className="navbar__nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? 'navbar__nav-link navbar__nav-link--active' : 'navbar__nav-link'
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Side CTA Button & Hamburger */}
          <div className="navbar__right">
            {/* Desktop Join Us CTA */}
            <a href="https://forms.gle/YGxxfrNZX4rSv8hE9" target="_blank" rel="noopener noreferrer" className="btn-join-us">
              Join as Donor
            </a>

            {/* Mobile Hamburger toggle button */}
            <button
              type="button"
              className="navbar__toggle"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Overlay Mask */}
          <div
            className={`navbar__mobile-overlay ${isOpen ? 'navbar__mobile-overlay--visible' : ''}`}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Sliding Navigation Menu Drawer */}
          <div
            id="mobile-navigation"
            className={`navbar__mobile-menu ${isOpen ? 'navbar__mobile-menu--open' : ''}`}
          >
            <ul className="navbar__mobile-list">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive ? 'navbar__mobile-link navbar__mobile-link--active' : 'navbar__mobile-link'
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Mobile Join Us CTA */}
            <div className="navbar__mobile-cta">
              <a href="https://forms.gle/YGxxfrNZX4rSv8hE9" target="_blank" rel="noopener noreferrer" className="btn-join-us w-full text-center block">
                Join as Donor
              </a>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;
