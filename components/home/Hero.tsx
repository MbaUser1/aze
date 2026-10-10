import Button from "@/components/ui/Button";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[760px] items-center overflow-hidden bg-[#1A1A1A] pb-20 pt-32 text-white lg:min-h-[800px]"
    >
      <div className="gold-orb pointer-events-none absolute left-1/2 top-[4%] h-[570px] w-[780px] -translate-x-1/2" />

      <div className="grid-texture pointer-events-none absolute inset-0 opacity-70" />

      <div className="pointer-events-none absolute -left-40 top-[45%] h-72 w-72 rounded-full bg-[#FFD700]/[0.035] blur-3xl" />

      <div className="container-site relative z-10 mx-auto text-center">
        <div className="glass-dark glass-highlight mx-auto mb-8 inline-flex items-center gap-3 rounded-full px-4 py-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFD700]/50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFD700]" />
          </span>
          <span className="text-[9px] font-bold uppercase text-white/75 sm:text-[11px]">
            Studio créatif · Design & Digital
          </span>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFD700]/50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFD700]" />
          </span>
        </div>

        <h1 className="font-display text-balance mx-auto max-w-[1000px] text-[clamp(3.1rem,8vw,7.4rem)] leading-[1.04] tracking-[-0.015em]">
          Nous donnons
          <br />
          forme à vos{" "}
          <span className="relative inline-block text-[#FFD700]">
            idées.
            <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-80" />
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-[570px] text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
          Nous associons créativité, design et technologie pour donner aux
          marques une identité forte et des expériences digitales qui ont du
          sens.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="#realisations" className="text-black">
            Explorer nos réalisations 
             <ArrowUpRight size={18} strokeWidth={1.8} />
          </Button>

          <Button href="#expertises" variant="glass" className="text-white" >
            Découvrir nos expertises 
            <ArrowDown size={18} strokeWidth={1.8} />
          </Button>
        </div>

        {/* <div className="mx-auto mt-16 grid max-w-[760px] grid-cols-3 gap-2 text-left sm:mt-20 sm:gap-4">
          {[
            ["01", "Design", "Des identités singulières"],
            ["02", "Digital", "Des expériences utiles"],
            ["03", "Créativité", "Des idées qui avancent"],
          ].map(([number, title, subtitle]) => (
            <div
              key={number}
              className="glass-dark glass-highlight rounded-xl p-3 sm:rounded-2xl sm:p-5"
            >
              <span className="text-[9px] text-[#FFD700] sm:text-[10px]">
                / {number}
              </span>
              <p className="font-display mt-3 text-lg sm:text-2xl">
                {title}
              </p>
              <p className="mt-2 text-[9px] leading-4 text-white/45 sm:text-xs">
                {subtitle}
              </p>
            </div>
          ))}
        </div> */}

        {/* Barre créative animée */}
        <div className="hero-marquee-shell relative left-1/2 z-10 mt-14 w-screen -translate-x-1/2 overflow-hidden border-y border-white/15 bg-white/[0.045] py-5 backdrop-blur-xl sm:py-6">
  <div
    className="hero-marquee-track"
    aria-label="Créer, imaginer, concevoir, transformer"
  >
            {[0, 1].map((group) => (
              <div
                key={group}
                className="hero-marquee-group"
                aria-hidden={group === 1 ? true : undefined}
              >
                <span>Créer.</span>
                <span className="hero-marquee-star"><Sparkles size={18} strokeWidth={1.8} /></span>
                <span>Imaginer.</span>
                <span className="hero-marquee-star"><Sparkles size={18} strokeWidth={1.8} /></span>
                <span>Concevoir.</span>
                <span className="hero-marquee-star"><Sparkles size={18} strokeWidth={1.8} /></span>
                <span>Transformer.</span>
                <span className="hero-marquee-star"><Sparkles size={18} strokeWidth={1.8} /></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="gold-line absolute inset-x-0 bottom-0" />
    </section>
  );
}
