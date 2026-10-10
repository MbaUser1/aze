import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { MoveRight } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#1A1A1A] text-white"
    >
      <Reveal>
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-16 text-center sm:py-24 lg:py-28">
          {/* Halo doré */}
          <div className="gold-orb pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2" />

          {/* Cadre vitré */}
          <div className="glass-dark pointer-events-none absolute inset-3 rounded-2xl sm:inset-6 lg:inset-8" />

          {/* Contenu */}
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#FFD700] sm:text-xs">
              Votre prochaine idée commence ici
            </p>

            <h2 className="font-display mx-auto max-w-4xl text-balance text-4xl leading-[1.12] sm:text-6xl lg:text-7xl">
              Et si nous donnions vie à votre projet ?
            </h2>

            <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/55 sm:text-base">
              Une identité à construire, un site à développer ou une idée à
              concrétiser ? Échangeons sur vos ambitions.
            </p>

            <Button href="/contact" className="mt-9">
              Parlons de votre projet
              <MoveRight
                size={20}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
