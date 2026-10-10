"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { ArticleRow } from "@/lib/articles";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadDashboard = useCallback(async () => {
    const supabase = createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (
      userError ||
      !userData.user ||
      userData.user.app_metadata?.role !== "admin"
    ) {
      router.replace("/admin/connexion");
      return;
    }

    const { data, error } = await supabase
      .from("articles")
      .select(
        "id, slug, title, excerpt, category, image, author, content, reading_time, featured, status, published_at, created_at, updated_at",
      )
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMessage(
        "Impossible de charger les articles. Vérifie les permissions Supabase.",
      );
    } else {
      setArticles((data ?? []) as ArticleRow[]);
    }

    setLoading(false);
  }, [router]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/connexion");
    router.refresh();
  }

  const publishedCount = articles.filter(
    (article) => article.status === "published",
  ).length;

  const draftCount = articles.filter(
    (article) => article.status === "draft",
  ).length;

  return (
    <main className="min-h-screen bg-[#F7F7F4] text-[#1A1A1A]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/" className="text-xl font-black tracking-tight">
            Dav<span className="text-[#b99700]">Créativ</span>
            <span className="ml-3 hidden text-sm font-medium text-black/45 sm:inline">
              Administration
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-black/10 px-4 py-2.5 text-sm font-semibold transition hover:border-black/30"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a7100]">
              Espace éditorial
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Tableau de bord
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-black/55">
              Gérez les articles, les brouillons et les publications de
              DavCréativ depuis un seul espace.
            </p>
          </div>

          <Link
            href="/admin/articles/nouveau"
            className="inline-flex items-center justify-center rounded-xl bg-[#edb203] px-5 py-3 font-semibold text-white transition hover:bg-black/75"
          >
            + Nouvel article
          </Link>
          <Link
            href="/admin/articles"
            className="inline-flex items-center justify-center rounded-xl bg-[#edb203] px-5 py-3 font-semibold text-white transition hover:bg-black/75"
          >
            Gérer les articles
          </Link>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total des articles", value: articles.length },
            { label: "Articles publiés", value: publishedCount },
            { label: "Brouillons", value: draftCount },
          ].map((stat) => (
            <section
              key={stat.label}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-black/55">{stat.label}</p>
              <p className="mt-3 text-3xl font-black">
                {loading ? "—" : stat.value}
              </p>
            </section>
          ))}
        </div>

        <section className="mt-8 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
          <div className="border-b border-black/5 px-5 py-5 sm:px-6">
            <h2 className="text-lg font-bold">Articles récents</h2>
            <p className="mt-1 text-sm text-black/50">
              Articles enregistrés dans la base Supabase.
            </p>
          </div>

          {loading ? (
            <p className="p-6 text-sm text-black/55">
              Chargement des articles...
            </p>
          ) : errorMessage ? (
            <p role="alert" className="p-6 text-sm text-red-700">
              {errorMessage}
            </p>
          ) : articles.length === 0 ? (
            <div className="p-8 text-center">
              <p className="font-semibold">Aucun article pour le moment.</p>
              <p className="mt-2 text-sm text-black/55">
                La base est prête. Nous importerons ensuite tes articles
                existants.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-black/5">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >
                  <div className="min-w-0">
                    <h3 className="truncate font-bold">{article.title}</h3>
                    <p className="mt-1 text-sm text-black/50">
                      {article.category} · {article.reading_time} min de lecture
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                      article.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {article.status === "published" ? "Publié" : "Brouillon"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
