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
          yPercent: 60,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: { trigger: "[data-lista]", start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="trabalhos" data-dark className="relative z-10 bg-ink py-[clamp(100px,11vw,190px)] text-paper-soft">
      <div className="mx-auto w-[min(100%-8vw,1440px)]">
        <p className="text-[13px] tracking-[0.3em] text-taupe uppercase">Trabalhos</p>
        <h2 data-reveal className="mt-5 max-w-[16ch] font-editorial text-[clamp(44px,6vw,96px)] leading-[0.92] font-light tracking-[-0.045em]">
          Marcas que já passaram pelo <em className="text-clay">estúdio</em>
        </h2>

        <ul data-lista className="mt-[clamp(56px,7vw,110px)] border-t border-paper/20">
          {trabalhos.map((t) => (
            <li key={t.cliente} className="overflow-hidden border-b border-paper/20">
              <div
                data-trabalho
                data-hover="nudge"
                className="grid gap-2 py-[clamp(22px,2.4vw,36px)] md:grid-cols-[1.2fr_1.6fr_auto] md:items-baseline md:gap-10"
              >
                <h3 className="font-editorial text-[clamp(32px,3.6vw,60px)] leading-none font-light tracking-[-0.03em]">{t.cliente}</h3>
                <p className="text-[clamp(15px,1.2vw,19px)] text-paper/70">{t.entrega}</p>
                <p className="flex items-center gap-3 text-[13px] tracking-[0.2em] text-taupe uppercase">
                  {t.area}
                  <Arrow className="size-4 text-clay" />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
