
import Reveal from "@/components/ui/Reveal";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { services } from "@/data/services";

const serviceDetails: Record<
  string,
  { description: string; icon: string }
> = {
  "Design graphique": {
    description:
      "Des identités visuelles fortes et des supports qui donnent du caractère à votre marque.",
    icon: "design",
  },
  "Développement Web": {
    description:
      "Des expériences web modernes, rapides et pensées pour convertir vos visiteurs.",
    icon: "web",
  },
  "Développement Mobile": {
    description:
      "Des applications intuitives qui rapprochent vos services de vos utilisateurs.",
    icon: "mobile",
  },
  "Communication digitale": {
    description:
      "Une présence digitale cohérente pour raconter votre histoire et toucher votre audience.",
    icon: "communication",
  },
  "Design produit & Packaging": {
    description:
      "Des concepts visuels qui valorisent vos produits et renforcent leur impact.",
    icon: "packaging",
  },
  "Formations créatives": {
    description:
      "Des compétences concrètes pour maîtriser les outils et développer votre potentiel créatif.",
    icon: "formation",
  },
  "Impression numérique": {
    description:
      "Des supports imprimés soignés, du fichier final au rendu physique.",
    icon: "print",
  },
  "Autres services numériques": {
    description:
      "Des solutions adaptées à vos besoins pour donner vie à vos idées.",
    icon: "digital",
  },
};

function ServiceIcon({ name }: { name: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      aria-hidden="true"
      {...common}
    >
      {name === "design" && (
        <>
          <path d="m14.5 4 5.5 5.5L9 20.5 3.5 21l.5-5.5L14.5 4Z" />
          <path d="m12.5 6 5.5 5.5M4 16l4 4" />
          <path d="M4 4h4M6 2v4M18 16h3M19.5 14.5v3" />
        </>
      )}

      {name === "web" && (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
          <path d="m9 13-2 2 2 2M15 13l2 2-2 2M13.5 12l-3 6" />
        </>
      )}

      {name === "mobile" && (
        <>
          <rect x="7" y="2.5" width="10" height="19" rx="2" />
          <path d="M10 5h4M11 18.5h2" />
          <path d="m10 10 2 2 2-2" />
        </>
      )}

      {name === "communication" && (
        <>
          <path d="M4 11v2a2 2 0 0 0 2 2h2l5 4v-5" />
          <path d="M8 8H5a2 2 0 0 0-2 2v3" />
          <path d="M8 8 18 4v16L8 15V8Z" />
          <path d="M19 9h2M19 15h2" />
        </>
      )}

      {name === "packaging" && (
        <>
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
          <path d="m4 7.5 8 4.5 8-4.5M12 12v9M8 5.2l8 4.6" />
        </>
      )}

      {name === "formation" && (
        <>
          <path d="m2.5 8 9.5-5 9.5 5-9.5 5-9.5-5Z" />
          <path d="M6 10v5c3.5 3 8.5 3 12 0v-5M21.5 8v7" />
        </>
      )}

      {name === "print" && (
        <>
          <path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <path d="M7 14h10v7H7zM17 11h.01" />
        </>
      )}

      {name === "digital" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </>
      )}
    </svg>
  );
}

