import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { createScope, onScroll, utils } from 'animejs';
import { socialLinks } from '../data';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const scope = createScope({ root: sectionRef }).add(() => {
      const observer = onScroll({
        target: document.body,
        sync: true,
        onUpdate: (self) => {
          const scroll = Math.min(self.scroll, 600);
          utils.set('.hero-parallax-back', { translateY: scroll * 0.18 });
          utils.set('.hero-parallax-glow', { translateY: scroll * -0.1 });
        },
      });
      return () => observer.revert();
    });

    return () => scope.revert();
  }, []);

  return (
    <section id="inicio" ref={sectionRef} className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden min-h-[90vh] flex items-center scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-20 text-center md:text-left">
        
        {/* Left Text Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 order-2 md:order-1"
        >
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-neutral-900 border border-pink-500/30 text-pink-300 text-sm font-semibold tracking-wider uppercase">
            Artista • Activista • Diseñadora
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 font-serif">
            Mima Cortez
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto md:mx-0 leading-relaxed mb-10">
            Reivindicando la dignidad a través de la moda, honrando la fe de las disidencias con el <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-medium">Tarot Afro Queer</span> y construyendo espacios para la gestión de los activismos.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center md:justify-start gap-4"
          >
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/20 hover:border-pink-500/50 hover:text-white`}
                  aria-label={`Visitar ${link.name}`}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right Image Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex-1 w-full max-w-md lg:max-w-lg relative order-1 md:order-2"
        >
          {/* Main Image Container */}
          <div className="hero-image-frame aspect-[4/5] rounded-[2rem] overflow-hidden relative shadow-2xl shadow-purple-500/20 border border-white/10 z-10 group">
            <picture>
              <source srcSet="/profile.avif" type="image/avif" />
              <source srcSet="/profile.webp" type="image/webp" />
              <img
                src="/profile.jpg"
                alt="Mima Cortez"
                width={900}
                height={1125}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
          </div>
          
          {/* Vibrant background glow imitating the colorful graphic */}
          <div className="hero-parallax-glow absolute -inset-4 bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 rounded-[2.5rem] opacity-30 blur-2xl -z-10 animate-pulse-slow"></div>
        </motion.div>

      </div>

      {/* General Section Abstract Background */}
      <div className="hero-parallax-back absolute top-1/4 left-0 -translate-x-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none blur-3xl -z-20">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-700 via-rose-600 to-orange-500 rounded-full animate-pulse-slow"></div>
      </div>
    </section>
  );
}
