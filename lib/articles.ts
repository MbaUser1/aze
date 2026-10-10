import { createClient } from "@/lib/supabase/client";

export type ArticleCategory =
  | "Design graphique"
  | "Identité visuelle"
  | "Web & digital"
  | "Intelligence artificielle"
  | "Conseils";

export type ArticleBlock = {
  type: "paragraph" | "heading" | "quote" | "list";
  text: string;
  items?: string[];
};

export type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  image: string;
  author: string;
  content: ArticleBlock[];
  reading_time: number;
  featured: boolean;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const columns =
  "id, slug, title, excerpt, category, image, author, content, reading_time, featured, status, published_at, created_at, updated_at";

export async function getPublishedArticles() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(columns)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []) as ArticleRow[];
}

export async function getPublishedArticleBySlug(slug: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(columns)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data as ArticleRow | null;
}

export async function createArticle(
  article: Omit<ArticleRow, "id" | "created_at" | "updated_at">,
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("articles")
    .insert(article)
    .select(columns)
    .single();

  if (error) throw new Error(error.message);

  return data as ArticleRow;
}

export async function updateArticle(
  id: string,
  changes: Partial<Omit<ArticleRow, "id" | "created_at" | "updated_at">>,
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("articles")
    .update(changes)
    .eq("id", id)
    .select(columns)
    .single();

  if (error) throw new Error(error.message);

  return data as ArticleRow;
}

export async function deleteArticle(id: string) {
  const supabase = createClient();

  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) throw new Error(error.message);
}
