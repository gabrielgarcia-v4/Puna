import type { ReactNode } from "react";

export function Arrow({ className = "size-[1em]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {});

/** Pílula com seta em círculo. */
export function PillLink({ href, children, tone = "dark" }: { href: string; children: ReactNode; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <a
      href={href}
      {...ext(href)}
      data-hover="pill"
      className={`inline-flex h-[clamp(60px,5.4vw,84px)] items-center gap-5 rounded-full py-2 pr-2 pl-[clamp(28px,2.6vw,44px)] text-[clamp(15px,1.2vw,18px)] font-medium tracking-wide ${dark ? "bg-ink text-mint" : "bg-paper-soft text-ink"}`}
    >
      <span>{children}</span>
      <span data-hover-arrow className={`grid aspect-square h-full place-items-center rounded-full ${dark ? "bg-mint text-ink" : "bg-ink text-mint"}`}>
        <Arrow className="size-[42%]" />
      </span>
    </a>
  );
}
