export function AboutSection() {
  return (
    <section className="w-full max-w-6xl py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Partea stângă - Imagine */}
        <div className="w-full h-96 bg-surface rounded-2xl border border-border overflow-hidden">
          {/* Vom folosi un placeholder. Aici poți adăuga o poză cu tine sau un element grafic. */}
          <img 
            src="https://placehold.co/800x1000/1A1A1A/f8fafc?text=Fabrica+de+Design" 
            alt="Imagine reprezentativă Fabrica de Design"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Partea dreaptă - Text */}
        <div className="text-left">
          <span className="font-heading text-primary font-semibold">Cine suntem?</span>
          <h2 className="font-heading text-4xl font-bold mt-2 mb-6 text-white">
            Artizani Digitali cu o Misiune
          </h2>
          <div className="space-y-4 text-slate-300 font-body text-lg">
            <p>
              Nu suntem doar o altă agenție. Suntem "Fabrica de Design", un colectiv de creatori pasionați care cred că un design bun înseamnă mai mult decât estetică. Înseamnă funcționalitate, emoție și, cel mai important, rezultate.
            </p>
            <p>
              Abordarea noastră este neconformistă. Spargem tiparele și explorăm teritorii noi pentru a construi experiențe digitale care nu sunt doar văzute, ci simțite. Fiecare pixel, fiecare linie de cod și fiecare interacțiune sunt gândite pentru a lăsa o amprentă memorabilă.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}