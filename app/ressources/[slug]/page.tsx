
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import type { ArticleRow, ArticleBlock } from "@/lib/articles";

export const instant = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getPublishedArticle(slug: string): Promise<ArticleRow | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("Erreur de chargement de l'article :", error.message);
    return null;
  }

  return (data as ArticleRow | null) ?? null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) {
    return {
      title: "Article introuvable | DavCréativ",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${article.title} | DavCréativ`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      ...(article.image ? { images: [article.image] } : {}),
      type: "article",
      ...(article.published_at
        ? { publishedTime: article.published_at }
        : {}),
    },
  };
}

function formatDate(date: string | null) {
  if (!date) return "";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function ArticleContent({ content }: { content: ArticleBlock[] }) {
  return (
    <div className="space-y-7">
      {content.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2
              key={index}
              className="pt-4 font-display text-2xl leading-tight sm:text-3xl"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="border-l-2 border-[#FFD700] py-2 pl-6 font-display text-xl leading-relaxed text-[#56564F] sm:text-2xl"
            >
              “{block.text}”
            </blockquote>
          );
        }

        if (block.type === "list") {
          return (
            <div key={index}>
              <p className="mb-4 text-sm font-semibold leading-7">
                {block.text}
              </p>
              <ul className="space-y-3">
                {block.items?.map((item, itemIndex) => (
                  <li
                    key={`${index}-${itemIndex}`}
                    className="flex gap-3 text-sm leading-7 text-[#606058]"
                  >
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B99A00]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return (
          <p
            key={index}
            className="text-[15px] leading-8 text-[#56564F] sm:text-base sm:leading-9"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) notFound();

  const supabase = await createClient();

  const { data: relatedData, error: relatedError } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .eq("category", article.category)
    .neq("slug", article.slug)
    .order("published_at", { ascending: false })
    .limit(3);

  if (relatedError) {
    console.error(
      "Erreur de chargement des articles associés :",
      relatedError.message,
    );
  }

  const relatedArticles = (relatedData ?? []) as ArticleRow[];

  return (
    <>
      <Header />

      <main className="bg-[#F7F7F4] text-[#1A1A1A]">
        {/* EN-TÊTE DE L'ARTICLE */}
        <header className="relative isolate overflow-hidden bg-[#1A1A1A] px-5 pb-14 pt-36 text-white sm:px-8 sm:pb-20 sm:pt-40 lg:px-12 lg:pb-24 lg:pt-44">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-16 -z-10 h-80 w-80 rounded-full bg-[#FFD700]/10 blur-[110px]"
          />

          <div className="mx-auto max-w-4xl">
            <Link
              href="/ressources"
              className="inline-flex items-center gap-2 text-xs text-white/55 transition hover:text-[#FFD700]"
            >
              <span aria-hidden="true">←</span>
              Toutes les ressources
            </Link>

            <div className="mt-10 flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
              <span className="rounded-full border border-[#FFD700]/30 px-3 py-1.5 text-[#FFD700]">
                {article.category}
              </span>

              {article.published_at && (
                <span>{formatDate(article.published_at)}</span>
              )}

              <span>·</span>
              <span>{article.reading_time} min de lecture</span>
            </div>

            <h1 className="mt-7 max-w-4xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl">
              {article.title}
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
              {article.excerpt}
            </p>

            <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFD700]/25 bg-[#FFD700]/10 font-display text-sm text-[#FFD700]">
                D.
              </span>
              <div>
                <p className="text-xs font-semibold">{article.author}</p>
                <p className="mt-1 text-[10px] text-white/40">
                  Le journal DavCréativ
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* IMAGE PRINCIPALE */}
        <section className="px-5 pt-8 sm:px-8 sm:pt-12 lg:px-12">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-[#EAE8E0]">
            {article.image && (
              <img
                src={article.image}
                alt=""
                fetchPriority="high"
                className="max-h-[600px] min-h-[240px] w-full object-cover sm:min-h-[380px]"
              />
            )}
          </div>
        </section>

        {/* CONTENU */}
        <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-20">
            <article className="min-w-0">
              <ArticleContent content={article.content ?? []} />

              <div className="mt-12 border-t border-[#1A1A1A]/10 pt-6">
                <Link
                  href="/ressources"
                  className="inline-flex items-center gap-3 text-xs font-semibold transition hover:text-[#8B7200]"
                >
                  <span aria-hidden="true">←</span>
                  Retour aux ressources
                </Link>
              </div>
            </article>

            {/* COLONNE LATÉRALE */}
            <aside className="space-y-8">
              <div className="rounded-2xl border border-[#1A1A1A]/10 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#8B7200]">
                  Dans cet article
                </p>
                <p className="mt-3 text-sm leading-7 text-[#686860]">
                  Une réflexion de DavCréativ pour nourrir votre démarche
                  créative et donner plus de sens à vos projets.
                </p>
              </div>

              <div className="rounded-2xl bg-[#1A1A1A] p-5 text-white">
                <p className="font-display text-xl leading-snug">
                  Un projet à concrétiser ?
                </p>
                <p className="mt-3 text-xs leading-6 text-white/55">
                  Mettons nos idées et notre expertise au service de votre
                  ambition.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#FFD700] hover:text-white"
                >
                  Parlons-en <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* ARTICLES ASSOCIÉS */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-[#1A1A1A]/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
            <div className="mx-auto max-w-7xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B7200]">
                Pour prolonger la réflexion
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">
                À lire également.
              </h2>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/ressources/${related.slug}`}
                    className="group overflow-hidden rounded-2xl border border-[#1A1A1A]/10 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="aspect-[1.6/1] overflow-hidden bg-[#EAE8E0]">
                      {related.image && (
                        <img
                          src={related.image}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] uppercase tracking-[0.12em] text-[#8B7200]">
                        {related.category}
                      </p>
                      <h3 className="mt-3 font-display text-xl leading-snug group-hover:text-[#8B7200]">
                        {related.title}
                      </h3>
                      <p className="mt-3 text-xs leading-6 text-[#686860]">
                        {related.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
