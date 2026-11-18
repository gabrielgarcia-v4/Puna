import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";
import { trabalhos } from "@/content/site";
import { Arrow } from "./ui";

export default function Trabalhos() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        revealLines(ref.current!);
        gsap.from("[data-trabalho]", {
          yPercent: 70,
          autoAlpha: 0,
          duration: 1.4,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-lista]", start: "top 85%", once: true },
        });
        gsap.from("[data-linha]", {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.4,
          stagger: 0.08,
          ease: "power3.inOut",
          scrollTrigger: { trigger: "[data-lista]", start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="trabalhos" data-dark className="relative z-10 bg-ink py-[clamp(110px,12vw,200px)] text-mint-soft">
      <div className="mx-auto w-[min(100%-8vw,1440px)]">
        <p className="text-[12px] tracking-[0.35em] text-sage uppercase">Clientes</p>
        <h2 data-reveal className="mt-5 max-w-[20ch] font-display text-[clamp(44px,5.6vw,96px)] leading-[0.95] font-normal tracking-[-0.035em]">
          Quem já criou <em className="font-light text-mint">com a gente</em>
        </h2>

        <ul data-lista className="mt-[clamp(56px,7vw,110px)]">
          {trabalhos.map((t) => (
            <li key={t.cliente} className="relative overflow-hidden">
              <span data-linha className="absolute inset-x-0 top-0 h-px bg-mint/20" />
              <div data-trabalho data-hover="nudge" className="flex items-baseline justify-between gap-6 py-[clamp(20px,2.2vw,34px)]">
                <h3 className="font-display text-[clamp(30px,3.4vw,58px)] leading-none font-light tracking-[-0.02em]">{t.cliente}</h3>
                <p className="flex shrink-0 items-center gap-3 text-[12px] tracking-[0.3em] text-sage uppercase">
                  <span className="max-sm:hidden">{t.area}</span>
                  <Arrow className="size-4" />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
