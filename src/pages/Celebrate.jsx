import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import Button from '../components/common/Button';

/* ─── Cause Cards Data ───────────────────────────────────── */
const causes = [
  {
    id: 'education',
    icon: <Icons.BookOpen size={28} aria-hidden="true" />,
    title: 'Education Support',
    desc: 'Help children access quality education through school kits, stationery, and scholarships.',
    color: '#2563EB',
    bg: '#EFF6FF',
  },
  {
    id: 'food',
    icon: <Icons.UtensilsCrossed size={28} aria-hidden="true" />,
    title: 'Food Distribution',
    desc: 'Provide nutritious meals to underprivileged families, children, and the elderly.',
    color: '#D97706',
    bg: '#FFFBEB',
  },
  {
    id: 'medical',
    icon: <Icons.HeartPulse size={28} aria-hidden="true" />,
    title: 'Medical Assistance',
    desc: 'Support individuals who cannot afford essential medical care and medicines.',
    color: '#DC2626',
    bg: '#FEF2F2',
  },
  {
    id: 'orphan',
    icon: <Icons.Baby size={28} aria-hidden="true" />,
    title: 'Support Orphan Children',
    desc: 'Give love and resources to orphan children who need a nurturing environment.',
    color: '#7C3AED',
    bg: '#F5F3FF',
  },
  {
    id: 'emergency',
    icon: <Icons.Siren size={28} aria-hidden="true" />,
    title: 'Emergency Relief',
    desc: 'Respond quickly to flood, fire, or disaster-affected communities with immediate aid.',
    color: '#EA580C',
    bg: '#FFF7ED',
  },
  {
    id: 'plantation',
    icon: <Icons.Leaf size={28} aria-hidden="true" />,
    title: 'Tree Plantation',
    desc: 'Contribute to a greener planet by funding tree plantation drives across the region.',
    color: '#16A34A',
    bg: '#F0FDF4',
  },
];

