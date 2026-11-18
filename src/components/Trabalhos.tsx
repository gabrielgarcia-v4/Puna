import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";
import { trabalhos, tons } from "@/content/site";
import { Simbolo } from "./Brand";

// Mosaico: alguns cards ocupam duas colunas para quebrar a grade.
const largos = new Set([0, 3, 4, 7]);

export default function Trabalhos() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        revealLines(ref.current!);
        gsap.from("[data-trabalho]", {
          y: 100,
          rotation: (i) => (i % 2 ? 6 : -6),
          scale: 0.9,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.07,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: "[data-mosaico]", start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="trabalhos" data-dark className="relative z-10 bg-ink py-[clamp(100px,11vw,190px)] text-mint">
      <div className="mx-auto w-[min(100%-8vw,1440px)]">
        <h2 data-reveal className="font-display text-[clamp(44px,6vw,104px)] leading-[0.95] font-semibold tracking-[-0.03em]">
          Quem já criou com a gente
        </h2>

        <ul data-mosaico className="mt-[clamp(48px,6vw,96px)] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[clamp(220px,17vw,280px)] lg:grid-cols-4">
          {trabalhos.map((t, i) => (
            <li
              key={t.cliente}
              data-trabalho
              data-hover="lift"
              className={`relative flex aspect-[4/3] flex-col lg:aspect-auto justify-between overflow-hidden rounded-[var(--radius-card)] p-[clamp(20px,2vw,30px)] ${tons[t.tom]} ${
                largos.has(i) ? "lg:col-span-2" : ""
              } ${t.tom === "ink" ? "outline outline-2 outline-mint/30" : ""}`}
            >
              <span className="w-fit rounded-full border-2 border-current px-3 py-1 font-display text-[13px] font-semibold tracking-wide uppercase">
                {t.area}
              </span>
              <div className="pointer-events-none absolute -right-[6%] -bottom-[18%] w-[38%] opacity-20">
                <Simbolo className="w-full" />
              </div>
              <h3 className="relative font-display text-[clamp(28px,2.6vw,46px)] leading-[0.95] font-semibold tracking-[-0.02em]">{t.cliente}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
