
// "use client";

// import { useState } from "react";

// const services = [
//   {
//     number: "01",
//     title: "Design graphique",
//     description:
//       "Des identités visuelles distinctives qui donnent du caractère aux marques et rendent les idées mémorables.",
//     tags: ["Branding", "Identité visuelle", "Supports print"],
//   },
//   {
//     number: "02",
//     title: "Développement web",
//     description:
//       "Des sites web modernes, rapides et pensés pour transformer les visiteurs en clients.",
//     tags: ["Sites vitrines", "E-commerce", "UI / UX"],
//   },
//   {
//     number: "03",
//     title: "Communication digitale",
//     description:
//       "Des contenus créatifs et des stratégies digitales qui rapprochent les marques de leurs audiences.",
//     tags: ["Stratégie", "Création de contenu", "Campagnes"],
//   },
//   {
//     number: "04",
//     title: "Design & packaging",
//     description:
//       "Des designs de produits et emballages qui valorisent votre offre dès le premier regard.",
//     tags: ["Packaging", "Étiquettes", "Design produit"],
//   },
//   {
//     number: "05",
//     title: "Développement mobile",
//     description:
//       "Des expériences mobiles accessibles, intuitives et adaptées aux usages de vos utilisateurs.",
//     tags: ["Applications", "Prototypage", "Expérience mobile"],
//   },
//   {
//     number: "06",
//     title: "Formations créatives",
//     description:
//       "Des compétences concrètes en design et en outils numériques pour libérer votre potentiel créatif.",
//     tags: ["Design graphique", "Outils IA", "Digital"],
//   },
// ];

// const projects = [
//   {
//     name: "Homeya",
//     category: "Identité digitale · Immobilier",
//     number: "01",
//     image:
//       "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=85",
//     background: "#e7e4dd",
//   },
//   {
//     name: "Brand Universe",
//     category: "Branding · Identité visuelle",
//     number: "02",
//     image:
//       "https://images.unsplash.com/photo-1634942536790-2536e7e7d6a8?auto=format&fit=crop&w=1100&q=85",
//     background: "#e9dfd2",
//   },
//   {
//     name: "Digital Experience",
//     category: "Web design · Expérience utilisateur",
//     number: "03",
//     image:
//       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1100&q=85",
//     background: "#dfe5e8",
//   },
// ];

// const navLinks = [
//   { label: "Accueil", href: "#accueil" },
//   { label: "Services", href: "#services" },
//   { label: "Réalisations", href: "#realisations" },
//   { label: "À propos", href: "#apropos" },
//   { label: "Contact", href: "#contact" },
// ];

// function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
//   return (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       aria-hidden="true"
//     >
//       {diagonal ? (
//         <path
//           d="M7 17 17 7M7 7h10v10"
//           stroke="currentColor"
//           strokeWidth="1.7"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       ) : (
//         <path
//           d="M4 12h15m-6-6 6 6-6 6"
//           stroke="currentColor"
//           strokeWidth="1.7"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       )}
//     </svg>
//   );
// }

// function Brand({ light = false }: { light?: boolean }) {
//   return (
//     <a
//       href="#accueil"
//       aria-label="DavCréativ, accueil"
//       className={`font-display text-[23px] font-bold tracking-[-1.5px] ${
//         light ? "text-white" : "text-[#1a1a1a]"
//       }`}
//     >
//       DavCréativ<span className="text-[#c6a800]">®</span>
//       <span className="ml-1 text-[10px] font-medium tracking-normal opacity-50">
//         STUDIO
//       </span>
//     </a>
//   );
// }

// export default function HomePage() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <main className="overflow-hidden">
//       {/* HEADER */}
//       <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10 text-white">
//         <div className="container-site flex h-[76px] items-center justify-between gap-5">
//           <Brand light />

//           <nav className="hidden items-center gap-7 lg:flex">
//             {navLinks.map((link) => (
//               <a
//                 key={link.href}
//                 href={link.href}
//                 className="text-[13px] text-white/65 transition-colors hover:text-[#ffd700]"
//               >
//                 {link.label}
//               </a>
//             ))}
//           </nav>

