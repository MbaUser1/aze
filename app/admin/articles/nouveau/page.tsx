
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const categories = [
  "Design graphique",
  "Identité visuelle",
  "Web & digital",
  "Intelligence artificielle",
  "Conseils",
] as const;

function createSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NewArticlePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] =
    useState<(typeof categories)[number]>("Design graphique");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("DavCréativ");
  const [content, setContent] = useState("");
  const [readingTime, setReadingTime] = useState(3);
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [loading, setLoading] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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

      setCheckingAccess(false);
    }

    void checkAccess();

    return () => {
      active = false;
    };
  }, [router]);

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slugEdited) {
      setSlug(createSlug(value));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!title.trim() || !slug.trim() || !content.trim()) {
      setErrorMessage("Le titre, le slug et le contenu sont obligatoires.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (
        userError ||
        !userData.user ||
        userData.user.app_metadata?.role !== "admin"
      ) {
        router.replace("/admin/connexion");
        return;
      }

      const contentBlocks = content
        .trim()
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph) => ({
          type: "paragraph" as const,
          text: paragraph,
        }));

      const { error } = await supabase.from("articles").insert({
        title: title.trim(),
        slug: createSlug(slug),
        excerpt: excerpt.trim(),
        category,
        image: image.trim(),
        author: author.trim() || "DavCréativ",
        content: contentBlocks,
        reading_time: readingTime,
        featured,
        status,
        published_at:
          status === "published" ? new Date().toISOString() : null,
        created_by: userData.user.id,
      });

      if (error) {
        if (error.code === "23505") {
          setErrorMessage(
            "Ce slug existe déjà. Choisis un autre slug pour cet article.",
          );
        } else {
          setErrorMessage(
            `Impossible d'enregistrer l'article : ${error.message}`,
          );
        }
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setErrorMessage(
        "Une erreur inattendue est survenue. Réessaie.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (checkingAccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F7F4] px-5 text-[#1A1A1A]">
        <p className="text-sm text-black/60">
          Vérification de l'accès administrateur...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F4] text-[#1A1A1A]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/admin" className="text-lg font-black">
            Dav<span className="text-[#b99700]">Créativ</span>
            <span className="ml-2 text-sm font-medium text-black/45">
              Administration
            </span>
          </Link>

          <Link
            href="/admin"
            className="text-sm font-semibold text-black/60 hover:text-black"
          >
            ← Tableau de bord
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a7100]">
            Espace éditorial
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Nouvel article
          </h1>
          <p className="mt-3 text-sm leading-6 text-black/55">
            Rédige une ressource, enregistre-la comme brouillon ou publie-la
            sur le site DavCréativ.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="space-y-5 rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-lg font-bold">Informations générales</h2>

            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-semibold">
                Titre de l’article *
              </label>
              <input
                id="title"
                required
                maxLength={180}
                value={title}
                onChange={(event) => handleTitleChange(event.target.value)}
                placeholder="Ex. : Le design ne se limite pas à l’esthétique"
                className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#b99700]"
              />
            </div>

            <div>
              <label htmlFor="slug" className="mb-2 block text-sm font-semibold">
                Slug de l’article *
              </label>
              <input
                id="slug"
                required
                value={slug}
                onChange={(event) => {
                  setSlugEdited(true);
                  setSlug(createSlug(event.target.value));
                }}
                placeholder="mon-article"
                className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#b99700]"
              />
              <p className="mt-2 break-all text-xs text-black/45">
                Adresse : /ressources/{createSlug(slug) || "mon-article"}
              </p>
            </div>

            <div>
              <label htmlFor="excerpt" className="mb-2 block text-sm font-semibold">
                Résumé
              </label>
              <textarea
                id="excerpt"
                rows={3}
                maxLength={400}
                value={excerpt}
                onChange={(event) => setExcerpt(event.target.value)}
                placeholder="Présente brièvement ce que le lecteur va découvrir..."
                className="w-full resize-y rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#b99700]"
              />
              <p className="mt-1 text-right text-xs text-black/40">
                {excerpt.length}/400 caractères
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="category" className="mb-2 block text-sm font-semibold">
                  Catégorie *
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value as (typeof categories)[number])
                  }
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b99700]"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="author" className="mb-2 block text-sm font-semibold">
                  Auteur
                </label>
                <input
                  id="author"
                  value={author}
                  onChange={(event) => setAuthor(event.target.value)}
                  className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#b99700]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="image" className="mb-2 block text-sm font-semibold">
                URL de l’image de couverture
              </label>
              <input
                id="image"
                type="url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                placeholder="https://..."
                className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#b99700]"
              />
              <p className="mt-2 text-xs text-black/45">
                Pour le moment, indique une URL d’image accessible publiquement.
                Nous ajouterons l’envoi d’images avec Supabase Storage ensuite.
              </p>
            </div>
          </section>

          <section className="space-y-5 rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-7">
            <div>
              <h2 className="text-lg font-bold">Contenu de l’article</h2>
              <p className="mt-2 text-sm leading-6 text-black/55">
                Sépare les paragraphes par une ligne vide. Cette première version
                enregistre le texte sous forme de blocs de paragraphes.
              </p>
            </div>

            <div>
              <label htmlFor="content" className="mb-2 block text-sm font-semibold">
                Texte *
              </label>
              <textarea
                id="content"
                required
                rows={14}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder={"Premier paragraphe...\n\nDeuxième paragraphe...\n\nTroisième paragraphe..."}
                className="w-full resize-y rounded-xl border border-black/10 px-4 py-3 leading-7 outline-none focus:border-[#b99700]"
              />
            </div>

            <div className="max-w-xs">
              <label htmlFor="readingTime" className="mb-2 block text-sm font-semibold">
                Temps de lecture estimé (minutes)
              </label>
              <input
                id="readingTime"
                type="number"
                min={1}
                max={120}
                required
                value={readingTime}
                onChange={(event) =>
                  setReadingTime(Number(event.target.value))
                }
                className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#b99700]"
              />
            </div>
          </section>

          <section className="space-y-5 rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-lg font-bold">Publication</h2>

            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={featured}
                onChange={(event) => setFeatured(event.target.checked)}
                className="mt-1 h-4 w-4 accent-[#b99700]"
              />
              <span>
                <span className="block text-sm font-semibold">
                  Mettre en avant cet article
                </span>
                <span className="mt-1 block text-xs leading-5 text-black/50">
                  Marque l’article comme vedette. L’affichage sur le site dépendra
                  aussi de la logique de la page Ressources.
                </span>
              </span>
            </label>

            <div>
              <label htmlFor="status" className="mb-2 block text-sm font-semibold">
                Statut
              </label>
              <select
                id="status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as "draft" | "published")
                }
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b99700] sm:max-w-xs"
              >
                <option value="draft">Brouillon</option>
                <option value="published">Publié immédiatement</option>
              </select>
              {status === "published" && (
                <p className="mt-2 text-xs text-black/50">
                  L’article sera marqué comme publié dès son enregistrement.
                </p>
              )}
            </div>
          </section>

          {errorMessage && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
            >
              {errorMessage}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin"
              className="rounded-xl border border-black/10 px-5 py-3 text-center text-sm font-semibold transition hover:bg-white"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#FFD700] px-6 py-3 text-sm font-bold text-[#1A1A1A] transition hover:bg-[#f0ca00] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Enregistrement..." : "Enregistrer l’article"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
