import { IoCallOutline, IoMailOutline, IoLogoWhatsapp, IoLogoFacebook, IoLogoInstagram, IoLogoTiktok } from 'react-icons/io5';

// Definirea metodelor principale de contact
const contactMethods = [
  {
    icon: IoCallOutline,
    title: 'Telefonic',
    detail: '0741 771 939',
    href: 'tel:+40741771939',
    cta: 'Sună acum',
  },
  {
    icon: IoMailOutline,
    title: 'Email',
    detail: 'intelsat2016@gmail.com',
    href: 'mailto:intelsat2016@gmail.com',
    cta: 'Trimite un email',
  },
  {
    icon: IoLogoWhatsapp,
    title: 'WhatsApp',
    detail: 'Discuție rapidă și eficientă',
    href: 'https://wa.me/40741771939',
    cta: 'Începe conversația',
  },
];

// Definirea link-urilor sociale (folosim link-uri placeholder)
const socialLinks = [
    { icon: IoLogoFacebook, name: 'Facebook', href: '#' },
    { icon: IoLogoInstagram, name: 'Instagram', href: '#' },
    { icon: IoLogoTiktok, name: 'TikTok', href: '#' },
];

export function ContactPage() {
  return (
    <div className="w-full max-w-4xl py-12 px-4 flex flex-col items-center">
      <div className="text-center mb-16">
        <h1 className="font-heading text-5xl font-bold">Hai să Vorbim</h1>
        <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
          Suntem gata să ascultăm despre proiectul tău. Alege metoda de contact preferată.
        </p>
      </div>

      {/* Cardurile principale de contact */}
      <div className="w-full grid md:grid-cols-3 gap-8 mb-16">
        {contactMethods.map((method) => (
          <a
            key={method.title}
            href={method.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-surface border border-border p-8 rounded-2xl text-center flex flex-col items-center
                       transition-all duration-300 hover:border-primary hover:scale-105 hover:shadow-xl hover:shadow-primary/10"
          >
            <method.icon className="text-5xl text-primary mb-4" />
            <h3 className="font-heading text-xl font-bold">{method.title}</h3>
            <p className="text-slate-400 mt-1 flex-grow">{method.detail}</p>
            <span className="block mt-6 font-semibold text-primary group-hover:text-foreground transition-colors duration-300">
              {method.cta}
            </span>
          </a>
        ))}
      </div>

      {/* Secțiunea de social media */}
      <div className="text-center">
        <h3 className="font-heading text-xl font-semibold mb-4">Urmărește-ne</h3>
        <div className="flex justify-center gap-6">
            {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                    <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}
                       className="text-slate-400 hover:text-primary transition-colors duration-300 text-3xl">
                        <Icon />
                    </a>
                )
            })}
        </div>
      </div>
    </div>
  );
}