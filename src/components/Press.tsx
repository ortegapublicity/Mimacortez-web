import { motion } from 'motion/react';
import { pressArticles } from '../data';
import { ExternalLink } from 'lucide-react';

export default function Press() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute right-0 top-1/2 w-96 h-96 bg-pink-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-serif">
            Proyectos y Prensa
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl">
            Explora las publicaciones, proyectos artísticos como el Tarot Afro Queer y entrevistas donde Mima Cortez comparte su visión.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pressArticles.map((article, index) => {
            const Icon = article.icon;
            return (
              <motion.a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:bg-neutral-800 hover:border-pink-500/50 hover:shadow-2xl hover:shadow-purple-500/10 z-10"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl bg-neutral-800/80 text-neutral-300 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-300">
                    <Icon size={24} />
                  </div>
                  <div className="text-neutral-500 group-hover:text-pink-400 transition-colors">
                    <ExternalLink size={20} />
                  </div>
                </div>
                
                <div className="mb-4 flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
                      {article.category}
                    </span>
                    <span className="text-neutral-600 text-xs">•</span>
                    <span className="text-neutral-500 text-xs font-medium">
                      {article.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-neutral-200 group-hover:text-white transition-colors leading-snug">
                    {article.title}
                  </h3>
                </div>
                
                <div className="pt-4 border-t border-neutral-800/50 group-hover:border-pink-500/20 transition-colors mt-auto">
                  <span className="text-sm font-medium text-neutral-400">
                    Fuente: <span className="text-neutral-300 group-hover:text-pink-100 transition-colors">{article.source}</span>
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
