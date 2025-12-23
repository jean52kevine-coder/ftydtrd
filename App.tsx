import React, { useEffect, useRef, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle,
  Zap,
  Loader2,
  Globe,
  Coffee,
  Home,
  Monitor,
} from "lucide-react";

/**
 * App.tsx
 * VORTEX — Single-file React + Tailwind + Framer Motion "Ultra-Premium Dark Mode" site
 *
 * Notes:
 * - Single file containing ALL components (as requested).
 * - Uses Tailwind CSS utility classes (assumes Tailwind is configured in the host project).
 * - Uses framer-motion for animations.
 * - Uses lucide-react for icons.
 *
 * Design decisions:
 * - Ultra-premium dark radial gradient background with cyan accents (#00f2ff).
 * - Border-radius minimum 24px for cards (rounded-[24px]).
 * - Sticky glassmorphism navigation with scroll progress bar.
 * - Hero with massive italic title and particle animation on canvas.
 * - Portfolio contains interactive simulated mini-browsers for 3 vertical industries.
 * - Comparison section with detailed feature comparison table.
 * - Offer section with psychological nudges and maintenance upsell.
 * - Contact form wired to Web3Forms API (example payload).
 *
 * Disclaimer: This is a self-contained UI file; for production some concerns (fonts, image assets,
 * SVGs, accessibility details) should be externalized and refined.
 */

/* ---------------------------
   Utilities & Types
   --------------------------- */

type MiniSiteKey = "restaurant" | "realestate" | "saas";

const CYAN = "#00f2ff";

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

/* ---------------------------
   Root App
   --------------------------- */

const App: React.FC = () => {
  // Mobile nav state
  const [navOpen, setNavOpen] = useState(false);

  // Scroll progress
  const [progress, setProgress] = useState(0);

  // Active portfolio sample
  const [activeMini, setActiveMini] = useState<MiniSiteKey>("restaurant");

  // Smooth page title change
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = total > 0 ? window.scrollY / total : 0;
      setProgress(clamp(scrolled, 0, 1));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Close mobile nav when clicking anchor
  useEffect(() => {
    if (!navOpen) return;
    const handleRoute = () => setNavOpen(false);
    window.addEventListener("hashchange", handleRoute);
    return () => window.removeEventListener("hashchange", handleRoute);
  }, [navOpen]);

  return (
    <div
      className="min-h-screen text-white antialiased"
      style={{
        background:
          "radial-gradient(60% 40% at 10% 10%, rgba(0,242,255,0.06), transparent 8%), radial-gradient(50% 60% at 90% 80%, rgba(0,242,255,0.02), transparent 12%), linear-gradient(180deg,#05060b 0%, #000000 100%)",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif",
      }}
    >
      <ScrollProgressBar progress={progress} color={CYAN} />
      <header className="sticky top-4 z-50 px-6">
        <Nav
          navOpen={navOpen}
          setNavOpen={setNavOpen}
          activeMini={activeMini}
          setActiveMini={setActiveMini}
        />
      </header>

      <main className="max-w-screen-2xl mx-auto px-6 pb-32">
        <Hero />
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <section className="lg:col-span-7">
            <Portfolio
              activeMini={activeMini}
              setActiveMini={setActiveMini}
            />
            <Comparison />
            <FAQ />
          </section>

          <aside className="lg:col-span-5 space-y-8">
            <OfferCard />
            <ContactCard />
            <Testimonials />
            <CTABox />
          </aside>
        </div>

        <section id="footer" className="mt-20">
          <Footer />
        </section>
      </main>

      <CanvasParticles />
    </div>
  );
};

/* ---------------------------
   Scroll Progress Bar (thin)
   --------------------------- */

const ScrollProgressBar: React.FC<{ progress: number; color?: string }> = ({
  progress,
  color = CYAN,
}) => {
  return (
    <div className="relative h-1 w-full pointer-events-none">
      <div
        aria-hidden
        className="absolute left-0 top-0 h-1 w-full bg-white/2 rounded-full"
        style={{ opacity: 0.04 }}
      />
      <div
        aria-hidden
        className="absolute left-0 top-0 h-1 rounded-full"
        style={{
          width: `${Math.round(progress * 100)}%`,
          background: `linear-gradient(90deg, ${color}, rgba(0,242,255,0.55))`,
          boxShadow: `0 0 20px ${color}`,
          transition: "width 0.12s linear",
        }}
      />
    </div>
  );
};

/* ---------------------------
   Navigation
   --------------------------- */

