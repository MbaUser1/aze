
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const testimonials = [
  {
    label: "Votre client",
    quote:
      "Ajoutez ici un retour authentique sur la qualité du travail, la collaboration et le résultat obtenu.",
    role: "Nom et fonction du client",
  },
  {
    label: "Votre partenaire",
    quote:
      "Présentez ici l'expérience réelle d'un partenaire ayant travaillé avec DavCréativ.",
    role: "Nom et fonction du partenaire",
  },
  {
    label: "Votre apprenant",
    quote:
      "Ajoutez ici le témoignage d'un apprenant sur une formation ou un accompagnement créatif.",
    role: "Nom et formation suivie",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <Reveal>
          <div className="mb-12">
            <SectionHeading
              eyebrow="Ils nous font confiance"
              title="Les belles collaborations laissent une trace."
              description="Les relations durables se construisent grâce à l'écoute, au sérieux et à la qualité du travail."
            />
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.label} delay={index * 80}>
              <article className="glass-light relative h-full rounded-2xl p-6 sm:p-7">
                <span
                  aria-hidden="true"
                  className="font-display text-5xl leading-none text-[#C6A800]"
                >
                  “
                </span>

                <p className="mt-3 text-sm leading-7 text-[#555]">
                  {item.quote}
                </p>

                <div className="mt-7 border-t border-black/10 pt-5">
                  <p className="text-xs font-bold">{item.label}</p>
                  <p className="mt-1 text-[10px] text-[#888]">{item.role}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-5 text-[10px] text-[#888]">
          Textes provisoires à remplacer avant publication.
        </p>
      </div>
    </section>
  );
}



// const clientLogos = [
//   { name: "HOMEYA", initials: "H", style: "font-semibold tracking-[0.18em]" },
//   { name: "IJC", initials: "I", style: "font-black tracking-[0.12em]" },
//   { name: "VOTRE MARQUE", initials: "V", style: "font-semibold tracking-[0.12em]" },
//   { name: "PARTENAIRE", initials: "P", style: "font-bold tracking-[0.1em]" },
//   { name: "CLIENT", initials: "C", style: "font-semibold tracking-[0.16em]" },
// ];

// const testimonials = [
//   {
//     quote:
//       "Une approche créative, une vraie écoute et un résultat qui correspond parfaitement à notre vision. La collaboration a été fluide du début à la fin.",
//     name: "Nom du client",
//     role: "Direction · Entreprise",
//     initials: "NC",
//     project: "Identité visuelle",
//   },
//   {
//     quote:
//       "Nous avons particulièrement apprécié le souci du détail et la capacité à transformer nos idées en une proposition visuelle claire, cohérente et professionnelle.",
//     name: "Nom du client",
//     role: "Responsable de projet",
//     initials: "NC",
//     project: "Communication digitale",
//   },
//   {
//     quote:
//       "Une collaboration enrichissante, avec une équipe disponible, créative et attentive à nos besoins. Le résultat reflète pleinement l'image que nous souhaitions transmettre.",
//     name: "Nom du client",
//     role: "Entrepreneur · Partenaire",
//     initials: "NC",
//     project: "Design & création",
//   },
// ];

// function QuoteIcon() {
//   return (
//     <svg
//       viewBox="0 0 40 40"
//       fill="none"
//       aria-hidden="true"
//       className="h-9 w-9"
//     >
//       <path
//         d="M17 9H8.5C5.5 9 4 11 4 14v7h10v10H4V20c0-7 3-11 10-11h3Zm19 0h-8.5C24.5 9 23 11 23 14v7h10v10H23V20c0-7 3-11 10-11h3Z"
//         fill="currentColor"
//         opacity=".75"
//       />
//     </svg>
//   );
// }

// export default function Testimonials() {
//   return (
//     <section
//       id="temoignages"
//       className="relative overflow-hidden bg-[#F7F7F4] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
//     >
//       <div className="mx-auto max-w-7xl">
//         {/* En-tête */}
//         <div className="mx-auto max-w-3xl text-center">
//           <div className="mb-5 inline-flex items-center gap-3">
//             <span className="h-px w-8 bg-[#B99A00]" />
//             <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/55 sm:text-xs">
//               La confiance avant tout
//             </span>
//             <span className="h-px w-8 bg-[#B99A00]" />
//           </div>

//           <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl">
//             Ils nous font{" "}
//             <span className="relative inline-block">
//               confiance
//               <span className="absolute -bottom-1 left-0 h-[5px] w-full rounded-full bg-[#FFD700]/80 sm:-bottom-2" />
//             </span>
//           </h2>

//           <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#1A1A1A]/60 sm:text-base sm:leading-8">
//             Derrière chaque projet réussi, une rencontre, une vision partagée
//             et une relation construite dans la durée.
//           </p>
//         </div>

//         {/* Logos des clients */}
//         <div className="mt-16 sm:mt-20">
//           <div className="mb-7 flex items-center justify-center gap-3">
//             <span className="h-px w-6 bg-black/10" />
//             <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-black/45 sm:text-xs">
//               Des collaborations qui nous inspirent
//             </p>
//             <span className="h-px w-6 bg-black/10" />
//           </div>

