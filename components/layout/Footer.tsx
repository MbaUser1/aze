
const footerLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Expertises", href: "#expertises" },
  { label: "Réalisations", href: "#realisations" },
  { label: "À propos", href: "#apropos" },
  { label: "Formations", href: "#formations" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="container-site py-10">
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-8 md:flex-row md:items-center">
          <div>
            <a
              href="#accueil"
              className="font-display text-3xl tracking-tight"
            >
              DavCréativ<span className="text-[#FFD700]">®</span>
            </a>
            <p className="mt-3 text-xs text-white/45">
              Studio créatif · Design graphique & Digital
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-white/55 transition-colors hover:text-[#FFD700]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col justify-between gap-3 pt-6 text-[10px] text-white/40 sm:flex-row">
          <p>
            © 2026 DavCréativ. Tous droits réservés.
          </p>
          <a
            href="mailto:contact@davcreativ.com"
            className="transition-colors hover:text-[#FFD700]"
          >
            Nous contacter ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