export default function Expertises() {
  return (
    <section
      id="expertises"
      className="relative overflow-hidden bg-[#F7F7F4] py-24 text-[#1A1A1A] sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#FFD700]/10 blur-[120px]"
      />

      <div className="container-site relative z-10">
        <Reveal>
          <div className="mb-14 flex flex-col gap-8 border-b border-black/10 pb-9 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="mb-5 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-black/50">
                <span className="h-px w-8 bg-[#B89B00]" />
                Ce que nous faisons
              </span>

              <h2 className="font-display text-4xl leading-[1.05]  sm:text-5xl lg:text-7xl">
                Nos expertises,
                <br />
                <span className="text-black/35">votre prochain</span>{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">impact.</span>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-1 left-0 -z-0 h-3 w-full bg-[#FFD700] sm:bottom-2 sm:h-4"
                  />
                </span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-black/60 sm:text-base">
              Nous associons créativité, stratégie et technologie pour
              transformer vos idées en solutions utiles, distinctives et
              durables.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const title = service.title;
            const details = serviceDetails[title] ?? {
              description:
                "Des solutions créatives et adaptées pour faire avancer vos projets.",
              icon: "digital",
            };

            return (
              <Reveal key={title} delay={index * 60}>
                <article className="group relative flex h-full min-h-[285px] flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white/65 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#D5B400]/60 hover:bg-white hover:shadow-[0_18px_50px_rgba(26,26,26,0.08)] sm:p-7">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#FFD700]/0 blur-3xl transition-colors duration-500 group-hover:bg-[#FFD700]/30"
                  />

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4B000]/20 bg-[#FFD700]/15 text-[#796600] transition-all duration-300 group-hover:rotate-[-4deg] group-hover:border-[#FFD700]/60 group-hover:bg-[#FFD700] group-hover:text-[#1A1A1A]">
                      <ServiceIcon name={details.icon} />
                    </div>

                    <span className="font-display text-sm tracking-widest text-black/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative z-10 mt-auto pt-9">
                    <h3 className="max-w-[260px] font-display text-xl leading-snug tracking-[-0.0012rem] sm:text-2xl ">
                      {title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-black/55">
                      {details.description}
                    </p>

                    <div
                      aria-hidden="true"
                      className="mt-6 h-px w-10 bg-[#D0B000] transition-all duration-500 group-hover:w-full"
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

       <Reveal delay={150}>
  <div className="group relative mt-10 overflow-hidden rounded-3xl border border-white/[0.10] bg-[#1A1A1A] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.18)] transition-all duration-500 hover:border-[#FFD700]/30 sm:p-8 lg:p-10">
    {/* Reflets dorés */}
    <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#FFD700]/[0.09] blur-[90px] transition-all duration-700 group-hover:bg-[#FFD700]/[0.15]" />
    <div className="pointer-events-none absolute -bottom-28 left-[30%] h-48 w-48 rounded-full bg-[#FFD700]/[0.04] blur-[80px]" />

    {/* Texture décorative */}
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.035),transparent_45%,rgba(255,215,0,0.025))]" />

    <div className="relative z-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
      <div className="max-w-2xl">
        <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/[0.06] px-3.5 py-2">
          <Sparkles
            size={14}
            strokeWidth={1.7}
            className="text-[#FFD700]"
          />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFD700]/90">
            Donnons vie à vos idées
          </span>
        </div>

        <h3 className="font-display text-2xl font-semibold leading-tight tracking-[0.05em] text-white sm:text-3xl lg:text-4xl">
          Une idée en tête ?
          <span className="text-[#FFD700]">
            {" "}Créons quelque chose d’unique.
          </span>
        </h3>

        <p className="mt-4 max-w-2lg text-sm leading-7 text-white/55 sm:text-base">
          Construisons ensemble une solution créative, pertinente et à votre image.
        </p>
      </div>

      <a
        href="#contact"
        className="group/button inline-flex min-h-14 shrink-0 items-center justify-center gap-5 self-start rounded-full bg-[#FFD700] py-2 pl-6 pr-2 text-sm font-bold text-[#1A1A1A] shadow-[0_8px_30px_rgba(255,215,0,0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFE34D] hover:shadow-[0_12px_36px_rgba(255,215,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1A1A1A] sm:self-auto"
      >
        <span>Parlons de votre projet</span>

        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A]/[0.09] transition-all duration-300 group-hover/button:rotate-45 group-hover/button:bg-[#1A1A1A]/[0.14]">
          <ArrowUpRight size={20} strokeWidth={1.8} />
        </span>
      </a>
    </div>
  </div>
</Reveal>
      </div>
    </section>
  );
}
