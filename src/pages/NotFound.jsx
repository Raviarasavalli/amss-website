import React, { useEffect } from 'react';
import * as Icons from 'lucide-react';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import Button from '../components/common/Button';

function NotFound() {
  useEffect(() => {
    document.title = '404 - Page Not Found | AMSS';
  }, []);

  return (
    <div className="page-not-found" id="page-not-found" style={{ paddingTop: 'var(--header-height)' }}>
      <Section variant="light" style={{ paddingMinHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <Container>
          <div className="flex flex-column flex-center" style={{ textAlign: 'center', gap: 'var(--spacing-md)', maxWidth: '600px', margin: '0 auto' }}>
            <Icons.Compass size={64} style={{ color: 'var(--color-secondary)', opacity: 0.8, animation: 'spin 10s infinite linear' }} aria-hidden="true" />
            <h1 style={{ fontSize: 'var(--font-size-display)', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>404</h1>
            <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, margin: 0 }}>Oops! Page Not Found</h2>
            <p className="statistic-card__desc" style={{ fontSize: 'var(--font-size-md)' }}>
              The page you are looking for does not exist, has been removed, or has had its name changed. You can navigate back to safety below.
            </p>
            <div className="flex flex-center" style={{ gap: 'var(--spacing-md)', marginTop: 'var(--spacing-sm)' }}>
              <Button to="/" variant="primary" size="md">
                Go to Homepage
              </Button>
              <Button to="/contact" variant="outline" size="md">
                Contact Support
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

export default NotFound;