//           <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-black/[0.07] bg-white/60 sm:grid-cols-3 lg:grid-cols-5">
//             {clientLogos.map((client, index) => (
//               <div
//                 key={client.name + index}
//                 className={`group flex min-h-[104px] items-center justify-center gap-3 px-4 py-6 transition-colors duration-300 hover:bg-white ${
//                   index < 4 ? "border-b border-black/[0.06] lg:border-b-0" : ""
//                 } ${
//                   index % 2 === 0 ? "border-r border-black/[0.06]" : ""
//                 } ${
//                   index === 1 ? "sm:border-r-0 lg:border-r" : ""
//                 } ${
//                   index === 2 ? "sm:border-r sm:border-black/[0.06] lg:border-r" : ""
//                 } ${
//                   index === 3 ? "sm:border-r-0 lg:border-r" : ""
//                 } ${
//                   index === 4 ? "col-span-2 sm:col-span-1" : ""
//                 }`}
//               >
//                 <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1A1A1A] text-sm font-bold text-[#FFD700] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
//                   {client.initials}
//                 </span>
//                 <span
//                   className={`text-[11px] text-[#1A1A1A]/55 transition-colors duration-300 group-hover:text-[#1A1A1A] sm:text-xs ${client.style}`}
//                 >
//                   {client.name}
//                 </span>
//               </div>
//             ))}
//           </div>

//           <p className="mt-3 text-center text-[10px] text-black/35">
//             Emplacements de démonstration — remplacez-les par les logos réels.
//           </p>
//         </div>

//         {/* Témoignages */}
//         <div className="mt-20 sm:mt-28">
//           <div className="mb-9 flex flex-col justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
//             <div>
//               <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F7800] sm:text-xs">
//                 Des expériences, des histoires
//               </p>
//               <h3 className="font-display text-3xl tracking-tight text-[#1A1A1A] sm:text-4xl lg:text-5xl">
//                 Leurs mots, notre fierté.
//               </h3>
//             </div>

//             <p className="max-w-sm text-sm leading-6 text-black/55 sm:text-right">
//               Chaque retour nous pousse à aller plus loin dans la qualité de
//               notre accompagnement.
//             </p>
//           </div>

//           <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
//             {testimonials.map((testimonial, index) => (
//               <article
//                 key={testimonial.project}
//                 className="group relative flex h-full flex-col rounded-2xl border border-black/[0.07] bg-white/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#D6B600]/50 hover:bg-white hover:shadow-[0_18px_50px_rgba(26,26,26,0.06)] sm:p-7 lg:p-8"
//                 style={{
//                   animation: `testimonial-appear 650ms ease-out ${index * 120}ms both`,
//                 }}
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="text-[#C2A000]">
//                     <QuoteIcon />
//                   </div>
//                   <span className="rounded-full border border-black/[0.07] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-black/45">
//                     {testimonial.project}
//                   </span>
//                 </div>

//                 <div className="my-6 flex gap-1" aria-label="Décoration">
//                   {[0, 1, 2, 3, 4].map((star) => (
//                     <svg
//                       key={star}
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                       aria-hidden="true"
//                       className="h-3.5 w-3.5 text-[#D2AE00]"
//                     >
//                       <path d="m10 1.5 2.55 5.17 5.7.83-4.12 4.02.97 5.68L10 14.52l-5.1 2.68.97-5.68L1.75 7.5l5.7-.83L10 1.5Z" />
//                     </svg>
//                   ))}
//                 </div>

//                 <blockquote className="flex-1 text-sm leading-7 text-[#1A1A1A]/75 sm:text-[15px] sm:leading-8">
//                   « {testimonial.quote} »
//                 </blockquote>

//                 <div className="my-7 h-px bg-black/[0.07] transition-colors duration-300 group-hover:bg-[#FFD700]/60" />

//                 <div className="flex items-center gap-3">
//                   <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D9B900]/30 bg-[#FFD700]/15 text-xs font-bold text-[#6B5900]">
//                     {testimonial.initials}
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-sm font-semibold text-[#1A1A1A]">
//                       {testimonial.name}
//                     </p>
//                     <p className="mt-1 text-xs leading-5 text-black/45">
//                       {testimonial.role}
//                     </p>
//                   </div>
//                   <span className="ml-auto text-xl text-black/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#8F7800]">
//                     ↗
//                   </span>
//                 </div>
//               </article>
//             ))}
//           </div>
//           <p className="mt-4 text-center text-[10px] text-black/35">
//             Témoignages de démonstration — remplacez-les par les avis authentiques de vos clients.
//           </p>
//         </div>

//         {/* Conclusion */}
//         <div className="relative mt-16 overflow-hidden rounded-2xl bg-[#1A1A1A] px-6 py-9 sm:mt-20 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:px-12">
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full bg-[#FFD700]/10 blur-[80px]"
//           />
//           <div className="relative">
//             <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFD700] sm:text-xs">
//               Et si on travaillait ensemble ?
//             </p>
//             <h3 className="max-w-xl font-display text-2xl leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
//               Votre projet mérite une attention particulière.
//             </h3>
//             <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
//               Parlons de vos idées et donnons-leur une forme qui vous ressemble.
//             </p>
//           </div>

//           <a
//             href="#contact"
//             className="relative mt-7 inline-flex shrink-0 items-center justify-center gap-4 rounded-full bg-[#FFD700] px-6 py-4 text-xs font-bold text-[#1A1A1A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white sm:text-sm lg:mt-0"
//           >
//             Démarrer un projet
//             <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
//               ↗
//             </span>
//           </a>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes testimonial-appear {
//           from {
//             opacity: 0;
//             transform: translateY(14px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           article {
//             animation: none !important;
//             transition: none !important;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }
