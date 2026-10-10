import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const bensoon = localFont({
  src: "../public/fonts/Bensoon.otf",
  variable: "--font-bensoon",
  display: "swap",
  weight: "400",
});

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
      <body className={`${manrope.variable} ${bensoon.variable}`}>
        {children}
      </body>
    </html>
  );
}