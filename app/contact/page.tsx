"use client";

import { useState, type FormEvent } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const services = [
  "Design graphique",
  "Identité visuelle & branding",
  "Développement Web",
  "Développement Mobile",
  "Communication digitale",
  "Design produit & Packaging",
  "Impression numérique",
  "Formation créative & digitale",
  "Autre demande",
];

const budgets = [
  "Moins de 50 000 FCFA",
  "50 000 – 150 000 FCFA",
  "150 000 – 300 000 FCFA",
  "300 000 – 500 000 FCFA",
  "Plus de 500 000 FCFA",
  "À définir ensemble",
];

const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.5" cy="6.8" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M5.2 8.3a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3.5 9.8h3.4V20H3.5V9.8Zm5.5 0h3.3v1.4h.1c.5-.9 1.6-1.8 3.3-1.8 3.5 0 4.2 2.3 4.2 5.2V20h-3.4v-4.8c0-1.1 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5V20H9V9.8Z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20 11.7a8 8 0 0 1-11.8 7l-4.2 1.1 1.1-4.1A8 8 0 1 1 20 11.7Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M9 8.2c.2-.4.4-.4.7-.4h.4c.2 0 .3.1.4.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4 0 .6.4.7 1.1 1.3 1.8 1.7.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.4 0 .3-.2 1.1-.7 1.5-.5.4-1.1.6-1.8.4-1-.2-2.2-.8-3.4-1.9-1-.9-1.7-2.1-1.9-3.1-.2-.9.1-1.7.6-2.1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  date: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  date: "",
  message: "",
};