//           <a
//             href="#contact"
//             className="hidden items-center gap-3 rounded-full border border-[#ffd700]/60 px-5 py-3 text-xs font-semibold transition-colors hover:bg-[#ffd700] hover:text-black sm:flex"
//           >
//             Parlons de votre projet <ArrowIcon diagonal />
//           </a>

//           <button
//             type="button"
//             aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
//             aria-expanded={menuOpen}
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 lg:hidden"
//           >
//             <span className="text-xl">{menuOpen ? "×" : "☰"}</span>
//           </button>
//         </div>

//         {menuOpen && (
//           <nav className="border-t border-white/10 bg-[#1a1a1a] px-[18px] py-5 lg:hidden">
//             {navLinks.map((link) => (
//               <a
//                 key={link.href}
//                 href={link.href}
//                 onClick={() => setMenuOpen(false)}
//                 className="block border-b border-white/10 py-4 text-sm text-white/80 transition-colors hover:text-[#ffd700]"
//               >
//                 {link.label}
//               </a>
//             ))}
//             <a
//               href="#contact"
//               onClick={() => setMenuOpen(false)}
//               className="mt-5 flex items-center justify-between rounded-xl bg-[#ffd700] px-4 py-3 text-sm font-semibold text-black"
//             >
//               Démarrer un projet <ArrowIcon />
//             </a>
//           </nav>
//         )}
//       </header>

//       {/* HERO */}
//       <section
//         id="accueil"
//         className="relative flex min-h-[720px] items-center overflow-hidden bg-[#1a1a1a] pb-20 pt-32 text-white sm:min-h-[760px] lg:min-h-[790px]"
//       >
//         <div className="gold-glow pointer-events-none absolute left-1/2 top-[12%] h-[560px] w-[760px] -translate-x-1/2" />

//         <div className="pointer-events-none absolute inset-0 opacity-[0.045]">
//           <div
//             className="h-full w-full"
//             style={{
//               backgroundImage:
//                 "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
//               backgroundSize: "64px 64px",
//               maskImage:
//                 "linear-gradient(to bottom, black, transparent 90%)",
//             }}
//           />
//         </div>

//         <div className="container-site relative z-10 mx-auto text-center">
//           <div className="glass mx-auto mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2.5">
//             <span className="h-2 w-2 rounded-full bg-[#ffd700]" />
//             <span className="text-[10px] font-medium uppercase tracking-[2px] text-white/75 sm:text-xs">
//               Studio créatif · Design & Digital
//             </span>
//           </div>

//           <h1 className="font-display text-balance mx-auto max-w-[1000px] text-[clamp(2.7rem,7.1vw,6.2rem)] font-medium leading-[1.02] tracking-[-0.065em]">
//             Nous donnons
//             <br />
//             forme à vos{" "}
//             <span className="relative inline-block text-[#ffd700]">
//               idées.
//               <svg
//                 className="absolute -bottom-2 left-0 w-full"
//                 viewBox="0 0 200 10"
//                 fill="none"
//                 aria-hidden="true"
//               >
//                 <path
//                   d="M2 7C52 1 136 1 198 5"
//                   stroke="#FFD700"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   opacity=".65"
//                 />
//               </svg>
//             </span>
//           </h1>

//           <p className="mx-auto mt-8 max-w-[570px] text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
//             Nous imaginons des identités visuelles, des expériences digitales
//             et des solutions créatives qui font avancer les marques.
//           </p>

//           <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
//             <a
//               href="#realisations"
//               className="flex min-h-14 w-full items-center justify-center gap-4 rounded-full bg-[#ffd700] px-7 text-sm font-semibold text-[#1a1a1a] transition-transform hover:scale-[1.02] sm:w-auto"
//             >
//               Explorer nos réalisations <ArrowIcon diagonal />
//             </a>

