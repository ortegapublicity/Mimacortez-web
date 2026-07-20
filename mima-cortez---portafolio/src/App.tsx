import Hero from './components/Hero';
import Press from './components/Press';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-pink-500/30 selection:text-pink-200 font-sans">
      <main>
        <Hero />
        <Press />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