const Nav: React.FC<{
  navOpen: boolean;
  setNavOpen: (v: boolean) => void;
  activeMini: MiniSiteKey;
  setActiveMini: (k: MiniSiteKey) => void;
}> = ({ navOpen, setNavOpen, activeMini, setActiveMini }) => {
  return (
    <nav
      className="backdrop-blur-md bg-black/30 border border-white/6 rounded-[28px] px-6 py-3 flex items-center justify-between shadow-xl"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="flex items-center gap-4">
        <a href="#home" className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-[12px] flex items-center justify-center bg-gradient-to-br from-cyan-400/20 to-cyan-600/10 border border-white/6"
            style={{ boxShadow: "0 8px 30px rgba(0,242,255,0.06)" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#00f2ff" stopOpacity="1" />
                  <stop offset="1" stopColor="#00a6ff" stopOpacity="0.7" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#g1)" strokeWidth="1.5" />
              <path d="M7 12h10M12 7v10" stroke="url(#g1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-wide">VORTEX</div>
            <div className="text-[11px] text-white/60 -mt-0.5">Ultra-Premium Digital</div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-4 ml-6">
          <a
            href="#portfolio"
            className={`px-3 py-2 rounded-lg text-sm font-semibold ${activeMini === "restaurant" ? "bg-white/4" : "hover:bg-white/3"}`}
            onClick={() => setActiveMini("restaurant")}
          >
            Portfolio
          </a>
          <a href="#offres" className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/3">
            Offres
          </a>
          <a href="#contact" className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/3">
            Contact
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3">
          <a href="mailto:hello@vortex.agency" className="text-sm text-white/70 hover:text-white flex items-center gap-2">
            <Mail size={14} /> hello@vortex.agency
          </a>
          <a href="tel:+330123456789" className="text-sm text-white/70 hover:text-white flex items-center gap-2">
            <Phone size={14} /> +33 1 23 45 67 89
          </a>
        </div>

        <div className="md:hidden">
          <button
            className="p-2 rounded-lg bg-white/4 hover:bg-white/6"
            aria-label="Toggle menu"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-[12px] bg-gradient-to-r from-cyan-400 to-cyan-300 text-black font-bold shadow-lg"
          >
            Démarrer — 749€
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 6 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute left-6 right-6 top-20 z-40 bg-black/60 border border-white/6 rounded-[20px] p-4 md:hidden backdrop-blur"
          >
            <div className="flex flex-col gap-2">
              <a href="#portfolio" className="px-3 py-2 rounded-lg font-semibold" onClick={() => setNavOpen(false)}>
                Portfolio
              </a>
              <a href="#offres" className="px-3 py-2 rounded-lg font-semibold" onClick={() => setNavOpen(false)}>
                Offres
              </a>
              <a href="#contact" className="px-3 py-2 rounded-lg font-semibold" onClick={() => setNavOpen(false)}>
                Contact
              </a>
              <div className="pt-2 border-t border-white/6 mt-2">
                <a href="mailto:hello@vortex.agency" className="flex items-center gap-2 py-2 text-white/70 hover:text-white">
                  <Mail size={16} /> hello@vortex.agency
                </a>
                <a href="tel:+330123456789" className="flex items-center gap-2 py-2 text-white/70 hover:text-white">
                  <Phone size={16} /> +33 1 23 45 67 89
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* ---------------------------
   Hero Section
   --------------------------- */

const Hero: React.FC = () => {
  return (
    <section id="home" className="mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-[44px] sm:text-[56px] md:text-[72px] lg:text-[86px] leading-tight font-extrabold italic"
            style={{
              letterSpacing: "-0.02em",
              fontStyle: "italic",
              fontWeight: 900,
              WebkitFontSmoothing: "antialiased",
            }}
          >
            VORTEX — Agence digitale Ultra‑Premium
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.6 }}
            className="text-lg text-white/70 max-w-2xl"
          >
            Nous concevons des sites rapides, optimisés pour le SEO et pensés pour convertir. Prix
            fixe : 749€ HT — un résultat studio, une exécution d'expert.
          </motion.p>

          <div className="flex gap-4 items-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-[12px] bg-gradient-to-r from-cyan-400 to-cyan-300 text-black font-bold shadow-2xl"
            >
              Démarrer maintenant — 749€
              <ArrowRight size={16} />
            </a>

            <a href="#portfolio" className="text-sm text-white/70 hover:text-white flex items-center gap-2">
              Voir le portfolio
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="pt-6">
            <KeyMetrics />
          </div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="rounded-[24px] bg-black/30 border border-white/6 p-5 shadow-xl"
            style={{ minHeight: 220 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-white/60">Package</div>
                <div className="text-2xl font-extrabold tracking-tight">VORTEX Launch</div>
                <div className="mt-3 text-white/70">Site complet, responsive, SEO friendly, 1 page premium.</div>
              </div>

              <div className="text-right">
                <div className="text-xs text-white/50">Prix spécial</div>
                <div className="text-3xl font-extrabold" style={{ color: CYAN }}>749€</div>
                <div className="text-xs text-white/50">HT — Maintenance 49€/mois</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-[18px] p-3 bg-white/2 border border-white/6">
                <div className="text-[10px] text-white/60">Livraison</div>
                <div className="text-sm font-bold">7–10 jours</div>
              </div>
              <div className="rounded-[18px] p-3 bg-white/2 border border-white/6">
                <div className="text-[10px] text-white/60">SEO</div>
                <div className="text-sm font-bold">Optimisé</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ---------------------------
   Key Metrics Small Cards
   --------------------------- */

const KeyMetrics: React.FC = () => {
  const metrics = [
    { label: "Pages optimisées", value: "1", accent: CYAN, icon: Zap },
    { label: "Performance", value: "A++", accent: CYAN, icon: CheckCircle },
    { label: "Conversion target", value: "+18%", accent: CYAN, icon: ArrowRight },
  ];
  return (
    <div className="grid grid-cols-3 gap-3 max-w-md">
      {metrics.map((m, i) => (
        <div
          key={i}
          className="rounded-[18px] p-3 bg-black/30 border border-white/6 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-cyan-400/10 to-cyan-600/6">
            <m.icon size={18} color={CYAN} />
          </div>
          <div>
            <div className="text-xs text-white/60">{m.label}</div>
            <div className="text-sm font-bold">{m.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ---------------------------
   Canvas Particles (Background)
   --------------------------- */

const CanvasParticles: React.FC = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const particleCount = Math.round((width * height) / 45000); // density scaling
    const particles: Particle[] = [];

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      hue: number;
      life: number;
      maxLife: number;
      alpha: number;
      constructor() {
        this.reset();
      }
      reset() {
        this.x = rand(0, width);
        this.y = rand(0, height);
        this.vx = rand(-0.12, 0.12);
        this.vy = rand(-0.08, 0.08);
        this.r = rand(0.8, 3.2);
        this.hue = 180 + rand(-20, 20);
        this.life = 0;
        this.maxLife = rand(120, 600);
        this.alpha = rand(0.05, 0.35);
      }
      step() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (this.life > this.maxLife) this.reset();
        if (this.x < -10 || this.x > width + 10 || this.y < -10 || this.y > height + 10) this.reset();
      }
      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        const g = c.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 6);
        g.addColorStop(0, `rgba(0,242,255,${this.alpha})`);
        g.addColorStop(1, `rgba(0,242,255,0)`);
        c.fillStyle = g;
        c.arc(this.x, this.y, this.r * 6, 0, Math.PI * 2);
        c.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    let raf = 0;
    function frame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        p.step();
        p.draw(ctx);
      }
      raf = requestAnimationFrame(frame);
    }
    frame();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // adjust particles if necessary
      particles.length = 0;
      const newCount = Math.round((width * height) / 45000);
      for (let i = 0; i < newCount; i++) particles.push(new Particle());
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 -z-10 pointer-events-none" />;
};

/* ---------------------------
   Portfolio (Interactive mini-sites)
   --------------------------- */

const Portfolio: React.FC<{
  activeMini: MiniSiteKey;
  setActiveMini: (k: MiniSiteKey) => void;
}> = ({ activeMini, setActiveMini }) => {
  const minis: { key: MiniSiteKey; title: string; icon: any; desc: string }[] = [
    { key: "restaurant", title: "Restaurant Gastronomique", icon: Coffee, desc: "Réservation, menu, ambiance." },
    { key: "realestate", title: "Agence Immobilière", icon: Home, desc: "Listings, filtres, leadgen." },
    { key: "saas", title: "SaaS B2B", icon: Monitor, desc: "Onboarding, pricing, trial." },
  ];

  return (
    <section id="portfolio" className="mt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold">Portfolio interactif</h2>
          <div className="text-white/60 mt-1">Explorez des maquettes interactives, naviguez et testez.</div>
        </div>

        <div className="flex gap-2">
          {minis.map((m) => (
            <button
              key={m.key}
              onClick={() => setActiveMini(m.key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-[12px] border ${
                activeMini === m.key ? "bg-white/6 border-white/20" : "bg-white/3 border-white/6"
              }`}
            >
              <m.icon size={16} color={CYAN} />
              <span className="text-sm font-semibold">{m.title.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MiniBrowserCard title="Aperçu" subtitle="Simulateur" className="lg:col-span-2">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <button
                className={`col-span-1 rounded-[12px] py-2 px-3 text-sm font-semibold ${activeMini === "restaurant" ? "bg-white/6" : "bg-black/20"}`}
                onClick={() => setActiveMini("restaurant")}
              >
                Restaurant
              </button>
              <button
                className={`col-span-1 rounded-[12px] py-2 px-3 text-sm font-semibold ${activeMini === "realestate" ? "bg-white/6" : "bg-black/20"}`}
                onClick={() => setActiveMini("realestate")}
              >
                Immobilier
              </button>
              <button
                className={`col-span-1 rounded-[12px] py-2 px-3 text-sm font-semibold ${activeMini === "saas" ? "bg-white/6" : "bg-black/20"}`}
                onClick={() => setActiveMini("saas")}
              >
                SaaS
              </button>
            </div>

            <div>
              {activeMini === "restaurant" && <RestaurantMiniSite />}
              {activeMini === "realestate" && <RealEstateMiniSite />}
              {activeMini === "saas" && <SaaSMiniSite />}
            </div>
          </div>
        </MiniBrowserCard>

        <MiniBrowserCard title="Détails" subtitle="Caractéristiques" className="lg:col-span-1">
          <div className="space-y-3">
            <div className="rounded-[18px] p-4 bg-black/30 border border-white/6">
              <div className="text-sm font-bold">Technique</div>
              <ul className="mt-2 text-sm text-white/70 space-y-1">
                <li>React + Tailwind</li>
                <li>Animations Framer Motion</li>
                <li>Images optimisées & lazy-loading</li>
                <li>SEO on-page & structured data</li>
              </ul>
            </div>

            <div className="rounded-[18px] p-4 bg-black/30 border border-white/6">
              <div className="text-sm font-bold">Résultats</div>
              <ul className="mt-2 text-sm text-white/70 space-y-1">
                <li>Temps de chargement <strong>≤ 1.8s</strong> (test simulé)</li>
                <li>Score Lighthouse optimisé</li>
                <li>Conversion: CTA visibles, formulaires courts</li>
              </ul>
            </div>

            <div className="rounded-[18px] p-4 bg-black/30 border border-white/6">
              <div className="text-sm font-bold">Support</div>
              <div className="text-sm text-white/70 mt-2">
                30 jours d'assistance incluse + option maintenance 49€/mois.
              </div>
            </div>
          </div>
        </MiniBrowserCard>
      </div>
    </section>
  );
};

/* ---------------------------
   Mini-Browser Card Component
   --------------------------- */

const MiniBrowserCard: React.FC<{
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, children, className = "" }) => {
  return (
    <div className={`rounded-[24px] bg-black/30 border border-white/6 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm font-bold">{title}</div>
          {subtitle && <div className="text-xs text-white/60">{subtitle}</div>}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400/80" />
          <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
          <div className="w-2 h-2 rounded-full bg-green-400/50" />
        </div>
      </div>
      <div className="rounded-[18px] overflow-hidden border border-white/4">{children}</div>
    </div>
  );
};

/* ---------------------------
   Restaurant MiniSite
   - Simulated scrollable site with reservation form
   --------------------------- */

const RestaurantMiniSite: React.FC = () => {
  return (
    <div className="bg-[#071018] text-white" style={{ minHeight: 360 }}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-extrabold">Le Comptoir Vortex</div>
            <div className="text-xs text-white/60">Restaurant gastronomique • Paris</div>
          </div>
          <div className="text-sm text-white/70">Ouvert aujourd'hui • 12:00 - 23:00</div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 rounded-[16px] overflow-hidden bg-gradient-to-b from-black/40 to-black/10 p-3">
            <div className="h-36 bg-[linear-gradient(90deg,#001219,transparent)] rounded-[12px] flex items-end p-4">
              <div>
                <div className="text-xl font-bold">Menu dégustation</div>
                <div className="text-sm text-white/60">6 plats • 65€</div>
              </div>
            </div>

            <div className="mt-4 text-sm">
              <div className="text-white/70">Expérience signée VORTEX — mise en scène, call to action et microcopy pour convertir.</div>
              <ul className="mt-3 space-y-1 text-white/60">
                <li>• Photo immersive</li>
                <li>• Réservation en 2 clics</li>
                <li>• CTA fixe en bas pour mobile</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[16px] p-3 bg-black/25 border border-white/6">
            <ReservationSimulator />
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <a className="px-4 py-2 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 font-bold">Voir menu</a>
          <a className="px-4 py-2 rounded-lg bg-white/3">Galerie</a>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------
   Reservation Simulator (inside mini-site)
   --------------------------- */

const ReservationSimulator: React.FC = () => {
  const [name, setName] = useState("");
  const [people, setPeople] = useState(2);
  const [time, setTime] = useState("20:00");
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div>
      {!confirmed ? (
        <>
          <div className="text-sm text-white/70 mb-2">Réservez une table</div>
          <div className="space-y-2">
            <input
              className="w-full rounded-[12px] p-2 bg-black/10 border border-white/6 text-white"
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex gap-2">
              <select className="flex-1 rounded-[12px] p-2 bg-black/10 border border-white/6" value={people} onChange={(e) => setPeople(Number(e.target.value))}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option value={n} key={n}>
                    {n} personne{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
              <input
                type="time"
                className="w-28 rounded-[12px] p-2 bg-black/10 border border-white/6"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <button
              onClick={() => {
                if (!name) return alert("Veuillez entrer votre nom.");
                setConfirmed(true);
              }}
              className="w-full rounded-[12px] py-2 bg-gradient-to-r from-cyan-400 to-cyan-300 text-black font-bold"
            >
              Réserver
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <CheckCircle size={40} color={CYAN} />
          <div className="mt-2 font-bold">Réservation confirmée</div>
          <div className="text-sm text-white/70 mt-1">Merci {name} — Table pour {people} à {time}.</div>
        </div>
      )}
    </div>
  );
};

/* ---------------------------
   Real-Estate MiniSite
   --------------------------- */

const RealEstateMiniSite: React.FC = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ beds: 2, maxPrice: 500000 });
  const sampleHouses = [
    { id: 1, title: "Loft lumineux — 3 pièces", price: 420000, beds: 2, img: null },
    { id: 2, title: "Maison familiale — Jardin", price: 680000, beds: 4, img: null },
    { id: 3, title: "Studio centre-ville", price: 210000, beds: 0, img: null },
  ];

  const results = sampleHouses.filter((h) => h.price <= filters.maxPrice && h.beds >= filters.beds && h.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="bg-[#06151a] text-white" style={{ minHeight: 360 }}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-extrabold">Agence VORTEX Immo</div>
            <div className="text-xs text-white/60">Trouvons le bien idéal.</div>
          </div>
          <div className="text-sm text-white/70">+120 biens</div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 p-2">
            <div className="flex gap-3 items-center">
              <input
                className="flex-1 rounded-[12px] p-2 bg-black/10 border border-white/6"
                placeholder="Rechercher (ex: 'loft')"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <select
                className="rounded-[12px] p-2 bg-black/10 border border-white/6"
                value={filters.beds}
                onChange={(e) => setFilters((s) => ({ ...s, beds: Number(e.target.value) }))}
              >
                <option value={0}>Studio</option>
                <option value={1}>1+</option>
                <option value={2}>2+</option>
                <option value={3}>3+</option>
              </select>
            </div>

            <div className="mt-3 space-y-3">
              {results.map((r) => (
                <div key={r.id} className="rounded-[12px] p-3 bg-black/20 border border-white/6 flex items-center justify-between">
                  <div>
                    <div className="font-bold">{r.title}</div>
                    <div className="text-sm text-white/60">{r.beds} chambres • {r.price.toLocaleString()}€</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-cyan-300 font-bold">{Math.round((r.price / 1000))}k€</div>
                    <div className="text-xs text-white/60">Contact</div>
                  </div>
                </div>
              ))}
              {results.length === 0 && <div className="text-white/60">Aucun résultat — élargissez votre recherche.</div>}
            </div>
          </div>

          <div className="rounded-[12px] p-3 bg-black/25 border border-white/6">
            <div className="text-sm text-white/60">Budget maximum</div>
            <input
              type="range"
              min={50000}
              max={2000000}
              step={10000}
              value={filters.maxPrice}
              onChange={(e) => setFilters((s) => ({ ...s, maxPrice: Number(e.target.value) }))}
              className="w-full mt-2 accent-cyan-300"
            />
            <div className="text-sm font-bold mt-2">{filters.maxPrice.toLocaleString()}€</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------
   SaaS MiniSite
   --------------------------- */

const SaaSMiniSite: React.FC = () => {
  const [plan, setPlan] = useState<"free" | "pro" | "enterprise">("pro");
  const [trial, setTrial] = useState(false);

  return (
    <div className="bg-[#08111a] text-white" style={{ minHeight: 360 }}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-extrabold">VORTEX CRM</div>
            <div className="text-xs text-white/60">Essai gratuit • Onboarding optimisé</div>
          </div>

          <div className="text-sm">
            <div className="text-sm text-white/70">Satisfaction B2B</div>
            <div className="text-xs text-white/50">Trial: {trial ? "activé" : "non"}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 rounded-[12px] p-3 bg-black/20 border border-white/6">
            <div className="flex items-center gap-3">
              <button onClick={() => setPlan("free")} className={`px-3 py-2 rounded-[10px] ${plan === "free" ? "bg-white/6" : "bg-black/10"}`}>
                Free
              </button>
              <button onClick={() => setPlan("pro")} className={`px-3 py-2 rounded-[10px] ${plan === "pro" ? "bg-white/6" : "bg-black/10"}`}>
                Pro
              </button>
              <button onClick={() => setPlan("enterprise")} className={`px-3 py-2 rounded-[10px] ${plan === "enterprise" ? "bg-white/6" : "bg-black/10"}`}>
                Enterprise
              </button>
            </div>

            <div className="mt-3">
              <div className="text-sm text-white/70">Plan sélectionné: <strong>{plan}</strong></div>
              <ul className="mt-2 text-sm text-white/60">
                <li>• Onboarding step-by-step</li>
                <li>• 99.9% uptime</li>
                <li>• API & webhooks</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[12px] p-3 bg-black/25 border border-white/6">
            <div className="text-sm">Essai gratuit</div>
            <div className="mt-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={trial} onChange={(e) => setTrial(e.target.checked)} />
                <span className="text-sm text-white/70">Activer l'essai 14 jours</span>
              </label>
            </div>

            <div className="mt-3">
              <a className="px-3 py-2 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 font-bold">Commencer</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------
   Comparison Section
   --------------------------- */

const Comparison: React.FC = () => {
  const rows = [
    {
      feature: "Vitesse",
      vortex: "Pages pré-optimisées, livraison performante, lazy-loading et CDN.",
      wix: "Constructeur trop lourd — scripts tiers impactent perf.",
      freelance: "Dépend des connaissances; souvent non-optimisé.",
    },
    {
      feature: "SEO",
      vortex: "Balises optimisées, données structurées, sitemap, performance.",
      wix: "Difficulté à contrôler certains aspects du SEO.",
      freelance: "Variable — souvent basique ou absent.",
    },
    {
      feature: "Code",
      vortex: "Code propre, maintenable, accessible.",
      wix: "Propriétaire, difficile à migrer.",
      freelance: "Qualité variable — souvent non-scalable.",
    },
    {
      feature: "Support",
      vortex: "30 jours inclus + maintenance 49€/mois.",
      wix: "Support central mais option payante.",
      freelance: "Souvent limité, dépend du freelance.",
    },
    {
      feature: "ROI",
      vortex: "Conçu pour convertir — ROI mesurable.",
      wix: "Temps de conversion moyen, dépend du template.",
      freelance: "Peut nécessiter itérations couteuses.",
    },
  ];

  return (
    <section className="mt-10 rounded-[24px] p-6 bg-black/30 border border-white/6">
      <h3 className="text-xl font-extrabold">Comparaison — VORTEX vs WIX/DIY vs Freelance débutant</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="text-left text-white/60">
              <th className="pb-3 pr-6">Critère</th>
              <th className="pb-3 pr-6">VORTEX</th>
              <th className="pb-3 pr-6">WIX / DIY</th>
              <th className="pb-3">Freelance débutant</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={`${i % 2 === 0 ? "bg-white/2" : ""} align-top`}>
                <td className="py-4 pr-6 font-semibold">{r.feature}</td>
                <td className="py-4 pr-6 text-white/70">{r.vortex}</td>
                <td className="py-4 pr-6 text-white/70">{r.wix}</td>
                <td className="py-4 text-white/70">{r.freelance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-white/60">Conclusion: VORTEX propose un équilibre performance/SEO/support à prix fixe pour minimiser le risque et maximiser le ROI.</div>
        <a href="#contact" className="px-4 py-2 rounded-[12px] bg-cyan-400/10 border border-cyan-300/20 text-cyan-300">Me contacter</a>
      </div>
    </section>
  );
};

/* ---------------------------
   Offer Card & Pricing
   --------------------------- */

const OfferCard: React.FC = () => {
  return (
    <div id="offres" className="rounded-[24px] p-6 bg-black/30 border border-white/6 sticky top-28">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-white/60">Offre tout-en-un</div>
          <div className="text-2xl font-extrabold">VORTEX Launch — 749€ HT</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-white/50">Paiement unique</div>
          <div className="text-3xl font-black" style={{ color: CYAN }}>749€</div>
          <div className="text-xs text-white/60">HT — Maintenance 49€/mois</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3">
        <div className="rounded-[18px] p-4 bg-black/25 border border-white/6">
          <ul className="text-white/70 space-y-1 text-sm">
            <li>• Design Ultra‑Premium Dark Mode (Cyan accents)</li>
            <li>• Page principale + sections supplémentaires (Portfolio, Contact, Offres)</li>
            <li>• Responsive & accessible</li>
            <li>• SEO on-page + structured data</li>
            <li>• 30 jours support + 7–10 jours de livraison</li>
          </ul>
        </div>

        <div className="rounded-[18px] p-4 bg-black/25 border border-white/6 flex items-center justify-between">
          <div>
            <div className="text-sm text-white/60">Maintenance (option)</div>
            <div className="text-lg font-bold">49€ / mois</div>
          </div>
          <div>
            <a href="#contact" className="px-4 py-2 rounded-[12px] bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">Ajouter la maintenance</a>
          </div>
        </div>

        <div className="rounded-[18px] p-4 bg-black/25 border border-white/6">
          <div className="text-sm text-white/60">Garantie satisfaction</div>
          <div className="text-sm text-white/70 mt-2">Révisions incluses — nous peaufinons jusqu'à satisfaction (limité à scope convenu).</div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <a href="#contact" className="px-4 py-2 rounded-[12px] bg-gradient-to-r from-cyan-400 to-cyan-300 text-black font-bold">Commander — 749€</a>
        <a href="#contact" className="px-4 py-2 rounded-[12px] border border-white/6">Demander un devis personnalisé</a>
      </div>
    </div>
  );
};

/* ---------------------------
   Contact Card: brief CTA + form link
   --------------------------- */

const ContactCard: React.FC = () => {
  return (
    <div id="contact" className="rounded-[24px] p-6 bg-black/30 border border-white/6">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400/10 to-cyan-600/6 flex items-center justify-center">
          <Mail size={20} color={CYAN} />
        </div>
        <div>
          <div className="text-lg font-extrabold">Contactez-nous</div>
          <div className="text-sm text-white/60">Remplissez le formulaire pour démarrer — intégré à Web3Forms.</div>
        </div>
      </div>

      <div className="mt-4">
        <ContactForm />
      </div>
    </div>
  );
};

/* ---------------------------
   Contact Form (complex, validation, Web3Forms)
   --------------------------- */

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState<string>("749");
  const [message, setMessage] = useState("");
  const [maintenance, setMaintenance] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Honeypot for bots
  const [hp, setHp] = useState("");

  const validateEmail = (e: string) => /\S+@\S+\.\S+/.test(e);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic validations
    if (!name.trim()) return setError("Nom requis.");
    if (!validateEmail(email)) return setError("Email invalide.");
    if (hp) return setError("Bot détecté.");

    setLoading(true);

    try {
      // Web3Forms expects: { api_key, name, email, message, subject, ... }
      const payload = {
        api_key: "WEB3FORMS_API_KEY_PLACEHOLDER", // <-- Remplacer par clé réelle côté serveur/env
        subject: `Nouveau lead — VORTEX (${company || "sans entreprise"})`,
        name,
        email,
        company,
        message: `${message}\n\nMaintenance: ${maintenance ? "Oui" : "Non"}\nBudget présumé: ${budget}€`,
        // redirect: "https://vortex.agency/merci" // optional
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Web3Forms error", text);
        setError("Erreur d'envoi — veuillez réessayer plus tard.");
      } else {
        setSuccess("Merci ! Votre demande a été envoyée. Nous vous contactons sous 24h.");
        setName("");
        setCompany("");
        setEmail("");
        setMessage("");
        setMaintenance(false);
        setBudget("749");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur de réseau — vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Honeypot hidden */}
      <div style={{ display: "none" }}>
        <label>HP</label>
        <input name="hp" value={hp} onChange={(e) => setHp(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          aria-label="Nom complet"
          placeholder="Nom complet"
          className="rounded-[12px] p-3 bg-black/10 border border-white/6"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          aria-label="Adresse email"
          placeholder="Email"
          className="rounded-[12px] p-3 bg-black/10 border border-white/6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Entreprise (optionnel)"
          className="rounded-[12px] p-3 bg-black/10 border border-white/6 md:col-span-2"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-white/60">Budget souhaité</label>
        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="mt-2 w-full rounded-[12px] p-3 bg-black/10 border border-white/6"
        >
          <option value="749">749€ — VORTEX Launch</option>
          <option value="1500">1500€ — Package avancé</option>
          <option value="3000">3000€ — Package complet</option>
        </select>
      </div>

      <textarea
        placeholder="Message — parlez-nous de votre projet, objectifs, contraintes."
        className="w-full rounded-[12px] p-3 bg-black/10 border border-white/6 min-h-[120px]"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={maintenance} onChange={(e) => setMaintenance(e.target.checked)} />
          <span className="text-white/70">Ajouter la maintenance 49€/mois</span>
        </label>

        <div className="text-sm text-white/60">Politique de confidentialité & données sécurisées</div>
      </div>

      {error && <div className="text-sm text-red-400">{error}</div>}
      {success && <div className="text-sm text-green-300">{success}</div>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[12px] bg-gradient-to-r from-cyan-400 to-cyan-300 text-black font-bold"
        >
          {loading ? <Loader2 size={16} /> : "Envoyer la demande"}
        </button>

        <a className="text-sm text-white/70 hover:text-white" href="mailto:hello@vortex.agency">
          Ou envoyez un email
        </a>
      </div>
    </form>
  );
};

/* ---------------------------
   Testimonials (visual)
   --------------------------- */

const Testimonials: React.FC = () => {
  const items = [
    {
      quote: "VORTEX a transformé notre trafic en clients — site livré en 7 jours.",
      author: "Clara — Le Comptoir",
      avatarColor: "#00f2ff",
    },
    {
      quote: "Design professionnel, gain de temps et support réactif.",
      author: "Marc — Agence Immo",
      avatarColor: "#00bcd4",
    },
  ];

  return (
    <div className="rounded-[24px] p-6 bg-black/30 border border-white/6">
      <div className="text-lg font-extrabold">Témoignages</div>
      <div className="mt-4 space-y-3">
        {items.map((t, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full" style={{ background: t.avatarColor }} />
            <div>
              <div className="text-sm text-white/70">“{t.quote}”</div>
              <div className="text-xs text-white/50 mt-1">{t.author}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------------------
   CTA Box - urgency + limited slots
   --------------------------- */

const CTABox: React.FC = () => {
  const [slots, setSlots] = useState(6);

  useEffect(() => {
    // Simulate dynamic slot decrement for urgency (purely visual)
    const t = setInterval(() => {
      setSlots((s) => (s > 2 ? s - (Math.random() > 0.8 ? 1 : 0) : s));
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-[24px] p-6 bg-gradient-to-br from-black/40 to-black/20 border border-white/6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-white/60">Slots limités</div>
          <div className="text-2xl font-extrabold">Prochaines disponibilités — {slots} places</div>
        </div>
        <div>
          <a href="#contact" className="px-4 py-2 rounded-[12px] bg-cyan-400/10 border border-cyan-300/20 text-cyan-300">Réserver</a>
        </div>
      </div>

      <div className="mt-3 text-sm text-white/70">Prix fixe, livrable rapide, valeur studio — idéal pour entrepreneurs exigeants.</div>
    </div>
  );
};

/* ---------------------------
   FAQ
   --------------------------- */

const FAQ: React.FC = () => {
  const faqs = [
    { q: "Qu'est-ce qui est inclus dans 749€ ?", a: "Design premium 1 page, SEO on-page, optimisation performance, 30 jours de support." },
    { q: "Combien de révisions sont incluses ?", a: "Nous incluons 2 révisions principales durant la phase de validation." },
    { q: "Comment fonctionne la maintenance ?", a: "49€/mois inclut mises à jour mineures, backups et monitoring de performance." },
  ];
  return (
    <section className="mt-8 rounded-[24px] p-6 bg-black/30 border border-white/6">
      <h3 className="text-xl font-extrabold">Questions fréquentes</h3>
      <div className="mt-4 space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="rounded-[12px] p-4 bg-black/25 border border-white/6">
            <div className="font-semibold">{f.q}</div>
            <div className="text-sm text-white/70 mt-2">{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ---------------------------
   Footer
   --------------------------- */

const Footer: React.FC = () => {
  return (
    <footer className="mt-8 rounded-[24px] p-8 bg-black/30 border border-white/6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <div className="text-2xl font-extrabold">VORTEX</div>
          <div className="text-sm text-white/60 mt-2">Agence digitale Ultra‑Premium — design, dev & conversion.</div>
          <div className="mt-4 flex items-center gap-3 text-sm">
            <Mail size={14} /> hello@vortex.agency
          </div>
          <div className="mt-2 flex items-center gap-3 text-sm">
            <Phone size={14} /> +33 1 23 45 67 89
          </div>
        </div>

        <div>
          <div className="font-bold">Services</div>
          <ul className="mt-2 text-sm text-white/70 space-y-1">
            <li>Design & UX</li>
            <li>Développement React</li>
            <li>SEO & Performance</li>
            <li>Maintenance</li>
          </ul>
        </div>

        <div>
          <div className="font-bold">Liens rapides</div>
          <ul className="mt-2 text-sm text-white/70 space-y-1">
            <li><a href="#portfolio" className="hover:text-white">Portfolio</a></li>
            <li><a href="#offres" className="hover:text-white">Offres</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <div className="font-bold">Mentions légales</div>
          <div className="text-sm text-white/60 mt-2">VORTEX — Société fictive • SIRET 000 000 000 • TVA intracommunautaire FR00 000000000</div>
          <div className="mt-2 text-sm text-white/50">© {new Date().getFullYear()} VORTEX. Tous droits réservés.</div>
        </div>
      </div>

      <div className="mt-6 border-t border-white/6 pt-4 text-sm text-white/60 flex items-center justify-between">
        <div>Politique de confidentialité • Conditions générales — version simulée</div>
        <div>Made with <span style={{ color: CYAN }}>❤</span> by VORTEX</div>
      </div>
    </footer>
  );
};

/* ---------------------------
   Small Components / Icons used
   --------------------------- */

/* ---------------------------
   Loader / Micro components
   --------------------------- */

/* ---------------------------
   Types for Particle
   --------------------------- */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  life: number;
  maxLife: number;
  alpha: number;
  reset?: () => void;
  step?: () => void;
  draw?: (c: CanvasRenderingContext2D) => void;
};

/* ---------------------------
   EXPORT
   --------------------------- */

export default App;