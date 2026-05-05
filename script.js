const translations = {
  en: {
    "cta.contact": "Get in Touch",
    "hero.title": "We build software for startups and serious teams.",
    "hero.subtitle": "Partner with us to turn ambitious ideas into successful, scalable digital products.",
    "cta.work": "View Our Work",
    "cta.backToTop": "Back to top",
    "projects.title": "Featured Projects",
    "projects.cheflinkDesc": "A comprehensive digital ordering and management system for the gastronomy industry, streamlining operations and enhancing customer experience.",
    "projects.supplyDesc": "Transparent supply chain tracking platform leveraging public blockchain technology to record and verify product journey events.",
    "footer.copyright": "© Copyright Karlo Labs"
  },
  de: {
    "cta.contact": "Kontakt aufnehmen",
    "hero.title": "Wir entwickeln Software für Startups und ambitionierte Teams.",
    "hero.subtitle": "Wir begleiten euch dabei, ehrgeizige Ideen in erfolgreiche, skalierbare digitale Produkte zu verwandeln.",
    "cta.work": "Unsere Projekte",
    "cta.backToTop": "Nach oben",
    "projects.title": "Ausgewählte Projekte",
    "projects.cheflinkDesc": "Ein umfassendes digitales Bestell- und Managementsystem fur die Gastronomie, das Abläufe vereinfacht und das Kundenerlebnis verbessert.",
    "projects.supplyDesc": "Transparente Plattform zur Lieferkettenverfolgung auf Basis öffentlicher Blockchain-Technologie, um Produktwege zu dokumentieren und zu verifizieren.",
    "footer.copyright": "© Copyright Karlo Labs"
  }
};

const supportedLangs = ["en", "de"];
const langSelect = document.querySelector("#language-select");

const getInitialLanguage = () => {
  const stored = window.localStorage.getItem("karlolabs-lang");
  if (stored && supportedLangs.includes(stored)) {
    return stored;
  }

  const browserLang = (navigator.language || "en").toLowerCase();
  if (browserLang.startsWith("de")) {
    return "de";
  }

  return "en";
};

const applyLanguage = (lang) => {
  const dictionary = translations[lang] || translations.en;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    const value = dictionary[key];
    if (!value) {
      return;
    }
    node.textContent = value;
  });

  if (langSelect) {
    langSelect.value = lang;
  }

  window.localStorage.setItem("karlolabs-lang", lang);
};

const initialLang = getInitialLanguage();
applyLanguage(initialLang);

if (langSelect) {
  langSelect.addEventListener("change", (event) => {
    const nextLang = event.target.value;
    if (!supportedLangs.includes(nextLang)) {
      return;
    }
    applyLanguage(nextLang);
  });
}
