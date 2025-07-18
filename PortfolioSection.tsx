import { IoArrowForward } from 'react-icons/io5';

// Date demonstrative pentru proiecte
const projects = [
  {
    title: 'Platformă E-commerce - TechNext',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    imageUrl: 'https://placehold.co/600x400/1A1A1A/f8fafc?text=TechNext',
    link: '#',
  },
  {
    title: 'Branding & Website - Astro Finance',
    tags: ['UI/UX', 'Figma', 'Webflow'],
    imageUrl: 'https://placehold.co/600x400/1A1A1A/f8fafc?text=Astro+Finance',
    link: '#',
  },
  {
    title: 'SaaS Dashboard - DataViz',
    tags: ['TypeScript', 'Vite', 'Tailwind CSS'],
    imageUrl: 'https://placehold.co/600x400/1A1A1A/f8fafc?text=DataViz',
    link: '#',
  },
  {
    title: 'Aplicație Mobilă - ConnectSphere',
    tags: ['React Native', 'Firebase', 'Design System'],
    imageUrl: 'https://placehold.co/600x400/1A1A1A/f8fafc?text=ConnectSphere',
    link: '#',
  },
];

export function PortfolioSection() {
  return (
    <section className="w-full max-w-6xl text-center py-20">
      <h2 className="font-heading text-4xl font-bold mb-4 text-white">Proiecte de care suntem Mândri</h2>
      <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12">
        Fiecare proiect este o nouă provocare și o poveste de succes.
      </p>

      {/* Grila cu cardurile de portofoliu */}
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            className="group block bg-surface border border-border rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="relative">
              {/* Imaginea cu efect de zoom la hover */}
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay-ul care apare la hover */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="text-center">
                  <h4 className="font-heading text-2xl text-white">Vezi Proiectul</h4>
                  <IoArrowForward className="text-white text-4xl mx-auto mt-2" />
                </div>
              </div>
            </div>
            <div className="p-6 text-left">
              <h3 className="font-heading text-xl font-bold">{project.title}</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.map((tag) => (
                  <span key={tag} className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}