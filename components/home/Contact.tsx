
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="section-padding bg-[#F7F7F5]">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[#1A1A1A] px-6 py-14 text-center text-white sm:px-12 sm:py-20 lg:px-20">
            <div className="gold-orb pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2" />

            <div className="glass-dark absolute inset-4 rounded-2xl sm:inset-6" />

            <div className="relative z-10">
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#FFD700]">
                Votre prochaine idée commence ici
              </p>

              <h2 className="font-display mx-auto max-w-4xl text-balance text-5xl leading-[1.12] sm:text-6xl lg:text-7xl">
                Et si nous donnions vie à votre projet ?
              </h2>

              <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/55 sm:text-base">
                Une identité à construire, un site à développer ou une idée
                à concrétiser ? Échangeons sur vos ambitions.
              </p>

              <Button
                href="mailto:contact@davcreativ.com?subject=Parlons%20de%20mon%20projet"
                className="mt-9"
              >
                Parlons de votre projet <span>↗</span>
              </Button>

              <p className="mt-5 text-[10px] text-white/40">
                Remplacez l'adresse e-mail par votre contact professionnel.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
