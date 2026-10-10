
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const CATEGORIES = [
  "Design graphique",
  "Identité visuelle",
  "Web & digital",
  "Intelligence artificielle",
  "Conseils",
] as const;

type ArticleContentBlock = {
  type: "paragraph" | "heading" | "quote" | "list";
  text: string;
  items?: string[];
};

type ArticleForm = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  content: string;
  readingTime: number;
  featured: boolean;
  status: "draft" | "published";
};

function contentToText(blocks: ArticleContentBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "heading") return `# ${block.text}`;

      if (block.type === "quote") return `> ${block.text}`;

      if (block.type === "list") {
        return (block.items ?? [])
          .map((item) => `- ${item}`)
          .join("\n");
      }

      return block.text;
    })
    .join("\n\n");
}

function textToContent(value: string): ArticleContentBlock[] {
  return value
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part): ArticleContentBlock => {
      if (part.startsWith("# ")) {
        return {
          type: "heading",
          text: part.slice(2).trim(),
        };
      }

      if (part.startsWith("> ")) {
        return {
          type: "quote",
          text: part.slice(2).trim(),
        };
      }

      const lines = part
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      if (lines.length > 0 && lines.every((line) => line.startsWith("- "))) {
        return {
          type: "list",
          text: "",
          items: lines.map((line) => line.slice(2).trim()),
        };
      }

      return {
        type: "paragraph",
        text: part,
      };
    });
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const inputClass =
  "mt-2 w-full rounded-xl border border-[#1A1A1A]/15 bg-white px-4 py-3 text-sm text-[#1A1A1A] outline-none transition placeholder:text-[#1A1A1A]/35 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20";

const labelClass = "text-sm font-semibold text-[#1A1A1A]";

