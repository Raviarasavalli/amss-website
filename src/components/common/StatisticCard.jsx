import React from 'react';
import * as Icons from 'lucide-react';

function StatisticCard({ value, label, description, iconName, className = '' }) {
  const IconComponent = Icons[iconName] || Icons.HelpCircle;

  return (
    <div className={`card statistic-card stack stack-sm ${className}`.trim()}>
      <IconComponent className="statistic-card__icon" size={32} aria-hidden="true" />
      <span className="statistic-card__value">{value}</span>
      <h3 className="statistic-card__label">{label}</h3>
      {description && <p className="statistic-card__desc">{description}</p>}
    </div>
  );
}

export default StatisticCard;
