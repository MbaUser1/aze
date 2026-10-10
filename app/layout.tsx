import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DavCréativ® — Design graphique & Digital",
  description:
    "Nous concevons des identités visuelles, des expériences digitales et des solutions créatives pour les marques et les entreprises.",
  applicationName: "DavCréativ",
  openGraph: {
    title: "DavCréativ® — Donner forme aux idées",
    description:
      "Studio créatif spécialisé en design graphique, web et communication digitale.",
    locale: "fr_CM",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

