'use client';

import { useTranslations } from 'next-intl';
import './styles.css';

type ProjectStatus = 'accepting' | 'waitlist';

const PROJECT_STATUS: ProjectStatus = 'accepting';

export function NavStatus() {
  const t = useTranslations();

  return (
    <div className={`nav__status nav__status--${PROJECT_STATUS}`}>
      <span className="nav__status-dot" aria-hidden="true" />
      <span className="nav__status-label">
        {PROJECT_STATUS === 'accepting' ? t('nav.available') : t('nav.waitlist')}
      </span>
    </div>
  );
}
