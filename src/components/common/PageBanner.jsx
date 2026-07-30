import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Container from './Container';

function PageBanner({ title, description, breadcrumbs = [] }) {
  return (
    <div className="page-banner">
      <Container>
        <div className="page-banner__wrapper stack stack-xs">
          <h1 className="page-banner__title">{title}</h1>
          {description && <p className="page-banner__desc">{description}</p>}
          {breadcrumbs.length > 0 && (
            <nav className="page-banner__breadcrumbs" aria-label="Breadcrumb">
              <ol className="page-banner__breadcrumbs-list">
                <li className="page-banner__breadcrumb-item">
                  <Link to="/" className="page-banner__breadcrumb-link">
                    Home
                  </Link>
                </li>
                {breadcrumbs.map((crumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  return (
                    <li key={index} className="page-banner__breadcrumb-item" aria-current={isLast ? 'page' : undefined}>
                      <span className="page-banner__breadcrumb-separator" aria-hidden="true">
                        <ChevronRight size={14} />
                      </span>
                      {isLast ? (
                        <span>{crumb.label}</span>
                      ) : (
                        <Link to={crumb.to} className="page-banner__breadcrumb-link">
                          {crumb.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}
        </div>
      </Container>
    </div>
  );
}

export default PageBanner;
