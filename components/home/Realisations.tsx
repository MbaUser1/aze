"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import { ArrowUpRight, MoveLeft, MoveRight } from "lucide-react";

const categories = [
  "Design graphique",
  "Développement web",
  "Design produit & Packaging",
] as const;

type Category = (typeof categories)[number];

export default function Realisations() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("Design graphique");

  const filteredProjects = projects.filter(
    (project) => project.category === activeCategory,
  );

  const activeIndex = categories.indexOf(activeCategory);

  function navigateCategory(direction: -1 | 1) {
    const nextIndex =
      (activeIndex + direction + categories.length) % categories.length;

    setActiveCategory(categories[nextIndex]);
  }

  return (
    <section
      id="realisations"
      className="relative overflow-hidden bg-[#FFFFFF] py-24 text-[#1A1A1A] sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-[#FFD700]/10 blur-[120px]"
      />

      <div className="container-site relative z-10">
        {/* Titre centré */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-5 inline-flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-black/50">
              <span className="h-px w-7 bg-[#FFD700]" />
              Notre savoir-faire en action
              <span className="h-px w-7 bg-[#FFD700]" />
            </span>

            <h2 className="font-display text-4xl leading-[1.05]  sm:text-5xl lg:text-7xl">
              Des idées qui
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">prennent forme.</span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 left-0 -z-0 h-3 w-full bg-[#FFD700]/80 sm:bottom-2 sm:h-4"
                />
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-black/55 sm:text-base">
              Découvrez une sélection de projets où créativité, précision et
              réflexion stratégique donnent vie à des expériences singulières.
            </p>
          </div>
        </Reveal>

        {/* Navigation entre les expertises */}
        <Reveal delay={100}>
          <div className="mx-auto mt-12 flex max-w-4xl items-center justify-between gap-3 sm:mt-14">
            <button
              type="button"
              onClick={() => navigateCategory(-1)}
              aria-label="Expertise précédente"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/70 text-xl transition-all duration-300 hover:border-[#FFD700] hover:bg-[#FFD700] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B89B00]"
            >
              <MoveLeft
                size={20}
                strokeWidth={1.8}
                className="transition-transform duration-300"
              />
            </button>

            <div
              className="flex flex-1 flex-wrap items-center justify-center gap-2 sm:gap-3"
              aria-label="Filtrer les réalisations par expertise"
            >
              {categories.map((category) => {
                const active = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-3 text-xs font-semibold transition-all duration-300 sm:px-5 sm:text-sm ${
                      active
                        ? "border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-[0_6px_20px_rgba(26,26,26,0.12)]"
                        : "border-black/10 bg-white/60 text-black/60 hover:border-[#D5B400] hover:text-[#1A1A1A]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => navigateCategory(1)}
              aria-label="Expertise suivante"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/70 text-xl transition-all duration-300 hover:border-[#FFD700] hover:bg-[#FFD700] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B89B00]"
            >
              <MoveRight
                size={20}
                strokeWidth={1.8}
                className="transition-transform duration-300"
              />
            </button>
          </div>
        </Reveal>

        {/* Indicateur de catégorie */}
        <div className="mb-6 mt-12 flex items-center justify-between border-b border-black/10 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
            {activeCategory}
          </p>

          <p className="text-xs tabular-nums text-black/45">
            {String(filteredProjects.length).padStart(2, "0")} projet
            {filteredProjects.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Réalisations filtrées */}
        {filteredProjects.length > 0 ? (
          <div
            key={activeCategory}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project, index) => (
              <Reveal key={project.title} delay={index * 70}>
                <a
                  href={project.href}
                  className="group block h-full"
                  aria-label={`Découvrir le projet ${project.title}`}
                >
                  <article className="project-glow-card h-full rounded-3xl border border-black/[0.06] bg-white/70 p-4 transition-all duration-300 hover:border-[#FFD700]/80 hover:shadow-[0_16px_40px_rgba(26,26,26,0.07)] sm:p-5">
                    <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                      <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/75 text-lg text-[#1A1A1A] shadow-sm backdrop-blur-xl transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#FFD700]">
                        <ArrowUpRight
                size={20}
                strokeWidth={1.8}
                className="transition-transform duration-300"
              />
                      </span>

                      <span className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-white/75 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] backdrop-blur-xl">
                        {project.category}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4 px-1 pt-5">
                      <div>
                        <h3 className="font-display text-xl tracking-tight transition-colors duration-300 group-hover:text-[#8F7800] sm:text-2xl">
                          {project.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-black/55">
                          {project.description}
                        </p>
                      </div>

                      <span
                        aria-hidden="true"
                        className="mt-1 text-lg text-black/35 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#8F7800]"
                      >
                              {/* <ArrowUpRight
                size={20}
                strokeWidth={1.8}
                className="transition-transform duration-300"
              /> */}
                      </span>
                    </div>
                  </article>
                </a>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-black/15 bg-white/50 px-6 py-16 text-center">
            <p className="font-display text-2xl">
              De nouveaux projets arrivent.
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-black/55">
              Cette catégorie sera enrichie au fur et à mesure de nos
              réalisations.
            </p>
          </div>
        )}

        {/* Navigation inférieure */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-label={`Afficher ${category}`}
              aria-pressed={activeCategory === category}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "w-10 bg-[#FFD700]"
                  : "w-4 bg-black/15 hover:bg-black/35"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