export default function ModifierArticleClient({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  const [form, setForm] = useState<ArticleForm>({
    title: "",
    slug: "",
    excerpt: "",
    category: "Design graphique",
    image: "",
    author: "DavCréativ",
    content: "",
    readingTime: 5,
    featured: false,
    status: "draft",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadArticle() {
      const supabase = createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (authError || !user || user.app_metadata?.role !== "admin") {
        router.replace("/admin/connexion");
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      if (cancelled) return;

      if (fetchError || !data) {
        setError(
          "Impossible de récupérer cet article. Vérifie son identifiant.",
        );
        setLoading(false);
        return;
      }

      const blocks = Array.isArray(data.content)
        ? (data.content as ArticleContentBlock[])
        : [];

      setForm({
        title: data.title ?? "",
        slug: data.slug ?? "",
        excerpt: data.excerpt ?? "",
        category: data.category ?? "Design graphique",
        image: data.image ?? "",
        author: data.author ?? "DavCréativ",
        content: contentToText(blocks),
        readingTime: data.reading_time ?? 5,
        featured: data.featured ?? false,
        status: data.status ?? "draft",
      });

      setLoading(false);
    }

    void loadArticle();

    return () => {
      cancelled = true;
    };
  }, [id, router]);

  function updateField<K extends keyof ArticleForm>(
    field: K,
    value: ArticleForm[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugManuallyEdited ? current.slug : slugify(value),
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title.trim() || !form.slug.trim() || !form.excerpt.trim()) {
      setError("Le titre, le slug et le résumé sont obligatoires.");
      return;
    }

    const blocks = textToContent(form.content);

    if (blocks.length === 0) {
      setError("Le contenu de l’article ne peut pas être vide.");
      return;
    }

    setSaving(true);

    try {
      const supabase = createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user || user.app_metadata?.role !== "admin") {
        router.replace("/admin/connexion");
        return;
      }

      const { data: existing, error: existingError } = await supabase
        .from("articles")
        .select("published_at")
        .eq("id", id)
        .single();

      if (existingError || !existing) {
        setError("Cet article n’existe plus ou n’est plus accessible.");
        return;
      }

      const publishedAt =
        form.status === "published"
          ? existing.published_at ?? new Date().toISOString()
          : null;

      const { error: updateError } = await supabase
        .from("articles")
        .update({
          title: form.title.trim(),
          slug: form.slug.trim(),
          excerpt: form.excerpt.trim(),
          category: form.category,
          image: form.image.trim(),
          author: form.author.trim() || "DavCréativ",
          content: blocks,
          reading_time: Math.max(1, Math.floor(form.readingTime)),
          featured: form.featured,
          status: form.status,
          published_at: publishedAt,
        })
        .eq("id", id);

      if (updateError) {
        if (updateError.code === "23505") {
          setError("Ce slug est déjà utilisé par un autre article.");
        } else {
          setError(updateError.message || "La modification a échoué.");
        }
        return;
      }

      setSuccess("Article modifié avec succès.");

      router.push("/admin/articles");
      router.refresh();
    } catch {
      setError("Une erreur inattendue est survenue. Réessaie.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F7F4] px-6 py-20 text-center text-[#1A1A1A]">
        Chargement de l’article...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F4] px-4 py-10 text-[#1A1A1A] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin/articles"
          className="inline-flex items-center gap-2 text-sm text-[#1A1A1A]/65 transition hover:text-[#1A1A1A]"
        >
          <span aria-hidden="true">←</span>
          Retour aux articles
        </Link>

        <header className="mb-8 mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8A7200]">
            Administration · Ressources
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Modifier l’article
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#1A1A1A]/65">
            Modifie les informations, le contenu et le statut de ton article.
            Les changements seront enregistrés dans Supabase.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-2xl border border-[#1A1A1A]/10 bg-white p-5 shadow-sm sm:p-8"
        >
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              {success}
            </div>
          )}

          <section className="space-y-5">
            <h2 className="border-b border-[#1A1A1A]/10 pb-3 text-lg font-bold">
              Informations générales
            </h2>

            <div>
              <label htmlFor="title" className={labelClass}>
                Titre de l’article *
              </label>
              <input
                id="title"
                required
                value={form.title}
                onChange={(event) => handleTitleChange(event.target.value)}
                className={inputClass}
                placeholder="Ex. Les bases d’une identité visuelle réussie"
              />
            </div>

            <div>
              <label htmlFor="slug" className={labelClass}>
                Slug de l’article *
              </label>
              <input
                id="slug"
                required
                value={form.slug}
                onChange={(event) => {
                  setSlugManuallyEdited(true);
                  updateField("slug", slugify(event.target.value));
                }}
                className={inputClass}
                placeholder="identite-visuelle-reussie"
              />
              <p className="mt-2 text-xs text-[#1A1A1A]/50">
                Adresse de l’article : /ressources/{form.slug || "slug"}
              </p>
            </div>

            <div>
              <label htmlFor="excerpt" className={labelClass}>
                Résumé *
              </label>
              <textarea
                id="excerpt"
                required
                rows={3}
                value={form.excerpt}
                onChange={(event) => updateField("excerpt", event.target.value)}
                className={inputClass}
                placeholder="Présente brièvement le sujet de l’article..."
              />
            </div>

            <div>
              <label htmlFor="category" className={labelClass}>
                Catégorie *
              </label>
              <select
                id="category"
                value={form.category}
                onChange={(event) => updateField("category", event.target.value)}
                className={inputClass}
                required
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="border-b border-[#1A1A1A]/10 pb-3 text-lg font-bold">
              Visuel et rédaction
            </h2>

            <div>
              <label htmlFor="image" className={labelClass}>
                URL de l’image de couverture
              </label>
              <input
                id="image"
                type="url"
                value={form.image}
                onChange={(event) => updateField("image", event.target.value)}
                className={inputClass}
                placeholder="https://..."
              />

              {form.image && (
                <div className="mt-4 overflow-hidden rounded-xl border border-[#1A1A1A]/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.image}
                    alt="Aperçu de la couverture"
                    className="max-h-64 w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="author" className={labelClass}>
                Auteur
              </label>
              <input
                id="author"
                value={form.author}
                onChange={(event) => updateField("author", event.target.value)}
                className={inputClass}
                placeholder="DavCréativ"
              />
            </div>

            <div>
              <label htmlFor="content" className={labelClass}>
                Contenu de l’article *
              </label>
              <textarea
                id="content"
                required
                rows={14}
                value={form.content}
                onChange={(event) => updateField("content", event.target.value)}
                className={`${inputClass} resize-y font-normal leading-7`}
                placeholder="Rédige le contenu de ton article..."
              />

              <div className="mt-3 rounded-xl bg-[#F7F7F4] p-4 text-xs leading-6 text-[#1A1A1A]/65">
                <p className="font-bold text-[#1A1A1A]">
                  Mise en forme du contenu
                </p>
                <p>Un paragraphe par bloc, séparé par une ligne vide.</p>
                <p>
                  <code># Titre de section</code> pour un sous-titre.
                </p>
                <p>
                  <code>&gt; Citation</code> pour une citation.
                </p>
                <p>
                  <code>- Élément de liste</code> pour une liste à puces.
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="readingTime" className={labelClass}>
                Temps de lecture (minutes)
              </label>
              <input
                id="readingTime"
                type="number"
                min={1}
                max={120}
                required
                value={form.readingTime}
                onChange={(event) =>
                  updateField("readingTime", Number(event.target.value))
                }
                className={inputClass}
              />
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="border-b border-[#1A1A1A]/10 pb-3 text-lg font-bold">
              Publication
            </h2>

            <div>
              <label htmlFor="status" className={labelClass}>
                Statut de l’article
              </label>
              <select
                id="status"
                value={form.status}
                onChange={(event) =>
                  updateField(
                    "status",
                    event.target.value as ArticleForm["status"],
                  )
                }
                className={inputClass}
              >
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
              </select>
              <p className="mt-2 text-xs text-[#1A1A1A]/50">
                Un brouillon n’apparaît pas dans les ressources publiques.
              </p>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#1A1A1A]/10 p-4">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  updateField("featured", event.target.checked)
                }
                className="mt-1 size-4 accent-[#FFD700]"
              />
              <span>
                <span className="block text-sm font-semibold">
                  Mettre en avant cet article
                </span>
                <span className="mt-1 block text-xs leading-5 text-[#1A1A1A]/55">
                  Cet article pourra apparaître comme contenu à la une.
                </span>
              </span>
            </label>
          </section>

          <div className="flex flex-col-reverse gap-3 border-t border-[#1A1A1A]/10 pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/admin/articles"
              className="inline-flex items-center justify-center rounded-full border border-[#1A1A1A]/15 px-6 py-3 text-sm font-semibold transition hover:bg-[#1A1A1A]/5"
            >
              Annuler
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-full bg-[#FFD700] px-6 py-3 text-sm font-bold text-[#1A1A1A] transition hover:bg-[#e8c400] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Enregistrement..." : "Enregistrer les modifications"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
