
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const courses = [
  {
    number: "01",
    title: "Design graphique",
    description:
      "Maîtrisez les principes visuels, la composition, la typographie et les outils de création.",
    level: "Fondamentaux → pratique",
  },
  {
    number: "02",
    title: "Design & intelligence artificielle",
    description:
      "Apprenez à utiliser l'IA comme un véritable outil de création, du concept au visuel final.",
    level: "Créativité augmentée",
  },
  {
    number: "03",
    title: "Création digitale",
    description:
      "Développez vos compétences en conception graphique et en production de contenus numériques.",
    level: "Atelier pratique",
  },
];

export default function Formations() {
  return (
    <section id="formations" className="section-padding bg-[#F7F7F5]">
      <div className="container-site">
        <Reveal>
          <div className="mb-12">
            <SectionHeading
              eyebrow="Transmettre & progresser"
              title="Développez votre potentiel créatif."
              description="Des formations orientées pratique pour apprendre à concevoir, expérimenter et produire avec méthode."
            />
          </div>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-3">
          {courses.map((course, index) => (
            <Reveal key={course.number} delay={index * 80}>
              <article className="glass-light glass-highlight h-full rounded-2xl p-6 sm:p-8">
                <span className="text-xs font-bold text-[#9B8300]">
                  FORMATION / {course.number}
                </span>

                <h3 className="font-display mt-8 text-3xl leading-tight">
                  {course.title}
                </h3>

                <p className="mt-4 min-h-20 text-sm leading-7 text-[#777]">
                  {course.description}
                </p>

                <div className="mt-6 border-t border-black/10 pt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#8A7400]">
                    {course.level}
                  </p>
                </div>

                <a
                  href={`mailto:contact@davcreativ.com?subject=${encodeURIComponent(`Renseignements — ${course.title}`)}`}
                  className="mt-7 inline-flex items-center gap-3 text-sm font-bold transition-colors hover:text-[#9B8300]"
                >
                  Demander des informations <span>↗</span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-7 text-xs leading-6 text-[#777]">
          Les programmes, dates et modalités sont à confirmer selon les
          prochaines sessions.
        </p>

        <div className="mt-8">
          <Button href="#contact">
            Organiser une formation <span>↗</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
