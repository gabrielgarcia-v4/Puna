import { Fragment, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { faixa } from "@/content/site";
import { Simbolo } from "./Brand";

/** Faixa de palavras gigantes que corre sem parar e acelera com a velocidade do scroll. */
export default function Faixa() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const loop = gsap.to("[data-faixa-track]", { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
        gsap.to("[data-faixa-icon]", { rotation: 360, duration: 6, ease: "none", repeat: -1 });

        ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 5);
            gsap.to(loop, { timeScale: self.direction * boost, duration: 0.2, overwrite: true });
            gsap.to(loop, { timeScale: self.direction, duration: 1.2, delay: 0.2 });
          },
        });
      });
    },
    { scope: ref },
  );

  const itens = [...faixa, ...faixa];

  return (
    <section ref={ref} id="faixa" aria-label={faixa.join(", ")} className="relative z-10 -mx-[3vw] -rotate-2 overflow-hidden bg-ink py-[clamp(18px,2.4vw,40px)] text-mint">
      <div data-faixa-track aria-hidden="true" className="flex w-max items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {itens.map((p, i) => (
              <Fragment key={`${copy}-${i}`}>
                <span className="px-[clamp(16px,2vw,36px)] font-display text-[clamp(48px,8vw,140px)] leading-none font-semibold tracking-[-0.02em] whitespace-nowrap">
                  {p}
                </span>
                <span data-faixa-icon className="block w-[clamp(28px,3.4vw,58px)] text-sage">
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