//             <a
//               href="#services"
//               className="flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-white/15 px-7 text-sm text-white/80 transition-colors hover:border-white/40 hover:text-white sm:w-auto"
//             >
//               Découvrir nos services <ArrowIcon />
//             </a>
//           </div>

//           <div className="mx-auto mt-16 grid max-w-[680px] grid-cols-3 border-t border-white/10 pt-7 text-left sm:mt-20">
//             <div className="px-2 sm:px-6">
//               <p className="font-display text-xl font-semibold sm:text-3xl">
//                 Design
//               </p>
//               <p className="mt-2 text-[10px] text-white/45 sm:text-xs">
//                 Des idées visuelles fortes
//               </p>
//             </div>
//             <div className="border-x border-white/10 px-3 sm:px-6">
//               <p className="font-display text-xl font-semibold sm:text-3xl">
//                 Digital
//               </p>
//               <p className="mt-2 text-[10px] text-white/45 sm:text-xs">
//                 Des expériences utiles
//               </p>
//             </div>
//             <div className="px-3 sm:px-6">
//               <p className="font-display text-xl font-semibold sm:text-3xl">
//                 Impact
//               </p>
//               <p className="mt-2 text-[10px] text-white/45 sm:text-xs">
//                 Des marques mémorables
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 reveal-line" />
//       </section>

//       {/* INTRODUCTION */}
//       <section className="section-padding bg-[#f7f7f5]">
//         <div className="container-site grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end lg:gap-20">
//           <div>
//             <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[2px] text-[#9c8200]">
//               <span className="h-px w-8 bg-[#c6a800]" />
//               Notre vision
//             </p>
//             <h2 className="font-display text-balance text-4xl font-medium leading-[1.12] tracking-[-2px] sm:text-5xl lg:text-[58px]">
//               La créativité
//               <br />
//               au service de
//               <br />
//               <span className="text-[#a88e00]">vos ambitions.</span>
//             </h2>
//           </div>

//           <div className="max-w-[600px] lg:pb-2">
//             <p className="text-base leading-8 text-[#626262] sm:text-lg">
//               Chez DavCréativ, nous croyons qu&apos;une bonne idée mérite
//               plus qu&apos;une belle apparence. Elle mérite une identité,
//               une stratégie et une expérience capables de créer une vraie
//               différence.
//             </p>
//             <a
//               href="#apropos"
//               className="mt-7 inline-flex items-center gap-3 border-b border-[#1a1a1a]/20 pb-2 text-sm font-semibold transition-colors hover:border-[#b89b00] hover:text-[#9c8200]"
//             >
//               Découvrez notre approche <ArrowIcon diagonal />
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* SERVICES */}
//       <section id="services" className="section-padding bg-white">
//         <div className="container-site">
//           <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
//             <div>
//               <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[2px] text-[#9c8200]">
//                 <span className="h-px w-8 bg-[#c6a800]" />
//                 Ce que nous faisons
//               </p>
//               <h2 className="font-display text-4xl font-medium tracking-[-2px] sm:text-5xl">
//                 Nos expertises<span className="text-[#c6a800]">.</span>
//               </h2>
//             </div>
//             <p className="max-w-[390px] text-sm leading-7 text-[#777]">
//               Des compétences complémentaires pour vous accompagner de
//               l&apos;idée initiale à sa réalisation concrète.
//             </p>
//           </div>

//           <div className="grid border-l border-t border-[#eaeaea] sm:grid-cols-2 lg:grid-cols-3">
//             {services.map((service) => (
//               <article
//                 key={service.number}
//                 className="group flex min-h-[290px] flex-col border-b border-r border-[#eaeaea] p-6 transition-colors hover:bg-[#faf9f4] sm:p-8 lg:min-h-[320px]"
//               >
//                 <div className="flex items-center justify-between">
//                   <span className="font-display text-xs text-[#9c8200]">
//                     / {service.number}
//                   </span>
//                   <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e5e5] transition-all group-hover:border-[#ffd700] group-hover:bg-[#ffd700]">
//                     <ArrowIcon diagonal />
//                   </span>
//                 </div>

