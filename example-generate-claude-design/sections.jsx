/* =========================================================
   LINUM CORE — Section components v2
   ========================================================= */

const { useState, useEffect, useRef } = React;

/* ---------- Reveal hook ---------- */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    ref.current.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ---------- Scroll progress hook (0..1 across section) ---------- */
function useScrollProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const onScroll = () => {
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section bottom is just appearing; 1 when section top reaches top of viewport
      const total = r.height + vh;
      const passed = vh - r.top;
      setP(Math.max(0, Math.min(1, passed / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);
  return p;
}

/* ---------- Nav (matches brand-guide layout) ---------- */
function Nav({ lang, setLang, activeSection, scrollTo }) {
  const [scrolled, setScrolled] = useState(false);
  const t = COPY[lang];
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 4 nav links matching brand guide: Sobre, Serviços, Soluções, Contato
  const links = [
    ["ceo",        t.nav.ceo],          // Sobre
    ["comp",       t.nav.competencies], // Serviços
    ["portfolio",  t.nav.portfolio],    // Soluções
    ["contact",    t.nav.contact],      // Contato
  ];

  return (
    <nav className={"nav" + (scrolled ? " is-scrolled" : "")}>
      <div className="nav__rail" aria-hidden="true"></div>

      {/* LINUM wordmark (per brand-guide hero layout) */}
      <a className="nav__wordmark" href="#hero" onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}>
        <span className="nav__wordmark-text">LINUM</span>
        <span className="nav__wordmark-meta">
          <span className="nav__wordmark-dot" aria-hidden="true"></span>
          CORE
        </span>
      </a>

      <div className="nav__links">
        {links.map(([id, label]) =>
          <a key={id}
             className={"nav__link" + (activeSection === id ? " is-active" : "")}
             href={`#${id}`}
             onClick={(e) => { e.preventDefault(); scrollTo(id); }}>
            {label}
          </a>
        )}
      </div>

      <div className="nav__right">
        <div className="nav__lang" role="group" aria-label="Language">
          <button className={lang === "pt" ? "is-active" : ""} onClick={() => setLang("pt")}>PT</button>
          <button className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
        <button className="nav__cta" onClick={() => scrollTo("contact")}>
          {t.nav.cta}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </nav>
  );
}

/* ---------- Hero (matches brand-guide reference) ---------- */
function Hero({ lang, scrollTo }) {
  const t = COPY[lang].hero;
  const ref = useReveal();
  return (
    <section id="hero" className="hero" data-screen-label="01 Hero" ref={ref}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-mesh"></div>
        <div className="hero__bg-vignette"></div>
        <HeroAmbient />
      </div>

      <div className="hero__inner">
        {/* LEFT — headline column */}
        <div className="hero__col-left">
          <div className="eyebrow hero__eyebrow reveal">{t.eyebrow}</div>
          <h1 className="hero__title reveal">
            <span className="hero__title-line">{t.title_a}</span>
            <span className="hero__title-line">{t.title_b}</span>
            <span className="hero__title-line"><em>{t.title_c}</em></span>
          </h1>
          <p className="hero__lede reveal">{t.lede}</p>
          <div className="hero__cta reveal">
            <button className="btn" onClick={() => scrollTo("contact")}>
              {t.cta_primary} <span className="btn__arrow">→</span>
            </button>
            <button className="btn btn--ghost" onClick={() => scrollTo("portfolio")}>
              {t.cta_secondary}
            </button>
          </div>
        </div>

        {/* RIGHT — hands+infinity artwork */}
        <div className="hero__col-right reveal">
          <HeroArtwork />
        </div>
      </div>

      {/* The signature brand line — directly under the hero content,
          deforms on hover and returns smoothly. */}
      <div className="hero__line-wrap reveal">
        <LinumLine height={140} />
      </div>

      {/* Service categories pill row (matches brand-guide hero) */}
      <div className="hero__categories reveal-stagger">
        {t.categories.map((c, i) => (
          <div key={i} className="hero__category">
            <span className="hero__category-icon"><CraftIcon kind={c.kind} /></span>
            <span className="hero__category-label">{c.label}</span>
          </div>
        ))}
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>{t.scroll}</span>
        <span className="hero__scroll-line"></span>
      </div>
    </section>
  );
}

/* ---------- Manifesto (weaving + fluid word reveal tied to scroll) ---------- */
function Manifesto({ lang }) {
  const t = COPY[lang].manifesto;
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (!quoteRef.current) return;
    const onScroll = () => {
      const r = quoteRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // Trigger window: quote-top travels from 85%vh (start) to 25%vh (end).
      // This maps the word reveal to actual viewport reading position.
      const start = vh * 0.85;
      const end = vh * 0.25;
      const raw = (start - r.top) / (start - end);
      setP(Math.max(0, Math.min(1, raw)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ease = (x) =>
    x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  const total = t.tokens.length;
  const wordOpacity = (i) => {
    // Each word window 0.18 wide; staggered evenly across 0..1
    const start = (i / total) * 0.78;
    const end = start + 0.22;
    const raw = (p - start) / (end - start);
    if (raw <= 0) return 0;
    if (raw >= 1) return 1;
    return ease(raw);
  };
  return (
    <section ref={sectionRef} className="manifesto" id="manifesto" data-screen-label="02 Manifesto">
      <ManifestoWeave progress={p} />
      <div className="container-narrow manifesto__inner">
        <div className="eyebrow manifesto__eyebrow">{t.eyebrow}</div>
        <p className="manifesto__quote" ref={quoteRef}>
          {t.tokens.map((tok, i) => {
            const o = wordOpacity(i);
            return (
              <span
                key={i}
                className={`word ${tok.c === "accent" ? "accent" : ""}`}
                style={{
                  opacity: 0.08 + o * 0.92,
                  filter: `blur(${(1 - o) * 4}px)`,
                  transform: `translateY(${(1 - o) * 6}px)`
                }}>
                {tok.t}
              </span>);
          })}
        </p>
        <div className="manifesto__attrib">{t.attrib}</div>
      </div>
    </section>);
}

/* ---------- Competencies — 3D bento ---------- */
function CompCard({ item, kind, size, index }) {
  const cardRef = useRef(null);

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `translateY(-6px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
  };
  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "";
  };

  return (
    <article ref={cardRef} className="comp-card" data-size={size}
    onMouseMove={onMove} onMouseLeave={onLeave}>
      <CompCardBg index={index} />
      <div className="comp-card__num">{item.num}</div>
      <div className="comp-card__icon"><CraftIcon kind={kind} /></div>
      <h3 className="comp-card__title">{item.title}</h3>
      <p className="comp-card__body">{item.body}</p>
      <div className="comp-card__tags">
        {item.tags.map((tg) =>
        <span key={tg} className="comp-card__tag">{tg}</span>
        )}
      </div>
    </article>);

}

function Competencies({ lang }) {
  const t = COPY[lang].comp;
  const ref = useReveal();
  return (
    <section className="section comp" id="comp" data-screen-label="03 Competencies" ref={ref}>
      <CraftIconDefs />
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head__meta">
            <span className="section-head__num"><strong>{t.num}</strong> / VI</span>
          </div>
          <div>
            <h2 className="section-head__title">{t.title}</h2>
            <p className="section-head__lede">{t.lede}</p>
          </div>
        </div>
        <div className="comp-grid reveal">
          {t.items.map((it, i) =>
          <CompCard
            key={i}
            item={it}
            kind={COMP_ICONS[i]}
            size={COMP_SIZES[i]}
            index={i} />

          )}
        </div>
      </div>
    </section>);

}

/* ---------- Portfolio ---------- */
function Portfolio({ lang }) {
  const t = COPY[lang].portfolio;
  const [filter, setFilter] = useState(0);
  const ref = useReveal();
  const allItems = [t.featured, ...t.items];
  const matches = (it) => {
    if (filter === 0) return true;
    if (filter === 1) return it.status === "done";
    if (filter === 2) return it.status === "wip";
    if (filter === 3) return it.tags.includes("OSS");
    return true;
  };
  const counts = [
  allItems.length,
  allItems.filter((i) => i.status === "done").length,
  allItems.filter((i) => i.status === "wip").length,
  allItems.filter((i) => i.tags.includes("OSS")).length];


  const showFeatured = filter === 0 || matches(t.featured);
  const gridItems = t.items.filter(matches);

  return (
    <section className="section" id="portfolio" data-screen-label="04 Portfolio" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head__meta">
            <span className="section-head__num"><strong>{t.num}</strong> / VI</span>
          </div>
          <div>
            <h2 className="section-head__title">{t.title}</h2>
            <p className="section-head__lede">{t.lede}</p>
          </div>
        </div>

        <div className="portfolio__filter reveal">
          {t.filters.map((f, i) =>
          <button key={i}
          className={"filter-chip" + (filter === i ? " is-active" : "")}
          onClick={() => setFilter(i)}>
              {f}
              <span className="filter-chip__count">{String(counts[i]).padStart(2, "0")}</span>
            </button>
          )}
        </div>

        {showFeatured &&
        <article className="proj-featured reveal">
            <div className="proj-featured__media">
              <ProjectMockup kind={t.featured.hue} title={t.featured.title} />
            </div>
            <div>
              <div className="proj-featured__label">{t.featured_label}</div>
              <h3 className="proj-featured__title">{t.featured.title}</h3>
              <p className="proj-featured__desc">{t.featured.desc}</p>
              <div className="proj__tags" style={{ marginBottom: 28 }}>
                {t.featured.tags.map((tg) =>
              <span key={tg} className="proj__tag">{tg}</span>
              )}
              </div>
              <div style={{ display: "flex", gap: 18 }}>
                {t.featured.links.map(([label, ic]) =>
              <a key={label} href="#" onClick={(e) => e.preventDefault()}
              style={{
                fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "var(--ink-1)",
                borderBottom: "1px solid var(--rule-2)", paddingBottom: 4
              }}>
                    {label} <span style={{ marginLeft: 6 }}>{ic}</span>
                  </a>
              )}
              </div>
            </div>
          </article>
        }

        <div className="proj-grid">
          {gridItems.map((p) =>
          <article key={p.title} className="proj reveal">
              <div className="proj__media">
                <div className={"proj__status proj__status--" + p.status}>
                  <span className="proj__status-dot"></span>
                  {p.status === "done" ? lang === "pt" ? "Entregue" : "Shipped" : lang === "pt" ? "Em curso" : "In progress"}
                </div>
                <div className="proj__year">{p.year}</div>
                <div className="proj__media-inner">
                  <ProjectMockup kind={p.hue} title={p.title} />
                </div>
              </div>
              <div className="proj__content">
                <h3 className="proj__title">{p.title}</h3>
                <p className="proj__desc">{p.desc}</p>
                <div className="proj__tags">
                  {p.tags.map((tg) => <span key={tg} className="proj__tag">{tg}</span>)}
                </div>
                <div className="proj__links">
                  {p.links.map(([l, ic]) =>
                <a key={l} href="#" onClick={(e) => e.preventDefault()}>{l} {ic}</a>
                )}
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}

/* ---------- CEO ---------- */
function Ceo({ lang }) {
  const t = COPY[lang].ceo;
  const [tab, setTab] = useState(0);
  const ref = useReveal();
  const tabName = t.skills_tabs[tab];
  const data = t.skill_sets[tabName];
  return (
    <section className="section ceo" id="ceo" data-screen-label="05 CEO" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head__meta">
            <span className="section-head__num"><strong>{t.num}</strong> / VI</span>
          </div>
          <div>
            <h2 className="section-head__title">{t.title}</h2>
            <p className="section-head__lede">{t.lede}</p>
          </div>
        </div>
        <div className="ceo__grid">
          <div className="reveal">
            <div className="ceo__portrait-wrap">
              <div className="ceo__portrait">
                <div className="ceo__portrait-mark">{t.portrait_caption}</div>
                <div className="ceo__portrait-corner">{t.portrait_corner}</div>
                <div className="ceo__portrait-silhouette">
                  <svg viewBox="0 0 200 280" width="80%" aria-hidden="true">
                    <path d="M 100 60 C 75 60, 60 80, 60 105 C 60 130, 75 145, 100 145 C 125 145, 140 130, 140 105 C 140 80, 125 60, 100 60 Z M 40 280 L 40 220 C 40 180, 65 165, 100 165 C 135 165, 160 180, 160 220 L 160 280 Z"
                    fill="#6FA3D2" />
                  </svg>
                </div>
                <div className="ceo__portrait-placeholder">
                  {t.portrait.map((line, i) => <div key={i}>{line}</div>)}
                </div>
                <div className="ceo__portrait-frame"></div>
              </div>
            </div>
          </div>
          <div className="reveal">
            <h3 className="ceo__name">{t.name}</h3>
            <div className="ceo__role">{t.role}</div>
            <div className="ceo__bio ceo__bio--editorial">
              {t.bio.map((p, i) =>
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              )}
            </div>
            <div className="skills">
              <div className="skills__head">
                <h4 className="skills__title">{t.skills_title}</h4>
                <div className="skills__tabs">
                  {t.skills_tabs.map((tName, i) =>
                  <button key={tName}
                  className={"skills__tab" + (tab === i ? " is-active" : "")}
                  onClick={() => setTab(i)}>
                      {tName}
                    </button>
                  )}
                </div>
              </div>
              <SkillRadar data={data} />
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ---------- Feedbacks ---------- */
function Feedbacks({ lang }) {
  const t = COPY[lang].fb;
  const ref = useReveal();
  return (
    <section className="section" id="fb" data-screen-label="06 Feedbacks" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head__meta">
            <span className="section-head__num"><strong>{t.num}</strong> / VI</span>
          </div>
          <div>
            <h2 className="section-head__title">{t.title}</h2>
            <p className="section-head__lede">{t.lede}</p>
          </div>
        </div>
        <div className="fb-row">
          {t.items.map((it, i) =>
          <article key={i} className="fb-card reveal">
              <div className="fb-card__mark">“</div>
              <p className="fb-card__quote">{it.quote}</p>
              <div className="fb-card__meta">
                <div className="fb-card__avatar">{it.initials}</div>
                <div>
                  <div className="fb-card__person">{it.person}</div>
                  <div className="fb-card__role">{it.role}</div>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}

/* ---------- Contact ---------- */
function Contact({ lang }) {
  const t = COPY[lang].contact;
  const ref = useReveal();
  return (
    <section className="section contact" id="contact" data-screen-label="07 Contact" ref={ref}>
      <div className="contact__bg" aria-hidden="true"></div>
      <div className="container">
        <div className="eyebrow reveal" style={{ marginBottom: 24 }}>{t.num} · {lang === "pt" ? "Contato" : "Contact"}</div>
        <div className="contact__inner">
          <div className="reveal">
            <h2 className="contact__title">
              {t.title_a}{" "}<em>{t.title_b}</em>{" "}{t.title_c}
            </h2>
            <p className="contact__lede">{t.lede}</p>
            <button className="btn">
              {t.cta} <span className="btn__arrow">→</span>
            </button>
          </div>
          <div className="reveal contact__channels">
            {t.channels.map((c) =>
            <a key={c.label} className="contact-channel" href={c.href}>
                <div>
                  <div className="contact-channel__label">{c.label}</div>
                  <div className="contact-channel__value">{c.value}</div>
                </div>
                <span className="contact-channel__arrow">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>);

}

/* ---------- Footer ---------- */
function Footer({ lang }) {
  const t = COPY[lang].footer;
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img
            src="assets/linum-core-logo.png"
            alt="Linum Core"
            className="footer__brand-logo"
          />
          <p className="footer__tagline">{t.tagline}</p>
          <div className="footer__principles">
            <span>Profundo.</span>
            <span>Claro.</span>
            <span>Humano.</span>
            <span>Tecnológico.</span>
          </div>
        </div>
        {t.cols.map((col) =>
        <div key={col.title} className="footer__col">
            <h5 className="footer__col-title">{col.title}</h5>
            <ul>
              {col.items.map((it) =>
            <li key={it}><a href="#">{it}</a></li>
            )}
            </ul>
          </div>
        )}
      </div>
      <div className="footer__bottom">
        <div>{t.copyright}</div>
        <div>{t.colophon}</div>
      </div>
    </footer>);

}

Object.assign(window, { Nav, Hero, Manifesto, Competencies, Portfolio, Ceo, Feedbacks, Contact, Footer });