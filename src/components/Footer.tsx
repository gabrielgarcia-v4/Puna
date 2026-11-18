import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";
import { contato } from "@/content/site";
import { Logo, Simbolo } from "./Brand";
import { Arrow, PillLink } from "./ui";

const canais = [
  ["WhatsApp", contato.whatsapp],
  ["E-mail", contato.email],
  ["Instagram", contato.instagram],
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        revealLines(ref.current!);
        gsap.from("[data-canal]", {
          y: 60,
          rotation: (i) => (i % 2 ? 5 : -5),
          autoAlpha: 0,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: "[data-canais]", start: "top 92%", once: true },
        });
        gsap.fromTo(
          "[data-footer-simbolo]",
          { rotation: -30, yPercent: 30 },
          { rotation: 15, yPercent: 0, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: 1.2 } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} id="contato" className="relative z-10 overflow-hidden bg-mint text-ink">
      <div data-footer-simbolo className="pointer-events-none absolute -right-[8%] -bottom-[12%] w-[min(48vw,620px)] text-sage/50">
        <Simbolo className="w-full" />
      </div>

      <div className="relative mx-auto w-[min(100%-8vw,1500px)] pt-[clamp(120px,12vw,220px)] pb-10">
        <h2 data-reveal className="max-w-[12ch] font-display text-[clamp(56px,9vw,170px)] leading-[0.9] font-semibold tracking-[-0.04em]">
          Bora criar junto?
        </h2>
        <div className="mt-10">
          <PillLink href={contato.whatsapp}>Chamar no WhatsApp</PillLink>
        </div>

        <ul data-canais className="mt-[clamp(64px,8vw,130px)] flex flex-wrap gap-3">
          {canais.map(([label, href]) => (
            <li key={label} data-canal>
              <a
                href={href}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                data-hover="lift"
                className="inline-flex items-center gap-3 rounded-full border-2 border-ink bg-paper-soft px-6 py-3 font-display text-[clamp(16px,1.3vw,20px)] font-semibold shadow-[0_5px_0_#2c3224]"
              >
                {label}
                <Arrow className="size-4" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-col justify-between gap-6 border-t-2 border-ink/15 pt-8 text-sm md:flex-row md:items-center">
          <Logo className="w-24" />
          <p className="opacity-70">Puna Studios · Porto Alegre · {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