/* ─── Celebration Form ───────────────────────────────────── */
function CelebrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    city: '',
    eventType: '',
    occasionName: '',
    preferredActivities: [],
    expectedBudget: '',
    preferredDate: '',
    preferredTime: '',
    expectedPeople: '',
    willAttend: 'Yes',
    needSuggestions: 'No',
    specialInstructions: '',
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      if (modalRef.current) modalRef.current.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showModal]);

  const eventTypes = ['Birthday','Wedding','Anniversary','Memorial','Festival','House Warming','Retirement','Other'];
  const activities = ['Food Distribution','Education Support','School Kits','Blanket Distribution','Medical Support','Tree Plantation','Support for Orphan Children','Other'];
  const budgetOptions = ['Below ₹2,000','₹2,000–₹5,000','₹5,000–₹10,000','₹10,000–₹25,000','Above ₹25,000'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const handleCheckbox = (act) => {
    setFormData(p => {
      const sel = p.preferredActivities.includes(act)
        ? p.preferredActivities.filter(a => a !== act)
        : [...p.preferredActivities, act];
      if (errors.preferredActivities) setErrors(e => ({ ...e, preferredActivities: '' }));
      return { ...p, preferredActivities: sel };
    });
  };

  const validate = () => {
    const e = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) e.fullName = 'Full Name must be at least 3 characters';
    if (!/^[0-9]{10}$/.test(formData.mobileNumber.trim())) e.mobileNumber = 'Enter a valid 10-digit mobile number';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress.trim())) e.emailAddress = 'Enter a valid email address';
    if (!formData.city.trim()) e.city = 'City is required';
    if (!formData.eventType) e.eventType = 'Event Type is required';
    if (formData.preferredActivities.length === 0) e.preferredActivities = 'Select at least one activity';
    if (!formData.expectedBudget) e.expectedBudget = 'Budget is required';
    if (!formData.preferredDate) e.preferredDate = 'Date is required';
    if (!formData.preferredTime) e.preferredTime = 'Time is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowModal(true);
    } else {
      document.querySelector('.form-error-msg')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const buildMessage = () =>
    `🎉 Celebrate with a Cause Request — AMSS\n\n` +
    `Name: ${formData.fullName}\nMobile: ${formData.mobileNumber}\nEmail: ${formData.emailAddress}\nCity: ${formData.city}\n` +
    `Event: ${formData.eventType}${formData.occasionName ? ` (${formData.occasionName})` : ''}\n` +
    `Activities: ${formData.preferredActivities.join(', ')}\nBudget: ${formData.expectedBudget}\n` +
    `Date: ${formData.preferredDate} at ${formData.preferredTime}\nGuests: ${formData.expectedPeople || 'N/A'}\n` +
    `Will Attend: ${formData.willAttend}\nNeeds Suggestions: ${formData.needSuggestions}\n` +
    `Instructions: ${formData.specialInstructions || 'None'}`;

  const whatsappUrl = () => `https://wa.me/918096895929?text=${encodeURIComponent(buildMessage())}`;
  const emailUrl = () => `mailto:aadarshamitrasevasangham@gmail.com?subject=${encodeURIComponent('New Celebration Request — AMSS')}&body=${encodeURIComponent(buildMessage())}`;

  return (
    <>
      <form className="cwac-form-container" onSubmit={handleSubmit} noValidate id="celebration-form">
        {/* Section 1: Contact */}
        <div className="cwac-form-card">
          <div className="cwac-form-card__header">
            <span className="cwac-form-step">1</span>
            <h3 className="cwac-form-card__title">Contact Information</h3>
          </div>
          <div className="form-grid form-grid-2">
            <div className="form-field">
              <label className="form-label form-label--required" htmlFor="cel-fullName">Full Name</label>
              <input type="text" id="cel-fullName" name="fullName" className={`form-input ${errors.fullName ? 'form-input--error' : ''}`} value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" />
              {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
            </div>
            <div className="form-field">
              <label className="form-label form-label--required" htmlFor="cel-mobile">Mobile Number</label>
              <input type="tel" id="cel-mobile" name="mobileNumber" className={`form-input ${errors.mobileNumber ? 'form-input--error' : ''}`} value={formData.mobileNumber} onChange={handleChange} placeholder="10-digit number" />
              {errors.mobileNumber && <span className="form-error-msg">{errors.mobileNumber}</span>}
            </div>
            <div className="form-field">
              <label className="form-label form-label--required" htmlFor="cel-email">Email Address</label>
              <input type="email" id="cel-email" name="emailAddress" className={`form-input ${errors.emailAddress ? 'form-input--error' : ''}`} value={formData.emailAddress} onChange={handleChange} placeholder="your@email.com" />
              {errors.emailAddress && <span className="form-error-msg">{errors.emailAddress}</span>}
            </div>
            <div className="form-field">
              <label className="form-label form-label--required" htmlFor="cel-city">City</label>
              <input type="text" id="cel-city" name="city" className={`form-input ${errors.city ? 'form-input--error' : ''}`} value={formData.city} onChange={handleChange} placeholder="e.g. Hyderabad" />
              {errors.city && <span className="form-error-msg">{errors.city}</span>}
            </div>
          </div>
        </div>

        {/* Section 2: Occasion */}
        <div className="cwac-form-card">
          <div className="cwac-form-card__header">
            <span className="cwac-form-step">2</span>
            <h3 className="cwac-form-card__title">Occasion Details</h3>
          </div>
          <div className="form-grid form-grid-2">
            <div className="form-field">
              <label className="form-label form-label--required" htmlFor="cel-eventType">Event Type</label>
              <select id="cel-eventType" name="eventType" className={`form-select ${errors.eventType ? 'form-select--error' : ''}`} value={formData.eventType} onChange={handleChange}>
                <option value="">Select event type</option>
                {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.eventType && <span className="form-error-msg">{errors.eventType}</span>}
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="cel-occasionName">Special Occasion Name</label>
              <input type="text" id="cel-occasionName" name="occasionName" className="form-input" value={formData.occasionName} onChange={handleChange} placeholder="e.g. Ravi's 30th Birthday" />
            </div>
            <div className="form-field">
              <label className="form-label form-label--required" htmlFor="cel-date">Preferred Date</label>
              <input type="date" id="cel-date" name="preferredDate" className={`form-input ${errors.preferredDate ? 'form-input--error' : ''}`} value={formData.preferredDate} onChange={handleChange} />
              {errors.preferredDate && <span className="form-error-msg">{errors.preferredDate}</span>}
            </div>
            <div className="form-field">
              <label className="form-label form-label--required" htmlFor="cel-time">Preferred Time</label>
              <input type="time" id="cel-time" name="preferredTime" className={`form-input ${errors.preferredTime ? 'form-input--error' : ''}`} value={formData.preferredTime} onChange={handleChange} />
              {errors.preferredTime && <span className="form-error-msg">{errors.preferredTime}</span>}
            </div>
          </div>
        </div>

        {/* Section 3: Activity & Budget */}
        <div className="cwac-form-card">
          <div className="cwac-form-card__header">
            <span className="cwac-form-step">3</span>
            <h3 className="cwac-form-card__title">Activity &amp; Budget</h3>
          </div>
          <div className="form-field" style={{ marginBottom: 'var(--spacing-md)' }}>
            <span className="form-label form-label--required">Preferred Charity Activity</span>
            <div className="form-checkbox-grid" style={{ marginTop: '8px' }}>
              {activities.map(act => (
                <label key={act} className="form-checkbox-label">
                  <input type="checkbox" className="form-checkbox-input" checked={formData.preferredActivities.includes(act)} onChange={() => handleCheckbox(act)} />
                  <span>{act}</span>
                </label>
              ))}
            </div>
            {errors.preferredActivities && <span className="form-error-msg">{errors.preferredActivities}</span>}
          </div>
          <div className="form-grid form-grid-2">
            <div className="form-field">
              <label className="form-label form-label--required" htmlFor="cel-budget">Expected Budget</label>
              <select id="cel-budget" name="expectedBudget" className={`form-select ${errors.expectedBudget ? 'form-select--error' : ''}`} value={formData.expectedBudget} onChange={handleChange}>
                <option value="">Select budget range</option>
                {budgetOptions.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              {errors.expectedBudget && <span className="form-error-msg">{errors.expectedBudget}</span>}
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="cel-guests">Number of Guests Expected</label>
              <input type="number" id="cel-guests" name="expectedPeople" className="form-input" value={formData.expectedPeople} onChange={handleChange} placeholder="e.g. 25" min="1" />
            </div>
          </div>
          <div className="form-grid form-grid-2" style={{ marginTop: 'var(--spacing-md)' }}>
            <div className="form-field">
              <span className="form-label">Would you like to attend the activity?</span>
              <div className="form-radio-group">
                {['Yes','No'].map(v => (
                  <label key={v} className="form-radio-label">
                    <input type="radio" name="willAttend" value={v} checked={formData.willAttend === v} onChange={handleChange} className="form-radio-input" />
                    <span>{v}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="form-field">
              <span className="form-label">Need AMSS Activity Suggestions?</span>
              <div className="form-radio-group">
                {['Yes','No'].map(v => (
                  <label key={v} className="form-radio-label">
                    <input type="radio" name="needSuggestions" value={v} checked={formData.needSuggestions === v} onChange={handleChange} className="form-radio-input" />
                    <span>{v}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="form-field" style={{ marginTop: 'var(--spacing-md)' }}>
            <label className="form-label" htmlFor="cel-instructions">Special Instructions</label>
            <textarea id="cel-instructions" name="specialInstructions" className="form-textarea" value={formData.specialInstructions} onChange={handleChange} rows={4} placeholder="Custom banners, food preferences, target school, etc." />
          </div>
        </div>

        <div className="cwac-submit-bar">
          <button type="submit" className="cwac-submit-btn">
            <Icons.PartyPopper size={20} aria-hidden="true" />
            Submit Celebration Request
          </button>
        </div>
      </form>

      {/* Celebration Success Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)} role="dialog" aria-modal="true" aria-labelledby="cel-modal-title">
          <div className="modal-container" style={{ maxWidth: '580px' }} onClick={e => e.stopPropagation()}>
            <button ref={modalRef} type="button" className="modal-close-btn" onClick={() => setShowModal(false)} aria-label="Close dialog">
              <Icons.X size={18} />
            </button>
            <div className="modal-content" style={{ paddingTop: 'var(--spacing-xl)', textAlign: 'center' }}>
              <div style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-sm)', display: 'flex', justifyContent: 'center' }}>
                <Icons.CheckCircle size={56} aria-hidden="true" />
              </div>
              <h2 id="cel-modal-title" className="modal-title" style={{ marginBottom: 'var(--spacing-xs)' }}>Celebration Request Registered!</h2>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}>
                Thank you for turning your special day into a meaningful cause. Send your request via:
              </p>
              <div className="success-summary" style={{ marginBottom: 'var(--spacing-md)' }}>
                <div className="success-summary-item"><strong>Occasion:</strong> {formData.occasionName || formData.eventType}</div>
                <div className="success-summary-item"><strong>Activity:</strong> {formData.preferredActivities.join(', ')}</div>
                <div className="success-summary-item"><strong>Date:</strong> {formData.preferredDate} at {formData.preferredTime}</div>
                <div className="success-summary-item"><strong>Budget:</strong> {formData.expectedBudget}</div>
                <div className="success-summary-item"><strong>Name:</strong> {formData.fullName}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn--secondary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Icons.MessageSquare size={18} aria-hidden="true" /> Send via WhatsApp
                </a>
                <a href={emailUrl()} className="btn btn--outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Icons.Mail size={18} aria-hidden="true" /> Send via Email
                </a>
              </div>
              <div style={{ marginTop: 'var(--spacing-sm)' }}>
                <Button type="button" variant="text" size="sm" onClick={() => setShowModal(false)}>Close &amp; Edit Form</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Sponsor Form ───────────────────────────────────────── */
function SponsorForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    occupation: '',
    causeInterested: '',
    budgetRange: '',
    contactMethod: 'WhatsApp',
    anonymous: 'No',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      if (modalRef.current) modalRef.current.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showModal]);

  const causeOptions = causes.map(c => c.title);
  const budgetOptions = ['Below ₹1,000','₹1,000–₹5,000','₹5,000–₹10,000','₹10,000–₹25,000','Above ₹25,000'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) e.fullName = 'Full Name must be at least 3 characters';
    if (!/^[0-9]{10}$/.test(formData.phone.trim())) e.phone = 'Enter a valid 10-digit mobile number';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) e.email = 'Enter a valid email address';
    if (!formData.city.trim()) e.city = 'City is required';
    if (!formData.causeInterested) e.causeInterested = 'Please select a cause';
    if (!formData.budgetRange) e.budgetRange = 'Budget is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowModal(true);
    } else {
      document.querySelector('#sponsor-form .form-error-msg')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const buildMessage = () =>
    `❤️ Sponsor a Cause Request — AMSS\n\n` +
    `Name: ${formData.anonymous === 'Yes' ? 'Anonymous' : formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n` +
    `City: ${formData.city}\nOccupation: ${formData.occupation || 'N/A'}\nCause: ${formData.causeInterested}\n` +
    `Budget: ${formData.budgetRange}\nPreferred Contact: ${formData.contactMethod}\nAnonymous: ${formData.anonymous}\n` +
    `Message: ${formData.message || 'None'}`;

  const whatsappUrl = () => `https://wa.me/918096895929?text=${encodeURIComponent(buildMessage())}`;
  const emailUrl = () => `mailto:aadarshamitrasevasangham@gmail.com?subject=${encodeURIComponent('New Sponsor Request — AMSS')}&body=${encodeURIComponent(buildMessage())}`;

  return (
    <>
      <form className="cwac-form-container" onSubmit={handleSubmit} noValidate id="sponsor-form">
        <div className="cwac-form-card">
          <div className="cwac-form-card__header">
            <span className="cwac-form-step cwac-form-step--red">1</span>
            <h3 className="cwac-form-card__title">Your Details</h3>
          </div>
          <div className="form-grid form-grid-2">
            <div className="form-field">
              <label className="form-label form-label--required" htmlFor="sp-name">Full Name</label>
              <input type="text" id="sp-name" name="fullName" className={`form-input ${errors.fullName ? 'form-input--error' : ''}`} value={formData.fullName} onChange={handleChange} placeholder="Your full name" />
              {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
            </div>
            <div className="form-field">
              <label className="form-label form-label--required" htmlFor="sp-phone">Phone Number</label>
              <input type="tel" id="sp-phone" name="phone" className={`form-input ${errors.phone ? 'form-input--error' : ''}`} value={formData.phone} onChange={handleChange} placeholder="10-digit number" />
              {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
            </div>
            <div className="form-field">
              <label className="form-label form-label--required" htmlFor="sp-email">Email Address</label>
              <input type="email" id="sp-email" name="email" className={`form-input ${errors.email ? 'form-input--error' : ''}`} value={formData.email} onChange={handleChange} placeholder="your@email.com" />
              {errors.email && <span className="form-error-msg">{errors.email}</span>}
            </div>
            <div className="form-field">
              <label className="form-label form-label--required" htmlFor="sp-city">City</label>
              <input type="text" id="sp-city" name="city" className={`form-input ${errors.city ? 'form-input--error' : ''}`} value={formData.city} onChange={handleChange} placeholder="e.g. Visakhapatnam" />
              {errors.city && <span className="form-error-msg">{errors.city}</span>}
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="sp-occupation">Occupation</label>
              <input type="text" id="sp-occupation" name="occupation" className="form-input" value={formData.occupation} onChange={handleChange} placeholder="e.g. Software Engineer" />
            </div>
          </div>
        </div>

        <div className="cwac-form-card">
          <div className="cwac-form-card__header">
            <span className="cwac-form-step cwac-form-step--red">2</span>
            <h3 className="cwac-form-card__title">Sponsorship Preferences</h3>
          </div>
          <div className="form-grid form-grid-2">
            <div className="form-field">
              <label className="form-label form-label--required" htmlFor="sp-cause">Cause Interested In</label>
              <select id="sp-cause" name="causeInterested" className={`form-select ${errors.causeInterested ? 'form-select--error' : ''}`} value={formData.causeInterested} onChange={handleChange}>
                <option value="">Select a cause</option>
                {causeOptions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.causeInterested && <span className="form-error-msg">{errors.causeInterested}</span>}
            </div>
            <div className="form-field">
              <label className="form-label form-label--required" htmlFor="sp-budget">Budget Range</label>
              <select id="sp-budget" name="budgetRange" className={`form-select ${errors.budgetRange ? 'form-select--error' : ''}`} value={formData.budgetRange} onChange={handleChange}>
                <option value="">Select budget</option>
                {budgetOptions.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              {errors.budgetRange && <span className="form-error-msg">{errors.budgetRange}</span>}
            </div>
          </div>
          <div className="form-grid form-grid-2" style={{ marginTop: 'var(--spacing-md)' }}>
            <div className="form-field">
              <span className="form-label">Preferred Contact Method</span>
              <div className="form-radio-group">
                {['Phone','WhatsApp','Email'].map(v => (
                  <label key={v} className="form-radio-label">
                    <input type="radio" name="contactMethod" value={v} checked={formData.contactMethod === v} onChange={handleChange} className="form-radio-input" />
                    <span>{v}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="form-field">
              <span className="form-label">Anonymous Donation?</span>
              <div className="form-radio-group">
                {['Yes','No'].map(v => (
                  <label key={v} className="form-radio-label">
                    <input type="radio" name="anonymous" value={v} checked={formData.anonymous === v} onChange={handleChange} className="form-radio-input" />
                    <span>{v}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="form-field" style={{ marginTop: 'var(--spacing-md)' }}>
            <label className="form-label" htmlFor="sp-message">Additional Message</label>
            <textarea id="sp-message" name="message" className="form-textarea" value={formData.message} onChange={handleChange} rows={4} placeholder="Anything you'd like us to know..." />
          </div>
        </div>

        <div className="cwac-submit-bar">
          <button type="submit" className="cwac-submit-btn cwac-submit-btn--red">
            <Icons.Heart size={20} aria-hidden="true" />
            Submit Sponsorship Request
          </button>
        </div>
      </form>

      {/* Sponsor Success Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)} role="dialog" aria-modal="true" aria-labelledby="sp-modal-title">
          <div className="modal-container" style={{ maxWidth: '580px' }} onClick={e => e.stopPropagation()}>
            <button ref={modalRef} type="button" className="modal-close-btn" onClick={() => setShowModal(false)} aria-label="Close dialog">
              <Icons.X size={18} />
            </button>
            <div className="modal-content" style={{ paddingTop: 'var(--spacing-xl)', textAlign: 'center' }}>
              <div style={{ color: '#DC2626', marginBottom: 'var(--spacing-sm)', display: 'flex', justifyContent: 'center' }}>
                <Icons.HeartHandshake size={56} aria-hidden="true" />
              </div>
              <h2 id="sp-modal-title" className="modal-title" style={{ marginBottom: 'var(--spacing-xs)' }}>Sponsorship Request Received!</h2>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}>
                Thank you for choosing to make a difference. Send your request to us via:
              </p>
              <div className="success-summary" style={{ marginBottom: 'var(--spacing-md)' }}>
                <div className="success-summary-item"><strong>Cause:</strong> {formData.causeInterested}</div>
                <div className="success-summary-item"><strong>Budget:</strong> {formData.budgetRange}</div>
                <div className="success-summary-item"><strong>Contact via:</strong> {formData.contactMethod}</div>
                <div className="success-summary-item"><strong>Name:</strong> {formData.anonymous === 'Yes' ? 'Anonymous' : formData.fullName}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn--secondary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Icons.MessageSquare size={18} aria-hidden="true" /> Send via WhatsApp
                </a>
                <a href={emailUrl()} className="btn btn--outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Icons.Mail size={18} aria-hidden="true" /> Send via Email
                </a>
              </div>
              <div style={{ marginTop: 'var(--spacing-sm)' }}>
                <Button type="button" variant="text" size="sm" onClick={() => setShowModal(false)}>Close &amp; Edit Form</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Main Page ──────────────────────────────────────────── */
function Celebrate() {
  const [activeOption, setActiveOption] = useState(null); // Initially hidden
  const chooseSectionRef = useRef(null);
  const formSectionRef = useRef(null);

  useEffect(() => {
    document.title = 'Celebrate with a Cause | Aadarsha Mitra Seva Sangham (AMSS)';
  }, []);

  const handleSelectOption = (option) => {
    if (activeOption === option) {
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setActiveOption(option);
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const handleBackToOptions = () => {
    chooseSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      setActiveOption(null);
    }, 350);
  };

  return (
    <div className="cwac-page">

      {/* ── SECTION 1: Hero ─────────────────────────────── */}
      <section
        className="cwac-hero"
        style={{ backgroundImage: `linear-gradient(rgba(15,61,46,0.78), rgba(15,61,46,0.90)), url(/celebrate-hero.jpg)` }}
        aria-label="Celebrate with a Cause hero"
      >
        <Container>
          <div className="cwac-hero__inner">
            <span className="hero__label">Celebrate with a Cause</span>
            <h1 className="cwac-hero__heading">
              Turn Special Moments into<br />
              <span className="cwac-hero__heading--gold">Meaningful Impact</span>
            </h1>
            <p className="cwac-hero__sub">
              Whether you're celebrating a birthday, anniversary, wedding, memorial, or simply want to support a cause, AMSS is here to help you make a difference that truly matters.
            </p>
          </div>
        </Container>
      </section>

      {/* ── SECTION 2: Choose How You Want to Help ──────── */}
      <Section id="cwac-choose" variant="light">
        <div ref={chooseSectionRef} style={{ scrollMarginTop: '90px' }}>
          <Container>
            <div className="cwac-section-header">
              <div className="cwac-section-badge cwac-section-badge--green">
                <Icons.Sparkles size={16} aria-hidden="true" />
                Make a Difference
              </div>
              <h2 className="cwac-section-heading">Choose How You Want to Help</h2>
              <p className="cwac-section-desc">
                Every contribution creates hope. Select the option that best matches how you'd like to support our mission.
              </p>
            </div>

            <div className="cwac-choice-grid">
              {/* Card 1: Celebrate */}
              <div className={`cwac-choice-card ${activeOption === 'celebration' ? 'cwac-choice-card--active' : ''}`}>
                <div className="cwac-choice-card__image-wrap">
                  <img
                    src="/images/celebrate_card_illustration.png"
                    alt="Celebrate Your Special Day illustration"
                    className="cwac-choice-card__image"
                  />
                </div>
                <div className="cwac-choice-card__body">
                  <h3 className="cwac-choice-card__title">🎉 Celebrate Your Special Day</h3>
                  <p className="cwac-choice-card__desc">
                    Turn your birthday, anniversary, wedding, festival, memorial, graduation, or any special occasion into a meaningful act of kindness by organizing a charity activity with AMSS.
                  </p>
                  <button
                    type="button"
                    className="cwac-choice-card__btn cwac-choice-card__btn--green"
                    onClick={() => handleSelectOption('celebration')}
                  >
                    Plan My Celebration
                    <Icons.ArrowRight size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Card 2: Donor */}
              <div className={`cwac-choice-card ${activeOption === 'donor' ? 'cwac-choice-card--active' : ''}`}>
                <div className="cwac-choice-card__image-wrap">
                  <img
                    src="/images/donor_card_illustration.png"
                    alt="Become an AMSS Donor illustration"
                    className="cwac-choice-card__image"
                  />
                </div>
                <div className="cwac-choice-card__body">
                  <h3 className="cwac-choice-card__title">❤️ Become an AMSS Donor</h3>
                  <p className="cwac-choice-card__desc">
                    Support education, food distribution, medical assistance, emergency relief, orphan care, tree plantation, and other community initiatives through your generous contribution.
                  </p>
                  <button
                    type="button"
                    className="cwac-choice-card__btn cwac-choice-card__btn--red"
                    onClick={() => handleSelectOption('donor')}
                  >
                    Become a Donor
                    <Icons.ArrowRight size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Section>

      {/* ── SECTION 3: Dynamic Form Container ──────────────────── */}
      {activeOption !== null && (
        <Section id="cwac-form-section" variant="default">
          <div ref={formSectionRef} style={{ scrollMarginTop: '90px' }}>
            <Container>
              <div className="cwac-main-form-wrapper cwac-form-container--reveal">
                {/* Back to Options Link */}
                <div className="cwac-back-bar">
                  <button type="button" className="cwac-back-btn" onClick={handleBackToOptions}>
                    <Icons.ArrowLeft size={16} aria-hidden="true" />
                    Back to Options
                  </button>
                </div>

                {/* Option Switcher Tabs */}
                <div className="cwac-form-header-tabs" role="tablist" aria-label="Select form option">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeOption === 'celebration'}
                    className={`cwac-form-tab ${activeOption === 'celebration' ? 'cwac-form-tab--active-green' : ''}`}
                    onClick={() => handleSelectOption('celebration')}
                  >
                    🎉 Plan Your Celebration
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeOption === 'donor'}
                    className={`cwac-form-tab ${activeOption === 'donor' ? 'cwac-form-tab--active-red' : ''}`}
                    onClick={() => handleSelectOption('donor')}
                  >
                    ❤️ Become an AMSS Donor
                  </button>
                </div>

                {/* Header Above Selected Form */}
                <div className="cwac-selected-form-header">
                  {activeOption === 'celebration' ? (
                    <>
                      <div className="cwac-section-badge cwac-section-badge--green">
                        <Icons.PartyPopper size={16} aria-hidden="true" />
                        Plan Your Celebration
                      </div>
                      <h2 className="cwac-form-container-title">🎉 Plan Your Celebration</h2>
                      <p className="cwac-form-container-subtitle">
                        Fill in the details below and our team will help you organize a meaningful charity activity on your special occasion.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="cwac-section-badge cwac-section-badge--red">
                        <Icons.Heart size={16} aria-hidden="true" />
                        Become an AMSS Donor
                      </div>
                      <h2 className="cwac-form-container-title">❤️ Become an AMSS Donor</h2>
                      <p className="cwac-form-container-subtitle">
                        Every contribution creates hope. Select a cause and share your details below to support our ongoing community welfare initiatives.
                      </p>
                    </>
                  )}
                </div>

                {/* Celebration Form */}
                {activeOption === 'celebration' && (
                  <CelebrationForm />
                )}

                {/* Sponsorship / Donor Form */}
                {activeOption === 'donor' && (
                  <div className="cwac-sponsor-wrapper">
                    {/* Cause Cards */}
                    <div className="cwac-cause-section-block">
                      <h3 className="cwac-cause-subheading">Causes You Can Support</h3>
                      <div className="cwac-cause-grid">
                        {causes.map(cause => (
                          <div key={cause.id} className="cwac-cause-card" style={{ '--cause-color': cause.color, '--cause-bg': cause.bg }}>
                            <div className="cwac-cause-card__icon" style={{ background: cause.bg, color: cause.color }}>
                              {cause.icon}
                            </div>
                            <h3 className="cwac-cause-card__title">{cause.title}</h3>
                            <p className="cwac-cause-card__desc">{cause.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="cwac-form-divider">
                      <span>Fill in your sponsorship details below</span>
                    </div>

                    <SponsorForm />
                  </div>
                )}
              </div>
            </Container>
          </div>
        </Section>
      )}
    </div>
  );
}

export default Celebrate;
