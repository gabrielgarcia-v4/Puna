import { Fragment, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { faixa } from "@/content/site";
import { Simbolo } from "./Brand";

/** Faixa de palavras que corre devagar e acompanha, suave, a velocidade do scroll. */
export default function Faixa() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const loop = gsap.to("[data-faixa-track]", { xPercent: -50, duration: 60, ease: "none", repeat: -1 });

        ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 900, 2);
            gsap.to(loop, { timeScale: self.direction * boost, duration: 0.4, overwrite: true });
            gsap.to(loop, { timeScale: self.direction, duration: 2, delay: 0.4 });
          },
        });
      });
    },
    { scope: ref },
  );

  const itens = [...faixa, ...faixa];

  return (
    <section ref={ref} id="faixa" aria-label={faixa.join(", ")} className="relative z-10 overflow-hidden border-y border-ink/10 bg-mint-soft py-[clamp(22px,2.6vw,44px)] text-ink">
      <div data-faixa-track aria-hidden="true" className="flex w-max items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {itens.map((p, i) => (
              <Fragment key={`${copy}-${i}`}>
                <span className="px-[clamp(20px,2.6vw,48px)] font-display text-[clamp(44px,6.4vw,112px)] leading-none font-light tracking-[-0.03em] whitespace-nowrap italic">
                  {p}
                </span>
                <span className="block w-[clamp(18px,1.8vw,30px)] text-sage">
                  <Simbolo className="w-full" />
                </span>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
