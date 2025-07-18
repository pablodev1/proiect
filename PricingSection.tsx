import { IoCheckmarkCircle } from 'react-icons/io5';

// Definirea pachetelor
const packages = [
  {
    name: 'Pachetul Start',
    price: '499€',
    description: 'Soluția perfectă pentru a lansa o prezență online profesională.',
    features: [
      'Site de prezentare (până la 5 pagini)',
      'Design personalizat',
      'Optimizare mobilă',
      'Formular de contact',
    ],
    isFeatured: false,
  },
  {
    name: 'Pachetul Pro',
    price: '999€',
    description: 'Ideal pentru afaceri în creștere care au nevoie de mai multă funcționalitate.',
    features: [
      'Totul din pachetul Start',
      'Sistem de blog sau portofoliu',
      'Integrare rețele sociale',
      'Optimizare SEO de bază',
    ],
    isFeatured: true, // Acesta va fi pachetul evidențiat
  },
  {
    name: 'Pachetul Enterprise',
    price: 'Custom',
    description: 'Soluții complet personalizate pentru proiecte complexe și cerințe unice.',
    features: [
      'Totul din pachetul Pro',
      'Funcționalități E-commerce',
      'Dashboard de administrare',
      'Suport prioritar',
    ],
    isFeatured: false,
  },
];

export function PricingSection() {
  return (
    <section className="w-full max-w-6xl text-center py-20">
      <h2 className="font-heading text-4xl font-bold mb-4 text-white">Pachete Flexibile pentru Orice Nevoie</h2>
      <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12">
        Alege planul care se potrivește perfect cu viziunea și bugetul tău.
      </p>

      <div className="grid md:grid-cols-3 gap-8 items-center">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`bg-surface border rounded-2xl p-8 flex flex-col h-full
                        transition-all duration-300
                        ${pkg.isFeatured ? 'border-primary scale-105 shadow-2xl shadow-primary/20' : 'border-border'}`}
          >
            <h3 className="font-heading text-2xl font-bold">{pkg.name}</h3>
            <p className="text-slate-400 mt-2 min-h-[40px]">{pkg.description}</p>
            <div className="my-8">
              <span className="text-5xl font-bold font-heading">{pkg.price}</span>
              {pkg.price !== 'Custom' && <span className="text-slate-400"> / proiect</span>}
            </div>
            <ul className="space-y-4 text-left mb-8 flex-grow">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <IoCheckmarkCircle className="text-primary text-xl flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`font-heading text-white font-bold py-3 px-8 rounded-full text-lg mt-auto
                          transition-all duration-300 hover:scale-105
                          ${pkg.isFeatured ? 'bg-accent-gradient' : 'bg-surface hover:bg-primary/20 border border-primary'}`}
            >
              Alege Pachetul
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}