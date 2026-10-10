
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { ArticleRow } from "@/lib/articles";

function getImagePath(url: string) {
  const marker = "/storage/v1/object/public/article-images/";
  const index = url.indexOf(marker);

  return index === -1 ? null : url.slice(index + marker.length);
}

export default function AdminArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadArticles = useCallback(async () => {
    const supabase = createClient();

    const { data: auth, error: authError } =
      await supabase.auth.getUser();

    if (authError || !auth.user ||
        auth.user.app_metadata?.role !== "admin") {
      router.replace("/admin/connexion");
      return;
    }

    const { data, error: queryError } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (queryError) {
      setError(queryError.message);
    } else {
      setArticles((data ?? []) as ArticleRow[]);
    }

    setLoading(false);
  }, [router]);

  useEffect(() => {
    void loadArticles();
  }, [loadArticles]);

  async function deleteArticle(article: ArticleRow) {
    const confirmed = window.confirm(
      `Supprimer définitivement « ${article.title} » ?`,
    );

    if (!confirmed) return;

    const supabase = createClient();

    const { error: deleteError } = await supabase
      .from("articles")
      .delete()
      .eq("id", article.id);

    if (deleteError) {
      setError(`Suppression impossible : ${deleteError.message}`);
      return;
    }

    // Supprimer également l'image si elle provient de notre bucket.
    if (article.image) {
      const imagePath = getImagePath(article.image);

      if (imagePath) {
        const { error: imageError } = await supabase.storage
          .from("article-images")
          .remove([imagePath]);

        if (imageError) {
          console.error(
            "L'article est supprimé, mais son image n'a pas pu être supprimée.",
            imageError.message,
          );
        }
      }
    }

    setArticles((current) =>
      current.filter((item) => item.id !== article.id),
    );
    setError("");
  }

  return (
    <main className="min-h-screen bg-[#F7F7F4] px-5 py-10 text-[#1A1A1A] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/admin"
          className="text-sm text-[#686860] transition hover:text-[#8B7200]"
        >
          ← Tableau de bord
        </Link>

        <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B7200]">
              Administration DavCréativ
            </p>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl">
              Gestion des articles
            </h1>
            <p className="mt-3 text-sm text-[#686860]">
              {articles.length} article{articles.length > 1 ? "s" : ""} au total
            </p>
          </div>

          <Link
            href="/admin/articles/nouveau"
            className="inline-flex w-fit items-center rounded-full bg-[#FFD700] px-5 py-3.5 text-sm font-semibold text-[#1A1A1A] transition hover:bg-[#1A1A1A] hover:text-white"
          >
            + Nouvel article
          </Link>
        </div>

        {error && (
          <p className="mt-6 rounded-xl border border-red-200 bg-white p-4 text-sm text-red-700">
            {error}
          </p>
        )}

        {loading ? (
          <p className="py-16 text-center text-sm text-[#686860]">
            Chargement des articles…
          </p>
        ) : articles.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#1A1A1A]/15 bg-white p-12 text-center">
            <h2 className="font-display text-2xl">Aucun article pour le moment</h2>
            <p className="mt-3 text-sm text-[#686860]">
              Crée ton premier article pour commencer.
            </p>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#1A1A1A]/10 bg-white">
            <div className="divide-y divide-[#1A1A1A]/10">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt=""
                        className="h-16 w-20 shrink-0 rounded-lg bg-[#EAE8E0] object-cover"
                      />
                    ) : (
                      <div className="h-16 w-20 shrink-0 rounded-lg bg-[#1A1A1A]" />
                    )}

                    <div className="min-w-0">
                      <h2 className="truncate font-semibold">
                        {article.title}
                      </h2>
                      <p className="mt-1 text-xs text-[#686860]">
                        {article.category}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                        <span
                          className={`rounded-full px-2.5 py-1 ${
                            article.status === "published"
                              ? "bg-green-50 text-green-700"
                              : "bg-[#F1F0EA] text-[#686860]"
                          }`}
                        >
                          {article.status === "published"
                            ? "Publié"
                            : "Brouillon"}
                        </span>
                        {article.featured && (
                          <span className="text-[#8B7200]">À la une</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-3">
                    <Link
                      href={`/admin/articles/${article.id}/modifier`}
                      className="rounded-full border border-[#1A1A1A]/15 px-4 py-2.5 text-xs font-semibold transition hover:border-[#FFD700] hover:bg-[#FFD700]"
                    >
                      Modifier
                    </Link>

                    <button
                      type="button"
                      onClick={() => void deleteArticle(article)}
                      className="rounded-full border border-red-200 px-4 py-2.5 text-xs font-semibold text-red-700 transition hover:bg-red-50"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
