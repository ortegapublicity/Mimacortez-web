import { socialLinks } from '../data';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-neutral-900 bg-neutral-950">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-serif font-bold text-white mb-1">Mima Cortez</h2>
          <p className="text-neutral-500 text-sm">Artista • Activista • Diseñadora</p>
        </div>
        
        <div className="flex gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-neutral-500 hover:text-white transition-colors`}
                aria-label={link.name}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
