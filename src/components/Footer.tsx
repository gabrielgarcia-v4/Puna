import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";
import { contato } from "@/content/site";
import { Logo, Simbolo } from "./Brand";
import { PillLink } from "./ui";

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
          y: 40,
          autoAlpha: 0,
          duration: 1.4,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-canais]", start: "top 92%", once: true },
        });
        gsap.fromTo(
          "[data-footer-simbolo]",
          { rotation: -20, yPercent: 20 },
          { rotation: 10, yPercent: 0, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: 1.6 } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} id="contato" className="relative z-10 overflow-hidden bg-mint text-ink">
      <div data-footer-simbolo className="pointer-events-none absolute -right-[6%] -bottom-[10%] w-[min(42vw,560px)] text-sage/40">
        <Simbolo className="w-full" />
      </div>

      <div className="relative mx-auto w-[min(100%-8vw,1500px)] pt-[clamp(130px,13vw,230px)] pb-10">
        <p className="text-[12px] tracking-[0.35em] text-ink/60 uppercase">Support your local studio®</p>
        <h2 data-reveal className="mt-6 max-w-[12ch] font-display text-[clamp(52px,8vw,150px)] leading-[0.92] font-normal tracking-[-0.04em]">
          Vamos criar <em className="font-light">junto?</em>
        </h2>
        <div className="mt-12">
          <PillLink href={contato.whatsapp}>Conversar com a Puna</PillLink>
        </div>

        <ul data-canais className="mt-[clamp(70px,9vw,140px)] flex flex-wrap gap-x-[clamp(28px,4vw,64px)] gap-y-4">
          {canais.map(([label, href]) => (
            <li key={label} data-canal>
              <a
                href={href}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                data-hover="underline"
                className="relative block py-2 font-display text-[clamp(22px,2vw,32px)] font-light"
              >
                {label}
                <span data-underline className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-current" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-col justify-between gap-6 border-t border-ink/15 pt-8 text-sm md:flex-row md:items-center">
          <Logo className="w-24" />
          <p className="text-ink/60">Puna Studios · Porto Alegre · {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