//                 <h3 className="font-display mt-8 text-xl font-semibold tracking-[-.6px] sm:text-2xl">
//                   {service.title}
//                 </h3>

//                 <p className="mt-4 flex-1 text-sm leading-7 text-[#777]">
//                   {service.description}
//                 </p>

//                 <div className="mt-6 flex flex-wrap gap-2">
//                   {service.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="rounded-full bg-[#f3f3f0] px-3 py-1.5 text-[10px] text-[#666]"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </article>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* REALISATIONS */}
//       <section
//         id="realisations"
//         className="section-padding bg-[#f0f0ed]"
//       >
//         <div className="container-site">
//           <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
//             <div>
//               <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[2px] text-[#9c8200]">
//                 <span className="h-px w-8 bg-[#c6a800]" />
//                 Sélection créative
//               </p>
//               <h2 className="font-display text-4xl font-medium tracking-[-2px] sm:text-5xl">
//                 Des idées en action<span className="text-[#c6a800]">.</span>
//               </h2>
//             </div>
//             <p className="max-w-[340px] text-sm leading-7 text-[#737373]">
//               Des projets conçus pour répondre à de vrais besoins et donner
//               vie à de nouvelles perspectives.
//             </p>
//           </div>

//           <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
//             {projects.map((project) => (
//               <article
//                 key={project.number}
//                 className="project-card group min-w-0"
//               >
//                 <div
//                   className="relative aspect-[4/4.3] overflow-hidden rounded-sm"
//                   style={{ backgroundColor: project.background }}
//                 >
//                   <img
//                     src={project.image}
//                     alt={`Visuel illustratif du projet ${project.name}`}
//                     loading="lazy"
//                     className="h-full w-full object-cover"
//                   />
//                   <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-2 text-[10px] font-medium text-[#1a1a1a] backdrop-blur">
//                     PROJET {project.number}
//                   </span>
//                   <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#ffd700] text-black">
//                     <ArrowIcon diagonal />
//                   </span>
//                 </div>
//                 <div className="flex items-start justify-between gap-4 pt-5">
//                   <div>
//                     <h3 className="font-display text-xl font-semibold">
//                       {project.name}
//                     </h3>
//                     <p className="mt-2 text-xs text-[#777]">
//                       {project.category}
//                     </p>
//                   </div>
//                   <span className="pt-1 text-xs text-[#999]">
//                     {project.number}
//                   </span>
//                 </div>
//               </article>
//             ))}
//           </div>

//           <p className="mt-10 text-xs leading-6 text-[#777]">
//             Les visuels présentés sont illustratifs. Remplace-les par les
//             créations réelles de DavCréativ avant la mise en ligne.
//           </p>
//         </div>
//       </section>

//       {/* A PROPOS */}
//       <section id="apropos" className="relative bg-[#1a1a1a] text-white">
//         <div className="gold-glow pointer-events-none absolute right-0 top-0 h-[420px] w-[500px]" />

//         <div className="container-site section-padding relative grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-center lg:gap-24">
//           <div>
//             <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[2px] text-[#ffd700]">
//               <span className="h-px w-8 bg-[#ffd700]" />
//               À propos de DavCréativ
//             </p>
//             <h2 className="font-display text-balance text-4xl font-medium leading-[1.12] tracking-[-2px] sm:text-5xl lg:text-[60px]">
//               Nous créons avec intention.
//               <span className="text-[#ffd700]"> Nous concevons pour durer.</span>
//             </h2>
//           </div>

