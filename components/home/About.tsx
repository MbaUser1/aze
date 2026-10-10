
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  return (
    <section id="apropos" className="section-padding relative overflow-hidden bg-[#1A1A1A] text-white">
      <div className="gold-orb pointer-events-none absolute -right-40 top-0 h-[500px] w-[600px]" />

      <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
        <Reveal>
          <div>
            <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#FFD700]">
              <span className="h-px w-8 bg-[#FFD700]" />
              Qui sommes-nous ?
            </p>

            <h2 className="font-display text-balance text-5xl leading-[1.12] sm:text-6xl lg:text-7xl">
              Nous créons avec intention.
              <span className="mt-2 block text-[#FFD700]">
                Nous concevons pour durer.
              </span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="glass-dark glass-highlight rounded-3xl p-6 sm:p-9">
            <p className="text-sm leading-8 text-white/65 sm:text-base">
              DavCréativ est un studio créatif qui associe design graphique,
              technologie et réflexion pour donner vie aux idées et accompagner
              les marques dans leur développement.
            </p>

            <p className="mt-5 text-sm leading-8 text-white/65 sm:text-base">
              Nous recherchons le bon équilibre entre esthétique, cohérence
              et utilité. Chaque création doit exprimer une identité et
              répondre à un objectif concret.
            </p>

            <div className="my-7 gold-line" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-display text-2xl text-[#FFD700]">Créativité</p>
                <p className="mt-2 text-[10px] text-white/45">
                  Des idées singulières
                </p>
              </div>
              <div>
                <p className="font-display text-2xl text-[#FFD700]">Précision</p>
                <p className="mt-2 text-[10px] text-white/45">
                  Un travail maîtrisé
                </p>
              </div>
            </div>

            <Button href="#contact" className="mt-8">
              Travaillons ensemble <span>↗</span>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
