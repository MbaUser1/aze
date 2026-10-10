"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/client";
import type { ArticleRow } from "@/lib/articles";

type Category =
  | "Tout"
  | "Design graphique"
  | "Identité visuelle"
  | "Web & digital"
  | "Intelligence artificielle"
  | "Conseils";

const categories: Category[] = [
  "Tout",
  "Design graphique",
  "Identité visuelle",
  "Web & digital",
  "Intelligence artificielle",
  "Conseils",
];

function formatDate(date: string | null) {
  if (!date) return "Récemment publié";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
    >
      {diagonal ? (
        <path
          d="M7 17 17 7M7 7h10v10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M4.5 12h14m-6-6 6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArticleMeta({ article }: { article: ArticleRow }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#77776F]">
      <span>{article.category}</span>
      <span className="h-1 w-1 rounded-full bg-[#FFD700]" />
      <span className="inline-flex items-center gap-1.5 normal-case tracking-normal">
        <ClockIcon />
        {article.reading_time} min de lecture
      </span>
    </div>
  );
}

function ArticleCard({ article }: { article: ArticleRow }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1A1A1A]/[0.07] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#FFD700]/60 hover:shadow-[0_18px_50px_rgba(26,26,26,0.07)]">
      <Link
        href={`/ressources/${article.slug}`}
        aria-label={`Lire : ${article.title}`}
        className="relative block aspect-[1.55/1] overflow-hidden bg-[#E9E7E0]"
      >
        {article.image ? (
          <img
            src={article.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#1A1A1A] to-[#454539]" />
        )}

        <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-[#1A1A1A]/75 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-white backdrop-blur-md">
          {article.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <ArticleMeta article={article} />

        <h3 className="mt-4 font-display text-xl leading-snug text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#8B7200] sm:text-[22px]">
          <Link href={`/ressources/${article.slug}`}>{article.title}</Link>
        </h3>

        <p className="mt-3 flex-1 text-sm leading-7 text-[#686860]">
          {article.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-[#1A1A1A]/[0.07] pt-4">
          <span className="text-[11px] text-[#85857C]">
            {formatDate(article.published_at)}
          </span>

          <Link
            href={`/ressources/${article.slug}`}
            aria-label={`Lire l'article : ${article.title}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1A1A1A]/10 text-[#1A1A1A] transition duration-300 group-hover:border-[#FFD700] group-hover:bg-[#FFD700]"
          >
            <ArrowIcon diagonal />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function RessourcesPage() {
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("Tout");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let active = true;

    async function loadArticles() {
      const supabase = createClient();

      try {
        const { data, error: queryError } = await supabase
          .from("articles")
          .select("*")
          .eq("status", "published")
          .order("published_at", { ascending: false });

        if (!active) return;

        if (queryError) {
          setError("Impossible de charger les articles. Veuillez réessayer.");
          return;
        }

        setArticles((data ?? []) as ArticleRow[]);
      } catch {
        if (active) {
          setError("Une erreur est survenue lors du chargement des articles.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadArticles();

    return () => {
      active = false;
    };
  }, []);

  const featuredArticle = articles.find((article) => article.featured);

  const filteredArticles = useMemo(() => {
    return articles
      .filter((article) => !article.featured)
      .filter(
        (article) =>
          activeCategory === "Tout" || article.category === activeCategory,
      )
      .filter((article) => {
        const query = search.trim().toLocaleLowerCase("fr");

        return (
          !query ||
          article.title.toLocaleLowerCase("fr").includes(query) ||
          article.excerpt.toLocaleLowerCase("fr").includes(query) ||
          article.category.toLocaleLowerCase("fr").includes(query)
        );
      });
  }, [articles, activeCategory, search]);

  const featuredVisible =
    !!featuredArticle &&
    !search.trim() &&
    (activeCategory === "Tout" ||
      featuredArticle.category === activeCategory);

  return (
    <>
      <Header />

      <main className="overflow-hidden bg-[#F7F7F4] text-[#1A1A1A]">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-[#1A1A1A] px-5 pb-16 pt-36 text-white sm:px-8 sm:pb-20 sm:pt-40 lg:px-12 lg:pb-24 lg:pt-44">
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-70" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-24 -z-10 h-[420px] w-[420px] rounded-full bg-[#FFD700]/10 blur-[130px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 left-[10%] -z-10 h-80 w-80 rounded-full bg-[#FFD700]/[0.05] blur-[110px]"
          />

          <div className="mx-auto max-w-7xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-9 bg-[#FFD700]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/55 sm:text-xs">
                Le journal DavCréativ
              </span>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <h1 className="max-w-4xl font-display text-5xl leading-[1.04] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px]">
                  Idées, réflexions
                  <br />
                  <span className="text-[#FFD700]">& ressources.</span>
                </h1>
              </div>

              <div className="max-w-md lg:justify-self-end lg:pb-2">
                <p className="text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                  Des idées pour créer avec intention, penser autrement et faire
                  évoluer vos projets. Un espace pour apprendre, explorer et
                  nourrir votre regard créatif.
                </p>

                <a
                  href="#articles"
                  className="group mt-7 inline-flex items-center gap-3 text-xs font-bold text-white transition hover:text-[#FFD700]"
                >
                  Explorer les ressources
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition group-hover:border-[#FFD700] group-hover:bg-[#FFD700] group-hover:text-[#1A1A1A]">
                    <ArrowIcon />
                  </span>
                </a>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5 sm:mt-16">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                Culture créative · Savoir-faire · Inspiration
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                {articles.length.toString().padStart(2, "0")} contenus à
                explorer
              </span>
            </div>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="px-5 pb-10 pt-16 sm:px-8 sm:pb-12 sm:pt-20 lg:px-12 lg:pt-24">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-[0.7fr_1.3fr] md:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B7200]">
                Notre espace d'idées
              </p>
              <h2 className="mt-3 max-w-sm font-display text-3xl leading-tight sm:text-4xl">
                La créativité commence par une idée.
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-[#686860] md:justify-self-end md:text-base md:leading-8">
              Nous partageons ici nos réflexions, nos méthodes et nos
              découvertes autour du design, du numérique et de l'innovation.
              Des ressources pensées pour vous aider à mieux comprendre,
              concevoir et concrétiser vos idées.
            </p>
          </div>
        </section>

        {/* ARTICLE À LA UNE */}
        {featuredVisible && featuredArticle && (
          <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
            <div className="mx-auto max-w-7xl">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#686860]">
                  À la une
                </p>
                <span className="h-px flex-1 bg-[#1A1A1A]/10" />
                <span className="text-[10px] uppercase tracking-[0.12em] text-[#8B7200]">
                  Notre sélection
                </span>
              </div>

              <article className="group grid overflow-hidden rounded-2xl bg-[#EAE8E0] md:grid-cols-2">
                <Link
                  href={`/ressources/${featuredArticle.slug}`}
                  aria-label={`Découvrir : ${featuredArticle.title}`}
                  className="relative block min-h-[260px] overflow-hidden sm:min-h-[360px] md:min-h-[470px]"
                >
                  {featuredArticle.image ? (
                    <img
                      src={featuredArticle.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#454539]" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  <span className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-black/30 px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur-md sm:bottom-7 sm:left-7">
                    Lecture recommandée
                  </span>
                </Link>

                <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
                  <ArticleMeta article={featuredArticle} />

                  <h2 className="mt-5 font-display text-3xl leading-tight sm:text-4xl lg:text-[42px]">
                    {featuredArticle.title}
                  </h2>

                  <p className="mt-5 max-w-lg text-sm leading-7 text-[#686860] sm:text-base sm:leading-8">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="mt-8">
                    <Link
                      href={`/ressources/${featuredArticle.slug}`}
                      className="group/link inline-flex items-center gap-3 rounded-full bg-[#1A1A1A] px-5 py-3.5 text-xs font-semibold text-white transition hover:bg-[#FFD700] hover:text-[#1A1A1A]"
                    >
                      Lire l'article
                      <ArrowIcon />
                    </Link>
                  </div>

                  <div className="mt-10 border-t border-[#1A1A1A]/10 pt-5 text-[10px] uppercase tracking-[0.15em] text-[#77776F]">
                    Penser · Concevoir · Créer
                  </div>
                </div>
              </article>
            </div>
          </section>
        )}

        {/* BIBLIOTHÈQUE D'ARTICLES */}
        <section
          id="articles"
          className="scroll-mt-24 border-t border-[#1A1A1A]/[0.07] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B7200]">
                  La bibliothèque
                </p>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl">
                  À lire, à explorer.
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-[#686860] md:text-right">
                Des conseils pratiques et des pistes de réflexion pour faire
                avancer vos projets créatifs.
              </p>
            </div>

            {/* RECHERCHE */}
            <div className="mt-9 flex flex-col gap-4 border-b border-[#1A1A1A]/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const active = activeCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      aria-pressed={active}
                      className={`rounded-full border px-4 py-2.5 text-[11px] font-medium transition duration-200 ${
                        active
                          ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                          : "border-[#1A1A1A]/10 bg-transparent text-[#686860] hover:border-[#FFD700] hover:text-[#1A1A1A]"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              <label className="flex w-full items-center gap-3 rounded-full border border-[#1A1A1A]/10 bg-white px-4 py-3 transition focus-within:border-[#B99A00] lg:max-w-[270px]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 shrink-0 text-[#77776F]"
                >
                  <circle
                    cx="10.8"
                    cy="10.8"
                    r="6.8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="m16 16 4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Rechercher un sujet..."
                  aria-label="Rechercher un article"
                  className="min-w-0 flex-1 bg-transparent text-xs text-[#1A1A1A] outline-none placeholder:text-[#999990]"
                />
              </label>
            </div>

            {/* GRILLE */}
            {loading ? (
              <div className="mt-8 py-16 text-center text-sm text-[#686860]">
                Chargement des ressources…
              </div>
            ) : error ? (
              <div className="mt-8 rounded-2xl border border-red-200 bg-white px-6 py-12 text-center">
                <p className="text-sm text-red-700">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-5 rounded-full bg-[#1A1A1A] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#FFD700] hover:text-[#1A1A1A]"
                >
                  Réessayer
                </button>
              </div>
            ) : filteredArticles.length > 0 ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-dashed border-[#1A1A1A]/15 px-6 py-16 text-center">
                <p className="font-display text-2xl">
                  {articles.length === 0
                    ? "Les ressources arrivent bientôt."
                    : "Aucun article trouvé."}
                </p>
                <p className="mt-3 text-sm text-[#686860]">
                  {articles.length === 0
                    ? "Nous préparons de nouveaux contenus pour vous."
                    : "Essayez un autre mot-clé ou choisissez une autre catégorie."}
                </p>

                {articles.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setActiveCategory("Tout");
                    }}
                    className="mt-6 rounded-full bg-[#1A1A1A] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#FFD700] hover:text-[#1A1A1A]"
                  >
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
            )}

            <p className="mt-8 text-center text-[11px] text-[#85857C]">
              {filteredArticles.length} article
              {filteredArticles.length > 1 ? "s" : ""} affiché
              {filteredArticles.length > 1 ? "s" : ""}
            </p>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28">
          <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#1A1A1A] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-28 -z-10 h-80 w-80 rounded-full bg-[#FFD700]/10 blur-[100px]"
            />

            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div className="max-w-2xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#FFD700]">
                  Et si nous allions plus loin ?
                </p>

                <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                  Une idée en tête ?
                  <br />
                  <span className="text-white/45">Donnons-lui forme.</span>
                </h2>

                <p className="mt-5 max-w-lg text-sm leading-7 text-white/55">
                  Une identité à construire, un projet numérique à lancer ou
                  une compétence à développer ? Échangeons sur ce que nous
                  pouvons réaliser ensemble.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-4 rounded-full bg-[#FFD700] px-6 py-4 text-xs font-bold text-[#1A1A1A] transition hover:bg-white"
              >
                Parlons de votre projet
                <ArrowIcon diagonal />
              </Link>
            </div>

            <div className="mt-10 h-px bg-gradient-to-r from-[#FFD700]/40 via-white/10 to-transparent" />

            <p className="mt-5 text-[10px] uppercase tracking-[0.16em] text-white/35">
              DavCréativ — Design · Digital · Formation
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}