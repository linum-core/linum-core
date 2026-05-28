/* =========================================================
   LINUM CORE — Main app v2
   ========================================================= */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "language": "pt",
  "showPreloader": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [activeSection, setActiveSection] = React.useState("hero");

  // Active section tracking
  React.useEffect(() => {
    const ids = ["hero", "manifesto", "comp", "portfolio", "ceo", "fb", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
                               .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.1, 0.4, 0.7] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: "smooth" });
  };

  const lang = t.language;
  const setLang = (l) => setTweak("language", l);

  return (
    <React.Fragment>
      {t.showPreloader && <Preloader />}
      <Nav lang={lang} setLang={setLang} activeSection={activeSection} scrollTo={scrollTo} />
      <main>
        <Hero lang={lang} scrollTo={scrollTo} />
        <Manifesto lang={lang} />
        <Competencies lang={lang} />
        <Portfolio lang={lang} />
        <Ceo lang={lang} />
        <Feedbacks lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Idioma">
          <TweakRadio
            label="Language"
            value={t.language}
            onChange={(v) => setTweak("language", v)}
            options={[
              { value: "pt", label: "PT-BR" },
              { value: "en", label: "EN-US" },
            ]}
          />
        </TweakSection>
        <TweakSection label="Boot">
          <TweakToggle
            label="Preloader animation"
            value={t.showPreloader}
            onChange={(v) => setTweak("showPreloader", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
