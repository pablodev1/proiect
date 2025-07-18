import { ServicesSection } from '../components/ServicesSection.tsx';
import { PricingSection } from '../components/PricingSection.tsx';
import { PortfolioSection } from '../components/PortfolioSection.tsx';
import { AboutSection } from '../components/AboutSection.tsx';
import { TechCarousel } from '../components/TechCarousel.tsx'; // Importăm noua componentă

export function HomePage() {
  return (
    <>
      <main className="w-full max-w-4xl text-center">
        <div className="bg-surface/60 border border-border p-10 rounded-2xl backdrop-blur-xl shadow-2xl shadow-primary/10">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-5 leading-tight text-white">
            Modelăm Prezența Ta Digitală.
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            Design neconformist pentru branduri care îndrăznesc să fie diferite. La Fabrica de Design, transformăm ideile în experiențe digitale memorabile.
          </p>
          <button className="font-heading text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 bg-accent-gradient tracking-wider">
            Începe un Proiect
          </button>
        </div>
      </main>

      <AboutSection />

      {/* Aici adăugăm caruselul de tehnologii */}
      <TechCarousel />

      <ServicesSection />
      
      <PricingSection />

      <PortfolioSection />
    </>
  );
}