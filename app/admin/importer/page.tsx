
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { articles as sourceArticles } from "@/data/articles";

type ImportResult = {
  imported: number;
  skipped: number;
};

export default function ImportArticlesPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState<ImportResult | null>(null);

  useEffect(() => {
    let active = true;

    async function checkAccess() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (!active) return;

      if (
        error ||
        !data.user ||
        data.user.app_metadata?.role !== "admin"
      ) {
        router.replace("/admin/connexion");
        return;
      }

      setChecking(false);
    }

    void checkAccess();

    return () => {
      active = false;
    };
  }, [router]);

  async function importArticles() {
    setLoading(true);
    setMessage("");
    setErrorMessage("");
    setResult(null);

    try {
      const supabase = createClient();

      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (
        authError ||
        !authData.user ||
        authData.user.app_metadata?.role !== "admin"
      ) {
        router.replace("/admin/connexion");
        return;
      }

      const { data: existing, error: readError } = await supabase
        .from("articles")
        .select("slug");

      if (readError) {
        throw new Error(
          `Lecture des articles existants impossible : ${readError.message}`,
        );
      }

      const existingSlugs = new Set(
        (existing ?? []).map((article) => article.slug),
      );

      const missingArticles = sourceArticles.filter(
        (article) => !existingSlugs.has(article.slug),
      );

      if (missingArticles.length === 0) {
        setResult({
          imported: 0,
          skipped: sourceArticles.length,
        });
        setMessage("Tous les articles de cette source sont déjà présents.");
        return;
      }

      const rows = missingArticles.map((article) => ({
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        category: article.category,
        image: article.image,
        author: article.author || "DavCréativ",
        content: article.content,
        reading_time: article.readingTime,
        featured: article.featured ?? false,
        status: article.status,
        published_at:
          article.status === "published"
            ? article.publishedAt || new Date().toISOString()
            : null,
        created_by: authData.user.id,
      }));

      const { data: inserted, error: insertError } = await supabase
        .from("articles")
        .insert(rows)
        .select("id");

      if (insertError) {
        throw new Error(
          `Importation impossible : ${insertError.message}`,
        );
      }

      const importedCount = inserted?.length ?? rows.length;

      setResult({
        imported: importedCount,
        skipped: sourceArticles.length - importedCount,
      });

      setMessage("Importation terminée avec succès.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Une erreur inattendue est survenue.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F7F4] text-[#1A1A1A]">
        Vérification des droits administrateur...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F4] px-5 py-10 text-[#1A1A1A] sm:px-8 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/admin"
          className="text-sm font-semibold text-black/55 hover:text-black"
        >
          ← Retour au tableau de bord
        </Link>

        <section className="mt-6 rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a7100]">
            Migration des contenus
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight">
            Importer les articles existants
          </h1>

          <p className="mt-4 text-sm leading-7 text-black/60">
            Cette opération copie les articles de data/articles.ts vers
            Supabase. Les slugs déjà présents ne seront pas réimportés :
            le contenu existant dans la base ne sera donc pas écrasé.
          </p>

          <div className="mt-6 rounded-2xl bg-[#F7F7F4] p-5">
            <p className="text-sm text-black/55">Articles dans le fichier source</p>
            <p className="mt-1 text-3xl font-black">
              {sourceArticles.length}
            </p>
            <p className="mt-2 text-xs leading-5 text-black/50">
              Les statuts des articles seront conservés.
            </p>
          </div>

          {message && (
            <p
              role="status"
              className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
            >
              {message}
            </p>
          )}

          {result && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-black/5 p-4">
                <p className="text-sm text-black/55">Importés</p>
                <p className="mt-1 text-2xl font-black">{result.imported}</p>
              </div>
              <div className="rounded-xl border border-black/5 p-4">
                <p className="text-sm text-black/55">Non réimportés</p>
                <p className="mt-1 text-2xl font-black">{result.skipped}</p>
              </div>
            </div>
          )}

          {errorMessage && (
            <p
              role="alert"
              className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
            >
              {errorMessage}
            </p>
          )}

          <button
            type="button"
            onClick={importArticles}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-[#FFD700] px-5 py-3.5 font-bold text-[#1A1A1A] transition hover:bg-[#f0ca00] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Importation en cours..." : "Importer les articles"}
          </button>

          <p className="mt-4 text-xs leading-5 text-black/45">
            Réservé aux administrateurs. Cette opération ne supprime aucun
            article de la base.
          </p>
        </section>
      </div>
    </main>
  );
}