function ContactIcon({
  type,
}: {
  type: "mail" | "clock" | "location" | "arrow";
}) {
  if (type === "mail") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="m4 7 8 6 8-6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 7v5l3 2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "location") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle
          cx="12"
          cy="10"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function updateField<K extends keyof ContactForm>(
    field: K,
    value: ContactForm[K],
  ) {
    setForm((previous) => ({ ...previous, [field]: value }));
    setSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent(`Demande de projet — ${form.service}`);

    const body = encodeURIComponent(
      `Bonjour DavCréativ,

Je souhaite vous contacter au sujet d'un projet.

INFORMATIONS DU CLIENT
Nom : ${form.name}
E-mail : ${form.email}
Téléphone : ${form.phone || "Non renseigné"}

DÉTAILS DU PROJET
Service : ${form.service}
Budget indicatif : ${form.budget || "À définir"}
Date souhaitée : ${form.date || "À convenir"}

DESCRIPTION
${form.message}

Merci,
${form.name}`,
    );

    // Remplace cette adresse par l'adresse professionnelle réelle.
    window.location.href = `mailto:contact@davcreativ.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
  }

  return (
    <>
      <Header />

      <main className="overflow-hidden bg-[#F7F7F4] text-[#1A1A1A]">
        {/* HERO */}

        {/* HERO SOMBRE */}
        <section className="relative isolate overflow-hidden bg-[#1A1A1A] px-5 pb-16 pt-36 text-white sm:px-8 sm:pb-20 sm:pt-40 lg:px-12 lg:pb-24 lg:pt-44">
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-70" />
          {/* Lumières décoratives */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-0 -z-10 h-[420px] w-[420px] rounded-full bg-[#FFD700]/10 blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 left-[15%] -z-10 h-72 w-72 rounded-full bg-[#FFD700]/[0.05] blur-[100px]"
          />

          <div className="relative mx-auto max-w-7xl">
            {/* Surtitre */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-9 bg-[#FFD700]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/55 sm:text-xs">
                Contact & collaboration
              </span>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              {/* Titre */}
              <div>
                <h1 className="max-w-4xl font-display text-5xl leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-8xl">
                  Parlons de ce qui{" "}
                  <span className="relative inline-block text-[#FFD700]">
                    vous inspire.
                    {/* <span className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-[#FFD700]/50 sm:-bottom-2 sm:h-2" /> */}
                  </span>
                </h1>
              </div>

              {/* Introduction */}
              <div className="max-w-md lg:justify-self-end lg:pb-2">
                <p className="text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                  Chaque projet commence par une conversation. Présentez-nous
                  votre idée, vos objectifs et vos ambitions. Nous verrons
                  ensemble comment leur donner forme.
                </p>

                <div className="mt-6 flex items-center gap-3 text-xs font-semibold text-white/75">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFD700]/25 bg-[#FFD700]/10 text-[#FFD700]">
                    ↘
                  </span>
                  Parlons de votre prochain projet
                </div>
              </div>
            </div>

            {/* Séparation */}
            <div className="mt-12 h-px bg-gradient-to-r from-[#FFD700]/40 via-white/10 to-transparent sm:mt-16" />
          </div>
        </section>

        {/* CONTACT ET FORMULAIRE */}
        {/* CONTACT ET FORMULAIRE */}
        <section className="bg-[#F7F7F4] px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-32 lg:px-12 lg:pb-24 lg:pt-36">
          {" "}
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
            {/* COLONNE INFORMATIONS */}
            <aside className="relative h-fit overflow-hidden rounded-[24px] bg-[#1A1A1A] p-7 text-white sm:p-9 lg:sticky lg:top-28">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FFD700]/10 blur-[85px]"
              />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#FFD700]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FFD700]" />
                  Entrons en contact
                </span>

                <h2 className="mt-7 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
                  Une idée mérite une vraie conversation.
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/55">
                  Nous sommes à votre écoute pour comprendre vos besoins et
                  imaginer une solution adaptée à votre projet.
                </p>

                <div className="mt-9 space-y-6 border-t border-white/10 pt-7">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#FFD700]">
                      <ContactIcon type="mail" />
                    </span>
                    <div className="min-w-0 pt-1">
                      <p className="text-xs text-white/40">Adresse e-mail</p>
                      <a
                        href="mailto:contact@davcreativ.com"
                        className="mt-1.5 inline-block break-all text-sm text-white/85 transition-colors hover:text-[#FFD700]"
                      >
                        contact@davcreativ.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#FFD700]">
                      <ContactIcon type="clock" />
                    </span>
                    <div className="pt-1">
                      <p className="text-xs text-white/40">Rendez-vous</p>
                      <p className="mt-1.5 text-sm text-white/85">
                        Sur rendez-vous
                      </p>
                      <p className="mt-1 text-xs leading-5 text-white/40">
                        En ligne ou selon les modalités convenues ensemble.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#FFD700]">
                      <ContactIcon type="location" />
                    </span>
                    <div className="pt-1">
                      <p className="text-xs text-white/40">
                        Zone d'intervention
                      </p>
                      <p className="mt-1.5 text-sm text-white/85">
                        Cameroun & projets à distance
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-9 border-t border-white/10 pt-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                    Suivez notre univers
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`DavCréativ sur ${social.name}`}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/65 transition-all duration-300 hover:-translate-y-1 hover:border-[#FFD700]/40 hover:bg-[#FFD700]/10 hover:text-[#FFD700]"
                      >
                        <span className="h-5 w-5">{social.icon}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-8 rounded-xl border border-[#FFD700]/15 bg-[#FFD700]/[0.05] p-4">
                  <p className="text-sm font-medium text-white">
                    Un projet bien pensé commence ici.
                  </p>
                  <p className="mt-1.5 text-xs leading-6 text-white/45">
                    Décrivez-nous votre besoin, même si votre idée est encore en
                    cours de réflexion.
                  </p>
                </div>
              </div>
            </aside>

            {/* FORMULAIRE */}
            <div
              id="formulaire"
              className="rounded-[24px] border border-black/[0.07] bg-white p-6 sm:p-9 lg:p-11"
            >
              <div className="mb-9">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#927700] sm:text-xs">
                  Votre demande
                </p>
                <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
                  Présentez-nous votre projet.
                </h2>
                <p className="mt-3 text-sm leading-7 text-black/55">
                  Complétez les informations ci-dessous. Les champs marqués d'un
                  astérisque sont obligatoires.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-semibold text-black/75"
                    >
                      Nom complet <span className="text-[#927700]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      placeholder="Votre nom"
                      className="contact-field"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-semibold text-black/75"
                    >
                      Adresse e-mail <span className="text-[#927700]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      placeholder="vous@exemple.com"
                      className="contact-field"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs font-semibold text-black/75"
                    >
                      Téléphone / WhatsApp
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                      placeholder="+237 6XX XXX XXX"
                      className="contact-field"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="mb-2 block text-xs font-semibold text-black/75"
                    >
                      Service recherché{" "}
                      <span className="text-[#927700]">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={form.service}
                      onChange={(event) =>
                        updateField("service", event.target.value)
                      }
                      className="contact-field"
                    >
                      <option value="" disabled>
                        Choisir un service
                      </option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="budget"
                      className="mb-2 block text-xs font-semibold text-black/75"
                    >
                      Budget estimé
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={(event) =>
                        updateField("budget", event.target.value)
                      }
                      className="contact-field"
                    >
                      <option value="">Sélectionner un budget</option>
                      {budgets.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="date"
                      className="mb-2 block text-xs font-semibold text-black/75"
                    >
                      Date souhaitée
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      min={10}
                      value={form.date}
                      onChange={(event) =>
                        updateField("date", event.target.value)
                      }
                      className="contact-field"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-semibold text-black/75"
                  >
                    Parlez-nous de votre projet{" "}
                    <span className="text-[#927700]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                    placeholder="Quel est votre besoin ? Quels sont vos objectifs ? Avez-vous une échéance particulière ?"
                    className="contact-field min-h-36 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#1A1A1A] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#303030] hover:shadow-[0_12px_30px_rgba(26,26,26,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A00] focus-visible:ring-offset-2 sm:w-auto sm:min-w-56"
                >
                  Envoyer ma demande
                  <span className="text-[#FFD700] transition-transform duration-300 group-hover:translate-x-1">
                    <ContactIcon type="arrow" />
                  </span>
                </button>

                {submitted && (
                  <p
                    role="status"
                    className="rounded-xl border border-[#B99A00]/20 bg-[#FFD700]/10 p-4 text-xs leading-6 text-[#514500]"
                  >
                    Votre application de messagerie devrait s'ouvrir avec votre
                    demande préremplie. Vérifiez le message et envoyez-le pour
                    que DavCréativ puisse le recevoir.
                  </p>
                )}

                <p className="text-xs leading-6 text-black/40">
                  Les informations fournies sont destinées au traitement de
                  votre demande. Évitez d'inclure des données confidentielles
                  dans votre message.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        .contact-field {
          width: 100%;
          border: 1px solid rgba(26, 26, 26, 0.11);
          border-radius: 12px;
          background: #f7f7f4;
          padding: 13px 15px;
          font-size: 13px;
          line-height: 1.6;
          color: #1a1a1a;
          outline: none;
          transition:
            border-color 200ms ease,
            background-color 200ms ease,
            box-shadow 200ms ease;
        }

        .contact-field::placeholder {
          color: rgba(26, 26, 26, 0.34);
        }

        .contact-field:focus {
          border-color: #b99a00;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(255, 215, 0, 0.11);
        }

        .contact-field option {
          color: #1a1a1a;
          background: #ffffff;
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-field {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
