import { IoColorWandOutline, IoCodeSlashOutline, IoBarChartOutline } from 'react-icons/io5';

const services = [
  {
    icon: IoColorWandOutline,
    title: 'Web Design & UI/UX',
    description: 'Creăm interfețe vizuale uimitoare, intuitive și centrate pe utilizator, care nu doar arată bine, ci și convertesc.'
  },
  {
    icon: IoCodeSlashOutline,
    title: 'Dezvoltare Full-Stack',
    description: 'Transformăm designul în realitate cu cod curat și performant. Construim totul, de la site-uri de prezentare la aplicații web complexe.'
  },
  {
    icon: IoBarChartOutline,
    title: 'Optimizare & Mentenanță',
    description: 'Asigurăm că site-ul tău este rapid, securizat și mereu la zi, oferind pachete de mentenanță adaptate nevoilor tale.'
  }
];

export function ServicesSection() {
  return (
    <section className="w-full max-w-5xl text-center py-20">
      <h2 className="font-heading text-4xl font-bold mb-4 text-white">Servicii Create pentru Impact</h2>
      <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12">
        Combinăm arta cu tehnologia pentru a oferi soluții digitale complete.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div 
              key={index}
              className="bg-surface/60 border border-border p-8 rounded-2xl text-left
                         transition-all duration-300 hover:border-primary hover:scale-105 hover:shadow-xl hover:shadow-primary/10"
            >
              <Icon className="text-4xl text-primary mb-4" />
              <h3 className="font-heading text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-slate-400 font-body">{service.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}