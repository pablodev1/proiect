import { IoColorWandOutline, IoCodeSlashOutline, IoBarChartOutline, IoCheckmarkDoneCircleSharp } from 'react-icons/io5';

// Datele detaliate pentru servicii
const detailedServices = [
  {
    icon: IoColorWandOutline,
    title: 'Web Design & UI/UX',
    description: 'Procesul nostru de design se concentrează pe crearea de experiențe digitale care nu doar arată excepțional, ci sunt și intuitive și eficiente. Transformăm viziunea ta într-un prototip interactiv și un design final impecabil.',
    includes: [
      'Analiză și strategie de brand',
      'Creare de wireframes și user flows',
      'Prototipuri interactive în Figma',
      'Design System personalizat',
      'Design responsive pentru mobil și tabletă',
    ]
  },
  {
    icon: IoCodeSlashOutline,
    title: 'Dezvoltare Full-Stack',
    description: 'Aducem designul la viață cu tehnologii de ultimă oră. Construim aplicații web rapide, scalabile și sigure, de la frontend la backend, asigurând o fundație tehnică solidă pentru afacerea ta.',
    includes: [
      'Dezvoltare Frontend (React, Next.js)',
      'Dezvoltare Backend (Node.js, Python)',
      'Baze de date (SQL, NoSQL)',
      'Integrare API-uri externe',
      'Implementare pe server',
    ]
  },
  {
    icon: IoBarChartOutline,
    title: 'Optimizare & Mentenanță',
    description: 'Un site excelent are nevoie de îngrijire constantă. Oferim pachete de mentenanță și optimizare pentru a asigura că site-ul tău rămâne performant, securizat și relevant pe termen lung.',
    includes: [
      'Monitorizare performanță (viteză de încărcare)',
      'Update-uri de securitate',
      'Backup-uri periodice',
      'Optimizare SEO On-Page',
      'Suport tehnic dedicat',
    ]
  }
];

export function ServicesPage() {
  return (
    <div className="w-full max-w-5xl py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="font-heading text-5xl font-bold">Servicii Complete</h1>
        <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
          De la concept la lansare și mentenanță, acoperim întregul ciclu de viață al unui produs digital.
        </p>
      </div>

      <div className="space-y-20">
        {detailedServices.map((service) => (
          <div key={service.title} className="grid md:grid-cols-2 gap-12 items-center">
            {/* Secțiunea Stânga: Titlu și Descriere */}
            <div className="text-left">
              <div className="inline-flex items-center gap-4 mb-4">
                <service.icon className="text-4xl text-primary" />
                <h2 className="font-heading text-3xl font-bold">{service.title}</h2>
              </div>
              <p className="text-slate-300">{service.description}</p>
            </div>

            {/* Secțiunea Dreapta: Ce este inclus */}
            <div className="bg-surface/60 border border-border p-8 rounded-2xl">
              <h4 className="font-heading text-lg font-semibold mb-4">Ce include acest serviciu:</h4>
              <ul className="space-y-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <IoCheckmarkDoneCircleSharp className="text-primary text-xl flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}