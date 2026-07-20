import { motion } from 'motion/react';

export default function Contact() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-neutral-950">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-serif">
            Trabajemos Juntes
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Si deseas colaborar, invitarme a dar una charla o tienes algún proyecto en mente, déjame un mensaje.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Formulario adaptado para Netlify Forms y FormSubmit como respaldo */}
          <form 
            action="https://formsubmit.co/soy@mimacortez.com" 
            method="POST" 
            data-netlify="true"
            name="contacto"
            className="bg-neutral-900/80 p-8 rounded-3xl border border-neutral-800 shadow-xl backdrop-blur-sm relative"
          >
            {/* Campos ocultos de seguridad y configuración */}
            <input type="text" name="_honey" style={{ display: 'none' }} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="form-name" value="contacto" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="email" className="text-sm font-medium text-neutral-300">
                  Correo Electrónico *
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all" 
                  placeholder="tu@email.com" 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-neutral-300">
                  Teléfono
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all" 
                  placeholder="+1 234 567 890" 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium text-neutral-300">
                  País
                </label>
                <input 
                  type="text" 
                  id="country" 
                  name="country" 
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all" 
                  placeholder="Ej. Venezuela, España..." 
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="motive" className="text-sm font-medium text-neutral-300">
                  Motivo de Contacto *
                </label>
                <select 
                  id="motive" 
                  name="motive" 
                  required 
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all appearance-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>Selecciona una opción...</option>
                  <option value="Prensa / Entrevistas">Prensa / Entrevistas</option>
                  <option value="Colaboración Artística">Colaboración Artística</option>
                  <option value="Diseño de Moda / Styling">Diseño de Moda / Styling</option>
                  <option value="Tarot Afro Queer">Tarot Afro Queer</option>
                  <option value="Activismo / Charlas">Activismo / Charlas</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="mt-8 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:from-purple-500 hover:via-pink-400 hover:to-orange-300 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-pink-500/25"
            >
              Enviar Mensaje
            </button>
          </form>
        </motion.div>
      </div>
      
      {/* Abstract Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none blur-3xl -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-orange-400 rounded-full"></div>
      </div>
    </section>
  );
}
