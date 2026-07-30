import React from 'react';
import * as Icons from 'lucide-react';

function EmptyState({
  title = 'No records found',
  message = 'We could not find any items matching your criteria. Please try exploring another option.',
  iconName = 'Info',
  actionLabel,
  onAction,
  className = '',
}) {
  const IconComp = Icons[iconName] || Icons.Info;

  return (
    <div
      className={`empty-state-card flex flex-column flex-center ${className}`.trim()}
      style={{
        padding: 'var(--spacing-xxl) var(--spacing-md)',
        textAlign: 'center',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--color-accent)',
          borderRadius: '50%',
          padding: '16px',
          marginBottom: 'var(--spacing-sm)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconComp size={36} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
      </div>
      <h3 style={{ color: 'var(--color-primary)', fontSize: '1.2rem', margin: '0 0 8px 0', fontWeight: 700 }}>
        {title}
      </h3>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '420px', margin: '0 0 16px 0', lineHeight: 1.5 }}>
        {message}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          className="btn btn--primary btn--md"
          onClick={onAction}
          style={{ marginTop: '8px' }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
