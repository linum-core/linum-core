'use client'

import { useTranslations } from 'next-intl'
import './footer-styles.css'

const cols = [
  {
    title: 'Site',
    items: ['Home', 'Competências', 'Portfólio', 'Fundador', 'Vozes', 'Contato'],
  },
  {
    title: 'Contato',
    items: ['ggvgabriel05@gmail.com', '+55 11 99000-0000', 'São Paulo · BR'],
  },
  {
    title: 'Social',
    items: ['LinkedIn', 'GitHub', 'Instagram'],
  },
]

export function Footer() {
  const t = useTranslations()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img
            src="/assets/linum-core-logo.png"
            alt="Linum Core"
            className="footer__brand-logo"
          />
          <p className="footer__tagline">
            {t('footer.tagline')}
          </p>
          <div className="footer__principles">
            <span>Profundo.</span>
            <span>Claro.</span>
            <span>Humano.</span>
            <span>Tecnológico.</span>
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title} className="footer__col">
            <h5 className="footer__col-title">{col.title}</h5>
            <ul>
              {col.items.map((it) => (
                <li key={it}>
                  <a href="#">{it}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer__bottom">
        <div>{t('footer.copyright')}</div>
        <div>{t('footer.colophon')}</div>
      </div>
    </footer>
  )
}
