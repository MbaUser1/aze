
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "gold" | "glass" | "dark";
};

export default function Button({
  children,
  variant = "gold",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    gold:
      "bg-[#FFD700] text-[#1A1A1A] hover:bg-[#ffe34d] shadow-[0_8px_28px_rgba(255,215,0,0.12)]",
    glass:
      "border border-white/20 bg-white/[0.06] text-white backdrop-blur-xl hover:bg-white/[0.12]",
    dark:
      "bg-[#1A1A1A] text-white hover:bg-[#303030]",
  };

  return (
    <a
      {...props}
      className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
