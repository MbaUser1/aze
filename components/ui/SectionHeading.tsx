
type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  centered?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`${centered ? "mx-auto text-center" : ""} max-w-3xl`}
    >
      <p
        className={`mb-5 flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.24em] ${
          light ? "text-[#FFD700]" : "text-[#998000]"
        } ${centered ? "justify-center" : ""}`}
      >
        <span className="h-px w-8 bg-current" />
        {eyebrow}
        <span className="h-px w-8 bg-current" />
      </p>

      <h2
        className={`font-display text-balance text-4xl leading-[1.13] sm:text-5xl lg:text-6xl ${
          light ? "text-white" : "text-[#1A1A1A]"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-6 max-w-2xl text-sm leading-7 sm:text-base sm:leading-8 ${
            light ? "text-white/60" : "text-[#717171]"
          } ${centered ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
