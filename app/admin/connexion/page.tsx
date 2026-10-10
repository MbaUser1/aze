"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const supabase = createClient();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error || !data.user) {
        setErrorMessage("Adresse e-mail ou mot de passe incorrect.");
        return;
      }

      if (data.user.app_metadata?.role !== "admin") {
        await supabase.auth.signOut();
        setErrorMessage("Ce compte ne dispose pas des droits administrateur.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setErrorMessage(
        "Impossible de se connecter. Vérifie ta connexion puis réessaie.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1A1A1A] px-5 py-12 text-white">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-3"
          aria-label="Retour à l’accueil DavCréativ"
        >--
          {/* <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFD700] text-xl font-black text-[#1A1A1A]">
            D
          </span>
          <span className="text-xl font-bold tracking-tight">
            Dav<span className="text-[#FFD700]">Créativ</span>
          </span> */}
        </Link>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl sm:p-9">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD700]">
            Espace sécurisé
          </p>

          <h1 className="text-3xl font-bold tracking-tight">Administration</h1>

          <p className="mt-3 text-sm leading-6 text-white/60">
            Connecte-toi pour gérer les ressources et les publications de
            DavCréativ.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-white/80"
              >
                Adresse e-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@davcreativ.com"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#FFD700]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-white/80"
              >
                Mot de passe
              </label>
              <div className="flex rounded-xl border border-white/10 bg-black/20 focus-within:border-[#FFD700]">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Ton mot de passe"
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-white/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="px-4 text-xs font-semibold text-white/60 hover:text-[#FFD700]"
                >
                  {showPassword ? "Masquer" : "Afficher"}
                </button>
              </div>
            </div>

            {errorMessage && (
              <p
                role="alert"
                className="rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300"
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-[#FFD700] px-5 py-3.5 font-bold text-[#1A1A1A] transition hover:bg-[#ffe44d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <Link
            href="/"
            className="mt-6 block text-center text-sm text-white/50 transition hover:text-[#FFD700]"
          >
            Retour au site
          </Link>
        </section>

        <p className="mt-6 text-center text-xs text-white/35">
          © 2026 DavCréativ — Espace d’administration
        </p>
      </div>
    </main>
  );
}