//           <div>
//             <p className="text-sm leading-8 text-white/60 sm:text-base">
//               DavCréativ est un studio créatif qui associe design, technologie
//               et réflexion stratégique pour accompagner les marques,
//               entreprises et entrepreneurs dans leurs projets.
//             </p>
//             <p className="mt-5 text-sm leading-8 text-white/60 sm:text-base">
//               Notre approche privilégie la clarté, la cohérence et
//               l&apos;utilité : chaque détail doit servir une idée et chaque
//               création doit avoir une raison d&apos;être.
//             </p>
//             <a
//               href="#contact"
//               className="mt-8 inline-flex items-center gap-4 rounded-full bg-[#ffd700] px-6 py-4 text-sm font-semibold text-[#1a1a1a] transition-transform hover:scale-[1.02]"
//             >
//               Construisons quelque chose ensemble <ArrowIcon diagonal />
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* BANDEAU */}
//       <section className="overflow-hidden bg-[#ffd700] py-6">
//         <div className="container-site flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-center font-display text-sm font-semibold tracking-tight sm:gap-x-12 sm:text-lg">
//           <span>Créer.</span>
//           <span className="text-black/30">✳</span>
//           <span>Imaginer.</span>
//           <span className="text-black/30">✳</span>
//           <span>Concevoir.</span>
//           <span className="text-black/30">✳</span>
//           <span>Transformer.</span>
//         </div>
//       </section>

//       {/* CONTACT */}
//       <section id="contact" className="section-padding bg-[#f7f7f5]">
//         <div className="container-site">
//           <div className="relative overflow-hidden rounded-2xl bg-[#1a1a1a] px-6 py-14 text-center text-white sm:px-12 sm:py-20 lg:px-20 lg:py-24">
//             <div className="gold-glow pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2" />

//             <div className="relative z-10">
//               <p className="mb-5 text-xs font-semibold uppercase tracking-[2px] text-[#ffd700]">
//                 Et si nous commencions ?
//               </p>
//               <h2 className="font-display mx-auto max-w-[800px] text-balance text-4xl font-medium leading-[1.1] tracking-[-2px] sm:text-6xl lg:text-7xl">
//                 Votre prochaine idée mérite de prendre vie.
//               </h2>
//               <p className="mx-auto mt-6 max-w-[480px] text-sm leading-7 text-white/55 sm:text-base">
//                 Parlons de votre projet, de vos objectifs et de la manière
//                 dont nous pouvons vous aider à les atteindre.
//               </p>

//               <a
//                 href="mailto:contact@davcreativ.com?subject=Demande%20de%20projet"
//                 className="mt-9 inline-flex min-h-14 items-center justify-center gap-4 rounded-full bg-[#ffd700] px-7 text-sm font-semibold text-[#1a1a1a] transition-transform hover:scale-[1.03]"
//               >
//                 Parlons de votre projet <ArrowIcon diagonal />
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-[#1a1a1a] text-white">
//         <div className="container-site py-10">
//           <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-8 sm:flex-row sm:items-center">
//             <div>
//               <Brand light />
//               <p className="mt-3 text-xs text-white/45">
//                 Studio créatif · Design graphique & Digital
//               </p>
//             </div>

//             <nav className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/60">
//               {navLinks.map((link) => (
//                 <a
//                   key={link.href}
//                   href={link.href}
//                   className="transition-colors hover:text-[#ffd700]"
//                 >
//                   {link.label}
//                 </a>
//               ))}
//             </nav>
//           </div>

//           <div className="flex flex-col justify-between gap-3 pt-6 text-[11px] text-white/40 sm:flex-row">
//             <p>
//               © 2026 DavCréativ. Tous droits réservés.
//             </p>
//             <p>Imaginé avec intention. Conçu avec créativité.</p>
//           </div>
//         </div>
//       </footer>
//     </main>
//   );
// }

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import Expertises from "@/components/home/Expertises";
import Realisations from "@/components/home/Realisations";
import About from "@/components/home/About";
import Formations from "@/components/home/Formations";
import Testimonials from "@/components/home/Testimonials";
import Contact from "@/components/home/Contact";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Expertises />
        <Realisations />
        <About />
        <Formations />
        <Testimonials />
        <Contact />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
