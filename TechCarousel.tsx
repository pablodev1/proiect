import { SiReact, SiNodedotjs, SiPython, SiFigma, SiVite, SiTailwindcss, SiNextdotjs, SiPostgresql } from 'react-icons/si';

const technologies = [
  { name: 'React', icon: SiReact },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Python', icon: SiPython },
  { name: 'Figma', icon: SiFigma },
  { name: 'Vite', icon: SiVite },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'PostgreSQL', icon: SiPostgresql },
];

export function TechCarousel() {
  // Duplicăm lista pentru a umple spațiul și a crea un loop fluid
  const extendedTechList = [...technologies, ...technologies];

  return (
    <section className="w-full max-w-6xl py-12">
      <div 
        className="relative w-full overflow-hidden 
                   before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-24 before:bg-gradient-to-r before:from-background before:to-transparent
                   after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-24 after:bg-gradient-to-l after:from-background after:to-transparent"
      >
        <div className="flex animate-scrolling hover:[animation-play-state:paused]">
          {extendedTechList.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div key={index} className="flex flex-shrink-0 items-center justify-center mx-10 group" title={tech.name}>
                <Icon className="text-5xl text-slate-500 transition-colors duration-300 group-hover:text-foreground" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}