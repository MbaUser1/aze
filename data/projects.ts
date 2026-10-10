
export type ProjectCategory =
  | "Design graphique"
  | "Développement web"
  | "Design produit & Packaging";

export type Project = {
  title: string;
  category: ProjectCategory;
  description: string;
  image: string;
  href: string;
  year: string;
  accent: string;
};

export const projects: Project[] = [
  {
    title: "Homeya",
    category: "Design graphique",
    description:
      "Univers visuel et création graphique autour d’une solution immobilière digitale.",
    image: "/images/homeya-project.jpg",
    href: "/realisations/homeya",
    year: "2026",
    accent: "#F97316",
  },
  {
    title: "Identité de marque",
    category: "Design graphique",
    description:
      "Un système visuel cohérent pour construire une marque reconnaissable.",
    image: "/images/branding-project.jpg",
    href: "#contact",
    year: "2026",
    accent: "#FFD700",
  },
  {
    title: "Expérience web",
    category: "Développement web",
    description:
      "Une expérience digitale moderne, structurée pour faciliter la navigation.",
    image: "/images/web-project.jpg",
    href: "#contact",
    year: "2026",
    accent: "#64748B",
  },
];
