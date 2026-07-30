import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import WhatsAppIcon from '../components/common/WhatsAppIcon';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import SectionTitle from '../components/common/SectionTitle';

function Contact() {
  useEffect(() => {
    document.title = 'Contact Us | Aadarsha Mitra Seva Sangham (AMSS)';
  }, []);

  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 'faq-1',
      question: 'How can I become a volunteer?',
      answer: 'To join our team of volunteers, simply contact us via WhatsApp, call us directly, or send us an email. We welcome school students, college youths, and working professionals who believe in grassroots community service. There are no fees or requirements to join.'
    },
    {
      id: 'faq-2',
      question: 'How can I support AMSS?',
      answer: 'You can support AMSS by volunteering your time on weekends, organizing school drives, or contributing a small monthly saving (like ₹50 or ₹100). These pooled contributions directly fund books, nutritional meals, and plantation saplings.'
    },
    {
      id: 'faq-3',
      question: 'How are donations used?',
      answer: 'We maintain absolute transparency. 100% of all contributions are spent directly on purchasing student school kits (notebooks, bags, pens), fresh nutritional ingredients for slum meals, and tree guards. Detailed expense sheets are kept open for community review.'
    },
    {
      id: 'faq-4',
      question: 'Can students volunteer?',
      answer: 'Absolutely! AMSS was founded in 2022 by a group of schoolmates from AMMS School. We believe students are the ultimate catalysts for change. You can tutor children, help manage donation distribution tables, or participate in environmental drives.'
    }
  ];

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  return (
    <div className="contact-page-wrapper">
      {/* 1. HERO HEADER */}
      <section
        className="hero contact-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(27, 94, 60, 0.8), rgba(27, 94, 60, 0.95)), url(/src/assets/images/placeholders/hero.png)`,
        }}
        aria-label="Contact Page Banner"
      >
        <Container>
          <div className="hero__container">
            <span className="hero__label">Contact Us</span>
            <h1 className="hero__heading">We'd Love to Hear From You</h1>
            <p className="hero__paragraph">
              Whether you want to volunteer, support our mission, or simply learn more about AMSS, we're always happy to connect with you.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. CONTACT INFORMATION CARDS */}
      <Section id="contact-info-cards" variant="light" className="contact-section-tight">
        <Container>
          <SectionTitle label="Get in Touch" title="Direct Contact Methods" center={true} />
          <div className="contact-preview-grid" style={{ display: 'grid', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-md)' }}>
            {/* Phone */}
            <div className="card contact-card flex flex-column">
              <Icons.Phone className="contact-card__icon" size={30} aria-hidden="true" />
              <h3 className="contact-card__title">Call Us</h3>
              <a href="tel:+918096895929" className="contact-card__detail" style={{ fontSize: 'var(--font-size-md)', fontWeight: '600' }}>
                +91 80968 95929
              </a>
              <span className="statistic-card__desc">Available Monday - Saturday</span>
            </div>

            {/* Email */}
            <div className="card contact-card flex flex-column">
              <Icons.Mail className="contact-card__icon" size={30} aria-hidden="true" />
              <h3 className="contact-card__title">Email Us</h3>
              <a href="mailto:aadarshamitrasevasangham@gmail.com" className="contact-card__detail" style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600', wordBreak: 'break-all' }}>
                aadarshamitrasevasangham@gmail.com
              </a>
              <span className="statistic-card__desc">Get a response within 24 hours</span>
            </div>

            {/* WhatsApp */}
            <div className="card contact-card flex flex-column">
              <WhatsAppIcon className="contact-card__icon" size={30} aria-hidden="true" />
              <h3 className="contact-card__title">WhatsApp Chat</h3>
              <a href="https://wa.me/918096895929" target="_blank" rel="noopener noreferrer" className="contact-card__detail" style={{ fontSize: 'var(--font-size-md)', fontWeight: '600' }}>
                +91 80968 95929
              </a>
              <span className="statistic-card__desc">Instant chat connection</span>
            </div>
          </div>

          {/* 3. QUICK ACTIONS BAR */}
          <div className="stack stack-sm" style={{ marginTop: 'var(--spacing-xl)' }}>
            <h3 style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontWeight: 700, marginBottom: 'var(--spacing-md)' }}>
              Quick Interaction Buttons
            </h3>
            <div className="quick-actions-grid">
              <a href="tel:+918096895929" className="btn btn--primary quick-action-btn">
                <Icons.Phone size={18} aria-hidden="true" />
                Call Now
              </a>
              <a href="https://wa.me/918096895929" target="_blank" rel="noopener noreferrer" className="btn btn--secondary quick-action-btn">
                <WhatsAppIcon size={18} aria-hidden="true" />
                Open WhatsApp
              </a>
              <a href="mailto:aadarshamitrasevasangham@gmail.com" className="btn btn--outline quick-action-btn">
                <Icons.Mail size={18} aria-hidden="true" />
                Send Email
              </a>
              <a href="https://www.instagram.com/adarsha_mitra_seva_samstha/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="btn btn--outline quick-action-btn">
                <Icons.Instagram size={18} aria-hidden="true" />
                Visit Instagram
              </a>
            </div>
          </div>
        </Container>
      </Section>



      {/* 5. FAQ ACCORDION SECTION */}
      <Section id="frequently-asked-questions" variant="light">
        <Container>
          <SectionTitle label="Common Queries" title="Frequently Asked Questions" center={true} />
          <div className="accordion-wrapper">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.id} className="accordion-item">
                  <button
                    type="button"
                    className="accordion-header"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{faq.question}</span>
                    <Icons.ChevronDown
                      className={`accordion-icon ${isOpen ? 'accordion-icon--open' : ''}`}
                      size={18}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className={`accordion-collapse ${isOpen ? 'accordion-collapse--open' : ''}`}
                    role="region"
                    aria-labelledby={`faq-header-${index}`}
                  >
                    <div className="accordion-body">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 8. BECOME AN AMSS DONOR CARD */}
      <Section id="become-donor-info" variant="light" style={{ paddingTop: '0px', paddingBottom: '20px' }}>
        <Container>
          <div className="amss-info-card" style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-md)', padding: '32px 24px' }} aria-label="Become an AMSS Donor">
            <div className="amss-info-card__header" style={{ justifyContent: 'center' }}>
              <Icons.Heart size={28} className="amss-info-card__icon" aria-hidden="true" />
              <h3 className="amss-info-card__title amss-donor-title">Become an AMSS Donor</h3>
            </div>
            <p className="amss-info-card__body" style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-sm)' }}>
              Your contribution helps us continue supporting children, families, and communities.
            </p>
            <a 
              href="https://forms.gle/YGxxfrNZX4rSv8hE9" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn--primary"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '180px', height: '48px', borderRadius: '999px', fontWeight: '700', textDecoration: 'none' }}
            >
              Join as Donor
            </a>
          </div>
        </Container>
      </Section>

      {/* 7. CALL TO ACTION SECTION */}
      
    </div>
  );
}

export default Contact;
