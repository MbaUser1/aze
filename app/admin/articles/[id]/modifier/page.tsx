import { Suspense } from "react";
import ModifierArticleClient from "./ModifierArticleClient";

export default function ModifierArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F7F7F4] px-4 py-20 text-center text-[#1A1A1A]">
          Chargement de l’article...
        </main>
      }
    >
      <ArticleParams params={params} />
    </Suspense>
  );
}

async function ArticleParams({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ModifierArticleClient id={id} />;
}
