import { siFacebook, siInstagram, siWhatsapp } from "simple-icons";
import { ArrowUpRight } from "lucide-react";
import type { SimpleIcon } from "simple-icons";

function SocialIcon({ icon }: { icon: SimpleIcon }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-current"
      aria-hidden="true"
    >
      <path d={icon.path} />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-current"
      role="img"
      aria-label="LinkedIn"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

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
            <a href="#accueil" className="font-display text-3xl tracking-tight">
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

        <div className="flex flex-col justify-between gap-5 border-t border-white/10 pt-6 text-[10px] text-white/40 sm:flex-row sm:items-center">
          <p>© 2026 DavCréativ. Tous droits réservés.</p>

          <div className="flex items-center gap-5">
             <a
              href="mailto:contact@davcreativ.com"
              className="ml-1 inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-[#FFD700]"
            >
              Nous contacter 
              
            </a>
            <a
              href="https://www.facebook.com/TON_COMPTE/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-all duration-300 hover:-translate-y-0.5 hover:text-[#FFD700]"
            >
              <SocialIcon icon={siFacebook} />
            </a>

            <a
              href="https://www.instagram.com/TON_COMPTE/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-all duration-300 hover:-translate-y-0.5 hover:text-[#FFD700]"
            >
              <SocialIcon icon={siInstagram} />
            </a>

            <a
              href="https://wa.me/237XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="transition-all duration-300 hover:-translate-y-0.5 hover:text-[#FFD700]"
            >
              <SocialIcon icon={siWhatsapp} />
            </a>
            <a
              href="https://www.linkedin.com/company/TON_COMPTE/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-all duration-300 hover:-translate-y-0.5 hover:text-[#FFD700]"
            >
              <LinkedInIcon />
            </a>
           
          </div>
        </div>
      </div>
    </footer>
  );
}
