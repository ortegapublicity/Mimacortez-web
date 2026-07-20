import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { animate, createScope, createTimeline, onScroll, stagger, utils } from 'animejs';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'prensa', label: 'Prensa' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Nav() {
  const rootRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const hasPositionedIndicator = useRef(false);

  const [activeId, setActiveId] = useState('inicio');
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll-linked chrome: nav surface fade-in/shrink, top progress bar, ambient glyph spin.
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scope = createScope({ root: rootRef }).add(() => {
      const chromeObserver = onScroll({
        target: document.body,
        sync: true,
        onUpdate: (self) => {
          const shrink = Math.min(Math.max(self.scroll / 140, 0), 1);
          if (surfaceRef.current) utils.set(surfaceRef.current, { opacity: shrink });
          if (barRef.current) {
            utils.set(barRef.current, {
              paddingTop: 28 - 12 * shrink,
              paddingBottom: 28 - 12 * shrink,
            });
          }
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const total = maxScroll > 0 ? Math.min(Math.max(self.scroll / maxScroll, 0), 1) : 0;
          if (progressRef.current) utils.set(progressRef.current, { scaleX: total });
        },
      });

      if (!reduceMotion) {
        animate('.nav-glyph', {
          rotate: '1turn',
          duration: 24000,
          loop: true,
          ease: 'linear',
        });
      }

      return () => chromeObserver.revert();
    });

    return () => scope.revert();
  }, []);

  // Scrollspy: track which section is currently in view.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => !!el
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Slide the active-link indicator under the current section's nav link.
  useEffect(() => {
    const positionIndicator = () => {
      const el = linkRefs.current.get(activeId);
      if (!el || !indicatorRef.current || !trackRef.current) return;
      const trackRect = trackRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const next = { left: elRect.left - trackRect.left, width: elRect.width };

      if (!hasPositionedIndicator.current) {
        utils.set(indicatorRef.current, next);
        hasPositionedIndicator.current = true;
      } else {
        animate(indicatorRef.current, { ...next, duration: 500, ease: 'outExpo' });
      }
    };

    positionIndicator();
    window.addEventListener('resize', positionIndicator);
    return () => window.removeEventListener('resize', positionIndicator);
  }, [activeId]);

  const handleLinkEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    const underline = e.currentTarget.querySelector('.nav-underline');
    if (underline) animate(underline, { scaleX: [0, 1], duration: 350, ease: 'outExpo' });
  };
  const handleLinkLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    const underline = e.currentTarget.querySelector('.nav-underline');
    if (underline) animate(underline, { scaleX: 0, duration: 250, ease: 'inOutQuad' });
  };

  // Mobile fullscreen overlay open/close choreography.
  useEffect(() => {
    if (!overlayRef.current) return;

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      createTimeline({ defaults: { ease: 'outExpo' } })
        .add(overlayRef.current, { opacity: [0, 1], duration: 280 })
        .add('.mobile-link', { opacity: [0, 1], y: [28, 0], delay: stagger(70) }, '-=150')
        .add('.menu-icon', { opacity: [1, 0], rotate: [0, 45], duration: 220 }, 0)
        .add('.close-icon', { opacity: [0, 1], rotate: [-45, 0], duration: 220 }, 0);
    } else {
      document.body.style.overflow = '';
      createTimeline({ defaults: { ease: 'inOutQuad' } })
        .add(overlayRef.current, { opacity: [1, 0], duration: 220 })
        .add('.menu-icon', { opacity: [0, 1], rotate: [45, 0], duration: 220 }, 0)
        .add('.close-icon', { opacity: [1, 0], rotate: [0, -45], duration: 220 }, 0);
    }
  }, [menuOpen]);

  useEffect(
    () => () => {
      document.body.style.overflow = '';
    },
    []
  );

  return (
    <div ref={rootRef}>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none">
        <div
          ref={progressRef}
          className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400"
        />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50">
        <div
          ref={surfaceRef}
          className="absolute inset-0 opacity-0 bg-neutral-950/85 backdrop-blur-xl border-b border-neutral-800/80"
        />
        <div ref={barRef} className="relative max-w-6xl mx-auto px-6 py-7 flex items-center justify-between">
          <a
            href="#inicio"
            className="flex items-center gap-2.5"
            onClick={() => setMenuOpen(false)}
            aria-label="Ir al inicio"
          >
            <svg className="nav-glyph w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="navGlyphGradient" x1="0" y1="0" x2="24" y2="24">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
              </defs>
              <path
                d="M15.5 3.5a8.5 8.5 0 1 0 5 15.4A9.5 9.5 0 0 1 15.5 3.5Z"
                stroke="url(#navGlyphGradient)"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path d="M19 2.5l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5L17 4.5l1.5-.5.5-1.5Z" fill="url(#navGlyphGradient)" />
            </svg>
            <span className="font-serif text-lg font-bold text-white tracking-tight">Mima Cortez</span>
          </a>

          <nav className="hidden md:block" aria-label="Principal">
            <div ref={trackRef} className="relative flex items-center gap-8">
              <span
                ref={indicatorRef}
                className="absolute left-0 -bottom-1.5 h-[2px] w-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300"
              />
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  ref={(el) => {
                    if (el) linkRefs.current.set(link.id, el);
                  }}
                  href={`#${link.id}`}
                  onMouseEnter={handleLinkEnter}
                  onMouseLeave={handleLinkLeave}
                  aria-current={activeId === link.id ? 'true' : undefined}
                  className={`relative py-1 text-sm font-medium tracking-wide transition-colors ${
                    activeId === link.id ? 'text-white' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className="nav-underline absolute left-0 -bottom-1.5 h-[2px] w-full origin-left scale-x-0 rounded-full bg-white/40" />
                </a>
              ))}
            </div>
          </nav>

          <a
            href="#contacto"
            className="hidden md:inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition-transform hover:scale-105"
          >
            Trabajemos Juntes
          </a>

          <button
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-white"
          >
            <Menu className="menu-icon absolute" size={24} />
            <X className="close-icon absolute opacity-0" size={24} />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <div
        ref={overlayRef}
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 opacity-0 bg-neutral-950/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden ${
          menuOpen ? '' : 'pointer-events-none'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={() => setMenuOpen(false)}
            className="mobile-link opacity-0 font-serif text-4xl font-bold text-white"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contacto"
          onClick={() => setMenuOpen(false)}
          className="mobile-link opacity-0 mt-4 inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 px-6 py-3 text-base font-semibold text-white"
        >
          Trabajemos Juntes
        </a>
      </div>
    </div>
  );
}
