
import Button from "@/components/ui/Button";

export default function Newsletter() {
  return (
    <section className="border-t border-black/[0.07] bg-[#F7F7F5] py-12">
      <div className="container-site flex flex-col justify-between gap-7 md:flex-row md:items-center">
        <div>
          <p className="font-display text-2xl sm:text-3xl">
            Un peu de créativité dans votre boîte mail.
          </p>
          <p className="mt-2 max-w-lg text-xs leading-6 text-[#777]">
            Échangeons autour du design, des outils numériques et des
            nouvelles idées créatives.
          </p>
        </div>

        <Button
          href="mailto:contact@davcreativ.com?subject=Inscription%20aux%20actualites%20DavCreativ"
          variant="dark"
          className="shrink-0 self-start md:self-auto"
        >
          Recevoir nos actualités <span>↗</span>
        </Button>
      </div>
    </section>
  );
}

// const socialLinks = [
//   {
//     name: "Instagram",
//     href: "https://www.instagram.com/",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
//         <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
//         <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
//         <circle cx="17.5" cy="6.8" r="1" fill="currentColor" />
//       </svg>
//     ),
//   },
//   {
//     name: "Facebook",
//     href: "https://www.facebook.com/",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
//         <path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4Z" />
//       </svg>
//     ),
//   },
//   {
//     name: "LinkedIn",
//     href: "https://www.linkedin.com/",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
//         <path d="M5.2 8.3a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3.5 9.8h3.4V20H3.5V9.8Zm5.5 0h3.3v1.4h.1c.5-.9 1.6-1.8 3.3-1.8 3.5 0 4.2 2.3 4.2 5.2V20h-3.4v-4.8c0-1.1 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5V20H9V9.8Z" />
//       </svg>
//     ),
//   },
//   {
//     name: "WhatsApp",
//     href: "https://wa.me/",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
//         <path d="M20 11.7a8 8 0 0 1-11.8 7l-4.2 1.1 1.1-4.1A8 8 0 1 1 20 11.7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
//         <path d="M9 8.2c.2-.4.4-.4.7-.4h.4c.2 0 .3.1.4.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4 0 .6.4.7 1.1 1.3 1.8 1.7.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.4 0 .3-.2 1.1-.7 1.5-.5.4-1.1.6-1.8.4-1-.2-2.2-.8-3.4-1.9-1-.9-1.7-2.1-1.9-3.1-.2-.9.1-1.7.6-2.1Z" fill="currentColor" />
//       </svg>
//     ),
//   },
// ];

// export default function Newsletter() {
//   return (
//     <section className="bg-[#F7F7F4] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
//       <div className="mx-auto max-w-7xl">
//         <div className="relative isolate overflow-hidden rounded-[28px] bg-[#1A1A1A] p-7 sm:p-10 lg:p-14">
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full bg-[#FFD700]/10 blur-[90px]"
//           />

//           <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
//             <div>
//               <div className="mb-5 inline-flex items-center gap-3">
//                 <span className="h-px w-8 bg-[#FFD700]" />
//                 <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55 sm:text-xs">
//                   Une idée en tête ?
//                 </span>
//               </div>

//               <h2 className="max-w-2xl font-display text-3xl leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
//                 Votre prochain projet mérite de{" "}
//                 <span className="text-[#FFD700]">prendre forme.</span>
//               </h2>

//               <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
//                 Identité visuelle, design graphique, développement web ou
//                 communication digitale : parlons de vos ambitions et imaginons
//                 ensemble la suite.
//               </p>

//               <div className="mt-8">
//                 <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
//                   Suivez notre univers créatif
//                 </p>

//                 <div className="flex flex-wrap gap-3">
//                   {socialLinks.map((social) => (
//                     <a
//                       key={social.name}
//                       href={social.href}
//                       target="_blank"
//                       rel="noreferrer"
//                       aria-label={`DavCréativ sur ${social.name}`}
//                       className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/65 transition-all duration-300 hover:-translate-y-1 hover:border-[#FFD700]/40 hover:bg-[#FFD700]/10 hover:text-[#FFD700]"
//                     >
//                       <span className="h-5 w-5">{social.icon}</span>
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8 lg:w-[280px]">
//               <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFD700] text-xl text-[#1A1A1A]">
//                 ↗
//               </span>

//               <div>
//                 <h3 className="font-display text-2xl text-white">
//                   Faisons connaissance.
//                 </h3>
//                 <p className="mt-3 text-sm leading-6 text-white/50">
//                   Présentez-nous votre besoin. Nous prendrons le temps d’étudier
//                   votre projet avec attention.
//                 </p>
//               </div>

//               <a
//                 href="/contact"
//                 className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#FFD700] px-5 py-4 text-sm font-bold text-[#1A1A1A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
//               >
//                 Parlons
//                 <span className="transition-transform duration-300 group-hover:translate-x-1">
//                   →
//                 </span>
//               </a>
//             </div>
//           </div>

//           <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
//             <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35 sm:text-xs">
//               DavCréativ · L’idée prend forme.
//             </p>
//             <span aria-hidden="true" className="text-xl text-[#FFD700]/70">
//               ✳
//             </span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
