
export type ArticleCategory =
  | "Design graphique"
  | "Identité visuelle"
  | "Web & digital"
  | "Intelligence artificielle"
  | "Conseils";

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  image: string;
  author: string;
  publishedAt: string | null;
  readingTime: number;
  featured?: boolean;
  status: "draft" | "published";
  content: {
    type: "paragraph" | "heading" | "quote" | "list";
    text: string;
    items?: string[];
  }[];
};

export const articles: Article[] = [
  {
    id: "article-001",
    slug: "design-au-dela-de-l-esthetique",
    title: "Le design ne se limite pas à ce que l’on voit",
    excerpt:
      "Derrière chaque création réussie se cachent une intention, une stratégie et une compréhension profonde du message à transmettre.",
    category: "Design graphique",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=85",
    author: "L'équipe DavCréativ",
    publishedAt: "2026-10-10",
    readingTime: 6,
    featured: true,
    status: "published",
    content: [
      {
        type: "paragraph",
        text: "Le design graphique ne consiste pas uniquement à assembler des couleurs, des images et des typographies. Il s'agit avant tout de donner une forme visuelle à une idée et de rendre un message compréhensible.",
      },
      {
        type: "heading",
        text: "Créer avec une intention",
      },
      {
        type: "paragraph",
        text: "Une création efficace commence par une question : quel message voulons-nous transmettre, à qui nous adressons-nous et quelle action souhaitons-nous encourager ? Les réponses orientent les choix visuels.",
      },
      {
        type: "quote",
        text: "Une création réussie ne se contente pas d'attirer le regard. Elle donne du sens à ce regard.",
      },
      {
        type: "heading",
        text: "La forme au service du message",
      },
      {
        type: "paragraph",
        text: "La typographie établit une hiérarchie, les couleurs transmettent une atmosphère et la composition guide la lecture. Chaque élément doit contribuer à l'objectif du projet plutôt que simplement décorer.",
      },
      {
        type: "heading",
        text: "Penser avant de concevoir",
      },
      {
        type: "list",
        text: "Les questions à se poser avant de commencer",
        items: [
          "Quel est le message essentiel ?",
          "À qui cette création est-elle destinée ?",
          "Quelle information doit être comprise en premier ?",
          "Comment rendre l'ensemble cohérent avec l'identité de la marque ?",
        ],
      },
      {
        type: "paragraph",
        text: "Chez DavCréativ, nous considérons le design comme un outil de communication et de différenciation. La créativité prend toute sa valeur lorsqu'elle sert une intention claire.",
      },
    ],
  },
  {
    id: "article-002",
    slug: "construire-identite-marque",
    title: "Construire une identité de marque qui vous ressemble",
    excerpt:
      "Couleurs, typographie et symboles : les fondations d’une identité cohérente, reconnaissable et durable.",
    category: "Identité visuelle",
    image:
      "https://images.unsplash.com/photo-1634942536790-2536a4dd2d9c?auto=format&fit=crop&w=900&q=85",
    author: "L'équipe DavCréativ",
    publishedAt: null,
    readingTime: 5,
    status: "published",
    content: [
      {
        type: "paragraph",
        text: "Une identité de marque ne se résume pas à un logo. Elle traduit le positionnement, les valeurs et la personnalité d'une organisation à travers un ensemble de choix visuels cohérents.",
      },
      {
        type: "heading",
        text: "Définir les fondations",
      },
      {
        type: "paragraph",
        text: "Avant de choisir les couleurs ou de dessiner un symbole, il est essentiel de comprendre le public, les objectifs et la différence que la marque souhaite exprimer.",
      },
      {
        type: "heading",
        text: "Construire un système cohérent",
      },
      {
        type: "paragraph",
        text: "Logo, typographie, couleurs, iconographie et mise en page doivent fonctionner ensemble. Cette cohérence permet de reconnaître la marque sur ses supports numériques et imprimés.",
      },
    ],
  },
  {
    id: "article-003",
    slug: "site-web-design-conversion",
    title: "Un beau site web suffit-il pour convaincre ?",
    excerpt:
      "L'expérience utilisateur, la clarté du contenu et la confiance comptent autant que l'apparence d'un site.",
    category: "Web & digital",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85",
    author: "L'équipe DavCréativ",
    publishedAt: null,
    readingTime: 7,
    status: "published",
    content: [
      {
        type: "paragraph",
        text: "Un site web peut être visuellement séduisant sans répondre aux attentes de ses visiteurs. Son efficacité dépend aussi de la facilité avec laquelle ils trouvent l'information et comprennent la prochaine étape.",
      },
      {
        type: "heading",
        text: "L'expérience avant la décoration",
      },
      {
        type: "paragraph",
        text: "Une navigation compréhensible, des pages rapides et des appels à l'action explicites permettent aux visiteurs d'avancer sans effort inutile.",
      },
    ],
  },
  {
    id: "article-004",
    slug: "intelligence-artificielle-design",
    title: "L’intelligence artificielle au service des créatifs",
    excerpt:
      "Intégrer les outils d'IA dans le processus créatif sans perdre son regard, sa sensibilité et son originalité.",
    category: "Intelligence artificielle",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85",
    author: "L'équipe DavCréativ",
    publishedAt: null,
    readingTime: 8,
    status: "draft",
    content: [
      {
        type: "paragraph",
        text: "L'intelligence artificielle ouvre de nouvelles possibilités pour explorer des concepts, tester des pistes et accélérer certaines tâches créatives. Elle ne remplace cependant ni l'intention ni le jugement du designer.",
      },
      {
        type: "heading",
        text: "L'IA comme partenaire de création",
      },
      {
        type: "paragraph",
        text: "Les outils génératifs peuvent aider à explorer plusieurs directions visuelles, à préparer des références ou à développer une première idée. Le travail de sélection, de cohérence et de finition reste essentiel.",
      },
    ],
  },
  {
    id: "article-005",
    slug: "erreurs-affiche-publicitaire",
    title: "Les erreurs qui affaiblissent une affiche publicitaire",
    excerpt:
      "Hiérarchie visuelle, lisibilité, couleurs et surcharge : apprenons à rendre chaque message plus efficace.",
    category: "Conseils",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=900&q=85",
    author: "L'équipe DavCréativ",
    publishedAt: null,
    readingTime: 4,
    status: "draft",
    content: [
      {
        type: "paragraph",
        text: "Une affiche doit communiquer rapidement. Si le lecteur ne comprend pas le message principal en quelques secondes, la composition mérite probablement d'être simplifiée.",
      },
      {
        type: "heading",
        text: "Établir une hiérarchie claire",
      },
      {
        type: "paragraph",
        text: "Le titre, l'information secondaire et l'appel à l'action doivent avoir des niveaux visuels distincts. Trop d'éléments concurrents réduisent l'impact du message.",
      },
    ],
  },
  {
    id: "article-006",
    slug: "developper-creativite-visuelle",
    title: "La créativité se travaille : comment nourrir son regard",
    excerpt:
      "Des habitudes concrètes pour développer sa culture visuelle et dépasser la page blanche.",
    category: "Design graphique",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=900&q=85",
    author: "L'équipe DavCréativ",
    publishedAt: null,
    readingTime: 5,
    status: "draft",
    content: [
      {
        type: "paragraph",
        text: "La créativité se nourrit de l'observation, de la curiosité et de l'expérimentation. Développer son regard consiste à apprendre à analyser ce que l'on voit, et pas seulement à collectionner des références.",
      },
      {
        type: "heading",
        text: "Observer avec méthode",
      },
      {
        type: "paragraph",
        text: "Prenez le temps d'étudier les compositions, les contrastes, les rythmes et les choix typographiques qui rendent un visuel efficace. Demandez-vous pourquoi ils fonctionnent avant de chercher à vous en inspirer.",
      },
    ],
  },
];
