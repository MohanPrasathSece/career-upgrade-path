import { type ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24 ${className}`}>
      {children}
    </section>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  image?: string;
}) {
  return (
    <div className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 -z-10 opacity-60 [background:radial-gradient(60%_50%_at_80%_10%,oklch(0.88_0.19_128/0.4),transparent_60%),radial-gradient(40%_40%_at_10%_90%,oklch(0.62_0.13_235/0.18),transparent_60%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-14 md:px-8 md:py-24">
        <div className="animate-[fade-up_0.7s_ease-out]">
          {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-balance text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
        </div>
        {image && (
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-primary opacity-20 blur-2xl" />
            <img
              src={image}
              alt=""
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card"
              width={1536}
              height={1024}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
}
